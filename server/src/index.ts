import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import syncDatabase from './db/sync';
import errorHandler from './middlewares/error';
import routes from './routes';

const app = express();
dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
  })
);

app.use('/', routes);

app.use(errorHandler());

app.use((_req, res) => {
  res.status(404).send({ message: 'Invalid endpoint' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

syncDatabase();
