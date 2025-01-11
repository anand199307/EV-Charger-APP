import { startCharger, stopCharger } from '../controllers/v1/ocpp';
import { parsePagination, validateSession } from '../middleware';

export function ocppRouter(app:any){
    app.post('/api/v1/ocpp/remotStartCharger',validateSession,startCharger)
    app.post('/api/v1/ocpp/remotStopCharger',validateSession,stopCharger)
}