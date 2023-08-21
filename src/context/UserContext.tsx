import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { getUserCartItemNumber } from "../setup/API/cart_api";
import { Decrypt } from "../setup/Crypto/Cryption";
import axios from "axios";



export const UserContext = createContext<any | null>(null)

type userContextProviderProps = {
    children: ReactNode
}

export const UserContextProvider = ({ children }: userContextProviderProps) => {
    const [currentUserID, setCurrentUserID] = useState("")
    const [isLogin, setIsLogin] = useState("")

    //Sayfa yenilendiğinde state sıfırlandığı için local storage ta olan veriyi statelere set ediyoruz
    useEffect(() => {
        const storedUserID = localStorage.getItem("currentUserID")
        if (storedUserID) setCurrentUserID(storedUserID)

        const storedIsLogin = localStorage.getItem("isLogin")
        if (storedIsLogin) setIsLogin(storedIsLogin)
    }, [])


    //Statelerde değişim olursa local storage a kaydediyoruz
    useEffect(() => {
        localStorage.setItem("currentUserID", currentUserID)
        localStorage.setItem("isLogin", isLogin)
    })


    const data = {
        currentUserID,
        setCurrentUserID,
        isLogin,
        setIsLogin,
    }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}