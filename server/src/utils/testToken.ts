import type { Request } from 'express';

import { TokenType } from '../@types/enums/Token.enum.ts';

const testToken = (req: Request) => {
  const result = {
    authHeader: '',
    isBearer: false,
    isMatch: false,
    isExpired: true,
  };

  result.authHeader = req.get('Authorization') ?? '';
  if (!result.authHeader) return result;

  result.isBearer = result.authHeader.split(' ')[0] === TokenType.bearer;
  if (!result.isBearer) return result;

  result.isMatch =
    result.authHeader.split(' ')[1] === req.session.auth!.accessToken;
  if (!result.isMatch) return result;

  result.isExpired =
    new Date() > new Date(req.session.auth!.accessTokenValidUntil);
  return result;
};

export default testToken;
