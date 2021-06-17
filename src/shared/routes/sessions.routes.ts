import { Router } from 'express';
import AuthenticateUserService from '../../modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService();
  const { user, bearer } = await authenticateUserService.execute({ email, password });
  delete user.password;

  return response.json({ user, bearer });
});

export default sessionsRouter;