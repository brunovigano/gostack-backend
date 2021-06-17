import { Router } from 'express';
import AuthenticateUserService, { Response } from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService();
  const { user, bearer } = (await authenticateUserService.execute({ email, password })) as Response;
  delete user.password;

  return response.json({ user, bearer });
});

export default sessionsRouter;
