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

    const [cartItemAmount, setCartItemAmount] = useState()

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