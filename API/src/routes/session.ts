import { fareUpdate, getChargingSessions, recentlyChargedStationsByUserId, sessionInfo } from '../controllers/v1/chargingSession';
import { validateSession, parsePagination } from '../middleware';

export function sessionsRouter(app: any) {
  app.get(
    '/api/v1/session/:userId',
    validateSession,
    parsePagination,
    recentlyChargedStationsByUserId,
  );
  app.post('/api/v1/session/fare-update',validateSession,fareUpdate)
  app.get('/api/v1/session-details',validateSession,sessionInfo)
  app.get('/api/v1/sessions',validateSession,getChargingSessions)
}
