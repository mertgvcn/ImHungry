import { useEffect, useRef, useState } from "react"
import axios from "axios"
//helpers
import { getCookie } from "../setup/Cookie"


const API_KEY = 'bearer ' + getCookie("jwt")
export const HOME_PAGE_URL = "https://localhost:7181/api/PageContent/HomePageData"
export const PROFILE_PAGE_URL = "https://localhost:7181/api/PageContent/ProfilePageData"
export const RES_DETAILS_PAGE_URL = "https://localhost:7181/api/PageContent/RestaurantDetailsPageData"


export const useFetchData = <T>(apiURL: string, params?: {}) => {

    const [data, setData] = useState<T | null>(null) //Generic return type
    const isFetched = useRef<boolean>(false)

    //Fetching Data
    async function fetchData(): Promise<void> {
        const response = await axios.get(apiURL, {
            params: params,
            headers: {
                'Authorization': API_KEY
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
        if (getCookie("jwt") && !isFetched.current) {
            asyncFetch()
            isFetched.current = true
        }
    }, [getCookie("jwt")])


    const isSuccess = isFetched.current
    return { data, isSuccess };
}