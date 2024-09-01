import { randomBytes } from 'crypto';

import { FIFTEEN_MINUTES } from '../constants/index.ts';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
  };
};

export default createSession;
