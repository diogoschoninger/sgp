import { Router } from 'express';

import controller from './controllers';
import jwtAuth from './middlewares/jwtAuth';
import validate from './middlewares/validateSchema';
import schemas from './utils/schemas';

const router = Router();

// SESSÃO
router.post('/register', validate(schemas.register), controller.register);
router.post('/login', validate(schemas.login), controller.login);

// MOVIMENTAÇÕES
router.post(
  '/finances/operations',
  jwtAuth,
  validate(schemas.createFinOperation),
  controller.createFinOperation
);

// FORMAS DE PAGAMENTO
router.get(
  '/finances/operations/payments',
  jwtAuth,
  controller.listFinOperationsPayments
);

// GRUPOS DE MOVIMENTAÇÕES
router.get(
  '/finances/operations/groups',
  jwtAuth,
  controller.listFinOperationsGroups
);

// LADOS DAS MOVIMENTAÇÕES
router.get(
  '/finances/operations/sides',
  jwtAuth,
  controller.listFinOperationsSides
);

export default router;
