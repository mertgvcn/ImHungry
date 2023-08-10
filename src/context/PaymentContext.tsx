import { ReactNode, createContext, useRef } from "react";

export const PaymentContext = createContext<any | null>(null)

type paymentContextProviderProps = {
    children: ReactNode 
}

export const PaymentContextProvider = ({children}: paymentContextProviderProps) => {
    const ccID = useRef<number>(null)
    const locID = useRef<number>(null)

    const data = {
        ccID,
        locID
    }

    return (
        <PaymentContext.Provider value={data}>
            {children}
        </PaymentContext.Provider>
    )
}