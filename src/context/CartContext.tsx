import axios from "axios";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Decrypt } from "../setup/Cryption";

const API_KEY = process.env.REACT_APP_APIKEY

export const CartContext = createContext<any | null>(null)


type cartContextProviderProps = {
    children: ReactNode
}

export const CartContextProvider = ({ children }: cartContextProviderProps) => {
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    const [cartItemAmount, setCartItemAmount] = useState("")

    // useEffect(() => {
    //     const cancelToken = axios.CancelToken.source()

    //     const fetchItemAmount = async () => {
    //         if(currentUserID) {

    //             await axios.get('https://localhost:7181/api/Cart/getUserCartItemNumber', {
    //                 cancelToken: cancelToken.token,
    //                 params: {
    //                     userID: _currentUserID,
    //                 },
    //                 headers: {
    //                     'x-api-key': API_KEY
    //                 }
    //             })
    //             .then((res) => {
    //                 setCartItemAmount(res.data)
    //             })
    //             .catch((err) => {
    //                 if(axios.isCancel(err)) {
    //                     console.log("CartContext 41 : " + err.message)
    //                 }
    //             })
    //         }
    //     }

    //     fetchItemAmount()

    //     return () => {
    //         cancelToken.cancel()
    //     }
    // }, [])

    // useEffect(() => {
    //     const storedItemAmount = localStorage.getItem("cartItemAmount")
    //     if (storedItemAmount) setCartItemAmount(storedItemAmount)
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem("cartItemAmount", cartItemAmount)
    // })

    const data = {
        cartItemAmount,
        setCartItemAmount
    }

    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}