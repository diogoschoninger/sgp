import { Router } from 'express';

import controller from './controllers';
import jwtAuth from './middlewares/jwtAuth';
import validate from './middlewares/validateSchema';
import schemas from './utils/schemas';

const router = Router();

router.get('/', controller.publicRoute);

router.post('/register', validate(schemas.register), controller.register);
router.post('/login', validate(schemas.login), controller.login);

router.get(
  '/finances/operations/groups',
  jwtAuth,
  controller.listFinOperationsGroups
);

router.get('/private-route', jwtAuth, controller.hello);

export default router;
