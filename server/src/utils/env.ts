import dotenv from 'dotenv';

dotenv.config();

export function env(...variables: string[]): Record<string, unknown> {
  return variables.reduce((acc, variable) => {
    return { ...acc, [variable]: process.env[variable] };
  }, {});
}
