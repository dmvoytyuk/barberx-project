import { SessionModel } from '../../db/models/session.ts';

export const cleanUpExpiredSessions = async () => {
  try {
    const result = await SessionModel.deleteMany({
      refreshTokenValidUntil: { $lt: new Date() },
    });
    console.log(`${result.deletedCount} expired sessions has been deleted.`);
  } catch (error) {
    console.error('Error on sessions clean up procedure attempt:', error);
  }
};
