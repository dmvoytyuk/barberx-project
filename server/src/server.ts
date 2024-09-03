import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import env from './utils/env.ts';
import router from './routers/index.ts';
import connectToDB from './db/connectToDB.ts';
import sessionHandler from './middlewares/sessionHandler/sessionHandler.ts';
import { ENV_VARS } from './@types/enums/ENV.enum.ts';

const app = express();

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionHandler);
app.use(router);

(async () => {
  await connectToDB();

  const PORT = env(ENV_VARS.PORT) || 3000;

  if (mongoose.connection.readyState) {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  }
})();
