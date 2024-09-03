import type { IUser } from './IUser.interface.ts';

export type RegisterCredentials = Pick<IUser, 'name' | 'email' | 'password'>;
