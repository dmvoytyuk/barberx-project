import type { IUser } from './User.interface.ts';

export type LoginCredentials = Pick<IUser, 'email' | 'password'>;
