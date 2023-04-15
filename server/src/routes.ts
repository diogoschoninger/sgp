import { Router } from 'express';
import controller from './controllers';
import validate from './middlewares/validateSchema';
import schemas from './utils/schemas';
import jwtAuth from './middlewares/jwtAuth';

const router = Router();

router.get('/', controller.publicRoute);

router.post('/register', validate(schemas.register), controller.register);
router.post('/login', validate(schemas.login), controller.login);

router.get('/private-route', jwtAuth, controller.hello);

export default router;
