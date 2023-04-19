import {
  FinOperations,
  FinOperationsGroups,
  FinOperationsSides,
  User,
} from '../models';
import db from './config';

const sync = async () => {
  try {
    FinOperations.belongsTo(User, {
      constraint: true,
      foreignKey: {
        name: 'user_owner',
        allowNull: false,
      },
    } as any);

    FinOperations.belongsTo(FinOperationsGroups, {
      constraint: true,
      foreignKey: {
        name: 'group',
        allowNull: false,
      },
    } as any);

    FinOperations.belongsTo(FinOperationsSides, {
      constraint: true,
      foreignKey: {
        name: 'side',
        allowNull: false,
      },
    } as any);

    await db.sync();
    console.log('Database has been successfully synchronized');
  } catch (error) {
    console.error(error);
  }

  return;
};

export default sync;
