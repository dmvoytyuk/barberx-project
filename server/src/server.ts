import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import { router } from './routers/index.ts';
import { ENV_VARS } from './constants/index.ts';
import { env } from './utils/env.ts';
import { connectToDB } from './utils/connectToDB.ts';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  })
);

(async () => {
  await connectToDB();

  const { PORT } = env(ENV_VARS.SERVER.PORT) || 3000;

  if (mongoose.connection.readyState) {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  }
})();
