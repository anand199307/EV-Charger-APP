import { createdTag,addChanges,deleteTags } from "../controllers/v1/tagController";
import { validateSession } from "../middleware";

export function tagsRouter(app: any) {
    app.post('/api/v1/id-tags', validateSession,createdTag),
    app.put('/api/v1/id-tags/:id',validateSession,addChanges)
    app.delete('/api/v1/id-tags/:id',validateSession,deleteTags)
}