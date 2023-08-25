import { ReactNode, createContext, useEffect, useState } from "react";


export const ChangeContext = createContext<any | null>(null)


type changeContextProviderProps = {
    children: ReactNode
}

export const ChangeContextProvider = ({ children }: changeContextProviderProps) => {
    const [locationToggle, setLocationToggle] = useState<boolean>(false)
    const [restaurantToggle, setRestaurantToggle] = useState<boolean>(false)
    const [creditCardToggle, setCreditCardToggle] = useState<boolean>(false)
     
    const data = {
        locationToggle,
        setLocationToggle,
        restaurantToggle, 
        setRestaurantToggle,
        creditCardToggle, 
        setCreditCardToggle,
    }

    return (
        <ChangeContext.Provider value={data}>
            {children}
        </ChangeContext.Provider>
    )
}