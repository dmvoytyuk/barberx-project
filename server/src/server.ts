import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import env from './utils/env.ts';
import router from './routers/index.ts';
import connectToDB from './db/connectToDB.ts';
import sessionHandler from './handlers/sessionHandler.ts';

import { ENV_VARS } from './constants/index.ts';

const app = express();

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionHandler);
app.use(router);

(async () => {
  await connectToDB();

  const { PORT } = env(ENV_VARS.SERVER.PORT) || 3000;

  if (mongoose.connection.readyState) {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  }
})();
