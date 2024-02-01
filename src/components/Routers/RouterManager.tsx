//components
import { BrowserRouter } from "react-router-dom"
import RouterGuest from "./RouterGuest"
import RouterRestaurantOwner from "./RouterRestaurantOwner"
import RouterUser from "./RouterUser"


type RouterManagerPropType = {
    isLogin: boolean
}


export default function RouterManager({ isLogin }: RouterManagerPropType) {

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
                            <RouterUser />
                            <RouterRestaurantOwner />
                        </>
                    )
            }
        </BrowserRouter>
    )
}


