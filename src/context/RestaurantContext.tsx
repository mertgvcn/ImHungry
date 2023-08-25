import { ReactNode, createContext, useEffect, useState } from "react";


export const RestaurantContext = createContext<any | null>(null)


type RestaurantContextProviderProps = {
    children: ReactNode
}

export const RestaurantContextProvider = ({ children }: RestaurantContextProviderProps) => {
    const [filteredName, setFilteredName] = useState<string>("")

    const data = {
        filteredName,
        setFilteredName,
    }

    return (
        <RestaurantContext.Provider value={data}>
            {children}
        </RestaurantContext.Provider>
    )
}