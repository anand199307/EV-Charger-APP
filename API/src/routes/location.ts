import { cities, countries, province, removeLocation, updateLocation } from '../controllers/v1/locationController';
import { parsePagination, validateSession } from '../middleware';

export function locationRouter(app: any) {
  app.delete('/api/v1/location/delete/:locationId', validateSession, removeLocation);
  app.get('/api/v1/location/countries', parsePagination, countries);
  app.get('/api/v1/location/:countryId/province', validateSession, parsePagination, province);
  app.get('/api/v1/locations/:provinceId/cities',validateSession,parsePagination,cities);
  app.put('/api/v1/locations/:locationId',validateSession,updateLocation)
}
