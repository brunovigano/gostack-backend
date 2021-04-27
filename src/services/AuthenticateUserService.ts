import { compare } from 'bcrypt';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import User from '../models/User';

/* eslint-disable class-methods-use-this */
interface Request {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = userRepository.create({ email, password });
    const validationErrors = await validate(user);
    if (validationErrors.length) throw new Error(JSON.stringify(validationErrors));

    const userAlreadyExists = await userRepository.findOne({ where: { email } });
    if (!userAlreadyExists) throw new Error(JSON.stringify('Invalid credentials!'));

    const passwordMatched = await compare(user.password, String(userAlreadyExists.password));
    if (!passwordMatched) throw new Error(JSON.stringify('Invalid credentials!'));

    return userAlreadyExists;
  }
}
