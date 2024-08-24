import mongoose from 'mongoose';
import { ENV_VARS } from '../constants/index.ts';
import { env } from './env.ts';

export async function connectToDB() {
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
}
