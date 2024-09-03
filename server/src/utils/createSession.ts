import { randomBytes } from 'crypto';

import { FIFTEEN_MINUTES } from '../constants/index.ts';
import type { SessionAuth } from '../@types/ISession.interface.ts';

const createSession = (): SessionAuth => {
  const accessToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);

  return {
    accessToken,
    accessTokenValidUntil,
  };
};

export default createSession;
