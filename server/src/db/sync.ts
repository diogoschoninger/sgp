import db from './config';

const sync = async () => {
  try {
    await db.sync();
    console.log('Database has been successfully synchronized');
  } catch (error) {
    console.error(error);
  }

  return;
};

export default sync;
