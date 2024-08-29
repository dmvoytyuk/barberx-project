import type { IUser } from './User.interface.ts';

export type RegisterCredentials = Pick<IUser, 'name' | 'email' | 'password'>;
