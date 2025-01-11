import {
  addChanges,
  chargerList,
  createCharger,
  fetchChargerDetails,
  nearbyChargers,
} from '../controllers/v1/chargerController';
import { validateSession, parsePagination } from '../middleware';

export function charagerRouter(app: any) {
  app.get('/api/v1/charger/suggest-nearby-chargers', validateSession,parsePagination,nearbyChargers),
  app.post('/api/v1/charger/create', validateSession, createCharger),
  app.put('/api/v1/charger/:chargerId/update', validateSession, addChanges),
  app.get('/api/v1/charger/list', validateSession, parsePagination, chargerList),
  app.get('/api/v1/charger/:chargerId', validateSession, fetchChargerDetails)
}
