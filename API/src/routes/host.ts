import { accountHost, createHost, editHost, hostInfo } from '../controllers/v1/hostController';
import { getSignedUrl } from '../controllers/v1/uploadImages';
import { validateSession, parsePagination } from '../middleware';

export function hostRounter(app: any) {
  app.get('/api/v1/host/getSignedUrl', validateSession, getSignedUrl);
  app.post('/api/v1/host/create', validateSession, createHost);
  app.put('/api/v1/host/:host_id/edit', validateSession, editHost);
  app.get('/api/v1/host/:hostId', validateSession, hostInfo);
  app.get('/api/v1/account/:account_id/hostlist', validateSession, parsePagination, accountHost);
}
