export type SessionUser = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string | null;
  role?: string;
  favorites?: string[];
  liked?: string[];
  disliked?: string[];
};

export type SessionAuth = {
  accessToken?: string;
  accessTokenValidUntil?: Date;
};

export type SessionOptions = {
  sessionTTL?: number;
  accessTokenMaxAge?: number;
};

export interface ISession {
  user: SessionUser;
  auth: SessionAuth;

  login: () => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}
