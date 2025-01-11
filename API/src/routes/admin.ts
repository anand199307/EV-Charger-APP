import { createAdmin, getAdmins, findAdmin } from "../controllers/v1/adminController";
import { forgotPasswordRequest, logOut, login, updatePassword } from "../controllers/v1/authController";
import { validateSession,parsePagination } from "../middleware";

export function adminRouter(app: any) {
    app.post('/api/v1/admin/login', login)
    app.post('/api/v1/admin/logout', validateSession,logOut)
    app.post('/api/v1/admin/forgot_password', forgotPasswordRequest)
    app.put('/api/v1/admin/update_password', updatePassword)
    app.get('/api/v1/admins', validateSession,parsePagination,getAdmins)
    app.post('/api/v1/admin/create_admin', createAdmin)
    app.get('/api/v1/:id/admin', validateSession, findAdmin)
}