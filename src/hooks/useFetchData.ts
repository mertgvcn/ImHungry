import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
//context
import { UserContext } from "../context/UserContext"
//helpers
import { Decrypt } from "../setup/Crypto/Cryption"
//types
import { DataType } from "../types/DataType"
import { CartItemsType } from "../types/CartDataType"
import { Type } from "typescript"

const API_KEY = process.env.REACT_APP_APIKEY
export const HOME_PAGE_URL = "https://localhost:7181/api/PageContent/HomePageData"


export const useFetchData = <T>(apiURL: string) => {
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    const [data, setData] = useState<T | null>(null) //Generic return type
    const isFetched = useRef<boolean>(false)

    //Fetching Data
    async function fetchData(): Promise<void> {
        const response = await axios.get(apiURL, {
            params: {
                userID: _currentUserID
            },
            headers: {
                'x-api-key': API_KEY
            }
        })

        setData(response.data)
        return new Promise((resolve) => resolve())
    }

    async function asyncFetch() {
        await fetchData()
    }

    //Avoid fetch twice
    useEffect(() => {
        if (currentUserID && !isFetched.current) {
            asyncFetch()
            isFetched.current = true
        }
    }, [currentUserID])


    const isSuccess = isFetched.current
    return { data, isSuccess };
}