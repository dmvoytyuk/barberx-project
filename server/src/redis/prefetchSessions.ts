import { SessionModel } from '../db/models/session.ts';
import { sessionsRepo } from './repos.ts';

export const prefetchSessions = async () => {
  const sessions = await SessionModel.find().lean();
  const redisSessions = sessions.map((session) => ({
    _id: session._id.toString(),
    userId: session.userId.toString(),
    accessToken: session.accessToken,
    accessTokenValidUntil: session.accessTokenValidUntil.toISOString(),
    refreshToken: session.refreshToken,
    refreshTokenValidUntil: session.refreshTokenValidUntil.toISOString(),
  }));
  sessionsRepo.createIndex();
  await Promise.all(redisSessions.map((session) => sessionsRepo.save(session)));
  const result = await sessionsRepo
    .search()
    .where('userId')
    .equals('66cba7aaa38cc1af50b427a8')
    .returnAll();
  console.log('result', result);
};
