import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { router } from './routers/index.ts';
import { env } from './utils/env.ts';
import { ENV_VARS } from './constants/index.ts';
import { connectToDB } from './utils/connectToDB.ts';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await connectToDB();

  const { PORT } = env(ENV_VARS.SERVER.PORT) || 3000;

  if (mongoose.connection.readyState) {
    app.use(router);
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  }
})();
