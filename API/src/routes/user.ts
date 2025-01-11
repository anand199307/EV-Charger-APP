import { logOut, login, resedOtp, verifyPhoneOtp } from "../controllers/v1/userAuth";
import { getUsers, updateUser, userInfo } from "../controllers/v1/userController";
import { validateSession } from "../middleware";

export function userRouter(app: any) {
    app.post('/api/v1/user/login', login)
    app.post('/api/v1/user/verify_otp', verifyPhoneOtp)
    app.post('/api/v1/user/logout', validateSession, logOut)
    app.get('/api/v1/user/current_user',validateSession,userInfo)
    app.put('/api/v1/user/:uuid/edit',validateSession,updateUser)
    app.post('/api/v1/user/resend_otp',resedOtp)
    app.get('/api/v1/users',validateSession,getUsers)
}