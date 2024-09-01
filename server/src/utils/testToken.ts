import type { Request } from 'express';
import { TokenType } from '../@types/enums/Token.enum.ts';

export const testToken = (request: Request) => {
  const result = {
    authHeader: '',
    isBearer: false,
    isMatch: false,
    isExpired: true,
  };

  result.authHeader = request.get('Authorization') ?? '';
  if (!result.authHeader) return result;

  result.isBearer = result.authHeader.split(' ')[0] === TokenType.bearer;
  if (!result.isBearer) return result;

  result.isMatch =
    result.authHeader.split(' ')[1] === request.session.auth!.accessToken;
  if (!result.isMatch) return result;

  result.isExpired =
    new Date() > new Date(request.session.auth!.accessTokenValidUntil);
  return result;
};
