import { ReactNode, createContext, useEffect, useState } from "react";
import { getUserCartItemNumber } from "./setup/API/cart_api";
import { Decrypt } from "./setup/Crypto/Cryption";


export const UserContext = createContext<any | null>(null)



type userContextProviderProps = {
    children: ReactNode
}

export const UserContextProvider = ({ children }: userContextProviderProps) => {
    const [currentUserID, setCurrentUserID] = useState<string>("")
    const [isLogin, setIsLogin] = useState<string>("")
    const [cartItemNumber, setCartItemNumber] = useState<string>("")


    const fetchItemNumber = async () => {
        if (currentUserID) {
            const _currentUserID = Decrypt(currentUserID)
            const data = await getUserCartItemNumber(Number(_currentUserID))
            if(data[0].sum == null) {
                data[0].sum = 0;
            }
            setCartItemNumber(data[0].sum.toString())
        }
    }

    //Sayfa yenilendiğinde state sıfırlandığı için local storage ta olan veriyi statelere set ediyoruz
    useEffect(() => {
        const storedUserID = localStorage.getItem("currentUserID")
        if (storedUserID) setCurrentUserID(storedUserID)

        const storedIsLogin = localStorage.getItem("isLogin")
        if (storedIsLogin) setIsLogin(storedIsLogin)

        const storedCartItemNumber = localStorage.getItem("cartItemNumber")
        if (storedCartItemNumber) setCartItemNumber(storedCartItemNumber)
    }, [])


    //Statelerde değişim olursa local storage a kaydediyoruz
    useEffect(() => {
        fetchItemNumber()

        localStorage.setItem("currentUserID", currentUserID)
        localStorage.setItem("isLogin", isLogin)
        localStorage.setItem("cartItemNumber", cartItemNumber)
    })


    const data = {
        currentUserID,
        setCurrentUserID,
        isLogin,
        setIsLogin,
        cartItemNumber,
        setCartItemNumber
    }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}