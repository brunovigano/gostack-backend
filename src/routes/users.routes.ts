import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser: CreateUserService = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    delete user.password;
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: JSON.parse(error.message) });
  }
});

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return response.json(users);
});

export default usersRouter;
