import { compare } from 'bcrypt';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { authConfig } from '../config/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

export interface Response {
  user: User;
  bearer: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const userModel = userRepository.create({ email, password });
    const validationErrors = await validate(userModel);

    if (validationErrors.length) throw new AppError(validationErrors[0].toString());

    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw new AppError('Invalid credentials!', 401);

    const passwordMatched = await compare(userModel.password, String(user.password));
    if (!passwordMatched) throw new AppError('Invalid credentials!', 401);

    const { secret, expiresIn } = authConfig.jwt;

    const bearer = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, bearer };
  }
}
