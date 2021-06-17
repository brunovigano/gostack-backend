import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser: CreateUserService = new CreateUserService();
  const user = await createUser.execute({ name, email, password });
  delete user.password;
  return response.json(user);
});

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return response.json(users);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const user_id = request.user.id;
  const avatarFilename = request.file.filename;

  const user = await UpdateUserAvatarService.execute({ user_id, avatarFilename });
  delete user?.password;

  return response.json(user);
});

export default usersRouter;
