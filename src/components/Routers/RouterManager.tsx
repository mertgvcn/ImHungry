//components
import RouterGuest from "./RouterGuest"
import RouterLogin from "./RouterLogin"


type RouterPropType = {
    isLogin: boolean
}


export default function RouterManager({ isLogin }: RouterPropType) {
    
    return (
        <>
            {
                !isLogin ?
                    (
                        <RouterGuest />
                    )
                    :
                    (
                        <RouterLogin />
                    )
            }
        </>
    )
}


