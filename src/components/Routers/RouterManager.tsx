import { BrowserRouter } from "react-router-dom"
//types
import { Roles } from "../../models/EntityModels/DecodedToken"
//components
import RouterGuest from "./RouterGuest"
import RouterRestaurantOwner from "./RouterRestaurantOwner"
import RouterUser from "./RouterUser"


type RouterManagerPropType = {
    isLogin: boolean
    userRoles: Roles[]
}


export default function RouterManager({ isLogin, userRoles }: RouterManagerPropType) {
    
    const redirectByRole = () => {
        if(userRoles.includes(Roles.User.valueOf()))
            return <RouterUser />
        else if(userRoles.includes(Roles.RestaurantOwner.valueOf())) 
            return <RouterRestaurantOwner />
    }

    return (
        <BrowserRouter>
            {
                !isLogin ?
                    (
                        <RouterGuest />
                    )
                    :
                    (
                        <>
                            {redirectByRole()}
                        </>
                    )
            }
        </BrowserRouter>
    )
}


