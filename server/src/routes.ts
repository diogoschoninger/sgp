import { Router } from 'express';

import controller from './controllers';
import jwtAuth from './middlewares/jwtAuth';
import validate from './middlewares/validateSchema';
import schemas from './utils/schemas';

const router = Router();

// SESSÃO
router.post('/register', validate(schemas.register), controller.register);
router.post('/login', validate(schemas.login), controller.login);

// MOVIMENTAÇÕES FINANCEIRAS
router.post(
  '/finances/operations',
  validate(schemas.createFinOperation),
  jwtAuth,
  controller.createFinOperation
);
router.post(
  '/finances/operations/list',
  validate(schemas.listFinOperations),
  jwtAuth,
  controller.listFinOperations
);

// FORMAS DE PAGAMENTO DAS MOVIMENTAÇÕES
router.get(
  '/finances/operations/payments',
  jwtAuth,
  controller.listFinOperationsPayments
);

// GRUPOS DAS MOVIMENTAÇÕES
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
