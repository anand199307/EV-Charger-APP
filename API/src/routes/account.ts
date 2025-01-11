import { validateSession } from "../middleware";
import { editAccount, newAccount, removeAccount } from "../controllers/v1/accountController";


export function accountRouter(app:any){
    app.post('/api/v1/admin/account/create',validateSession,newAccount)
    app.put('/api/v1/admin/account/update/:accountId',validateSession,editAccount)
    app.delete('/api/v1/admin/account/update/:id',validateSession,removeAccount)
}