import { ReactNode, createContext, useEffect, useState } from "react";


export const ChangeContext = createContext<any | null>(null)


type changeContextProviderProps = {
    children: ReactNode
}

export const ChangeContextProvider = ({ children }: changeContextProviderProps) => {
    const [toggle, setToggle] = useState<boolean>(false)

    const data = {
        toggle,
        setToggle
    }

    return (
        <ChangeContext.Provider value={data}>
            {children}
        </ChangeContext.Provider>
    )
}