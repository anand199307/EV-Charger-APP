import {
  vehiclesList,
  createVehicle,
  updateVehicle,
  createUserVehicle,
  getUserVehicles,
  removeUserVechile,
  evConnectors,
} from '../controllers/v1/vehicleController';
import { validateSession, parsePagination } from '../middleware';

export function vechileRouter(app: any) {
  app.get('/api/v1/vechiles', validateSession, parsePagination, vehiclesList);
  app.post('/api/v1/vechile/create', validateSession, createVehicle);
  app.put('/api/v1/vechile/update/:id', validateSession, updateVehicle);
  app.post('/api/v1/vechile/add_vechlie', validateSession, createUserVehicle);
  app.get('/api/v1/vechile/user_vechlie/:userId', validateSession, getUserVehicles);
  app.put('/api/v1/vechile/user_vechlie/:vechicleId',validateSession,removeUserVechile);
  app.get('/api/v1/vechile/evconnectors',validateSession,parsePagination,evConnectors)
}
