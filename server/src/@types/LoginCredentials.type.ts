import type { IUser } from './IUser.interface.ts';

export type LoginCredentials = Pick<IUser, 'email' | 'password'>;
