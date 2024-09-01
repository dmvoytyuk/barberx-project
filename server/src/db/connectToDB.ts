import mongoose from 'mongoose';
import env from '../utils/env.ts';

import { ENV_VARS } from '../constants/index.ts';

const connectToDB = async () => {
  const { DB_USER, DB_PWD, DB_URL, DB_NAME } = env(
    ...Object.values(ENV_VARS.DATABASE)
  );

  const connection_uri: string = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_URL}/${DB_NAME}`;

  try {
    if (mongoose.connection.readyState) return;
    await mongoose.connect(connection_uri);
    console.log('Connected to the database');
  } catch (e) {
    console.error(e);
  }
};

export default connectToDB;
