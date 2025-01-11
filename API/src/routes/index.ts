import { accountRouter } from "./account"
import { adminRouter } from "./admin"
import { hostRounter } from "./host"
import { locationRouter } from "./location"
import { propertiesRouter } from "./properties"
import { userRouter } from "./user"
import { vechileRouter } from "./vechicles"
import { charagerRouter } from "./charger"
import { connectorRouter } from "./connector"
import { tagsRouter } from "./tag"
import { sessionsRouter } from "./session"
import { ocppRouter } from "./ocpp"

export function loadRoutes(app: any) {
    adminRouter(app)
    userRouter(app)
    vechileRouter(app)
    hostRounter(app)
    accountRouter(app)
    locationRouter(app)
    propertiesRouter(app)
    charagerRouter(app)
    connectorRouter(app)
    tagsRouter(app)
    sessionsRouter(app)
    ocppRouter(app)
}