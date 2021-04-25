/* eslint-disable class-methods-use-this */
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../models/User';

type Request = {
  name: string;
  email: string;
  password: string;
};

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = userRepository.create({ name, email, password });
    const validationErrors = await validate(user);
    if (validationErrors.length) throw new Error(JSON.stringify(validationErrors));

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    const checkIfEmailAlreadyExists = await userRepository.findOne({ where: { email } });

    if (checkIfEmailAlreadyExists) throw new Error(JSON.stringify('Email already exists'));
    await userRepository.save(user);

    return user;
  }
}
