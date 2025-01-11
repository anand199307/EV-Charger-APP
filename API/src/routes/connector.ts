import { addChanges, createdConnector } from "../controllers/v1/connectorControll";
import { validateSession,parsePagination } from "../middleware";

export function connectorRouter(app: any) {
    app.post('/api/v1/connector/create', validateSession,createdConnector),
    app.put('/api/v1/connector/:connectorId/update',validateSession,addChanges)
}