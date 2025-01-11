import {
  addProperty,
  amenities,
  hostPropertiesList,
  propertiesList,
  propertyInfo,
  updateDetails,
} from '../controllers/v1/propertiesController';
import { parsePagination, validateSession } from '../middleware';

export function propertiesRouter(app: any) {
  app.get('/api/v1/property/amenities', validateSession, parsePagination, amenities);
  app.post('/api/v1/property/create', validateSession, addProperty);
  app.put('/api/v1/property/:property_id/edit', validateSession, updateDetails);
  app.get('/api/v1/property/:property_id', validateSession, propertyInfo);
  app.get('/api/v1/property/:host_id/list', validateSession, parsePagination, hostPropertiesList);
  app.get('/api/v1/properties', validateSession, parsePagination, propertiesList);
}
