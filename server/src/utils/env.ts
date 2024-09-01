import dotenv from 'dotenv';

dotenv.config();

export default function env(...variables: string[]): Record<string, unknown> {
  return variables.reduce((acc, variable) => {
    return { ...acc, [variable]: process.env[variable] };
  }, {});
}
