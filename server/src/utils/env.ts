import dotenv from 'dotenv';

dotenv.config();

const env = (variable: string) => {
  return process.env[variable];
};

export default env;
