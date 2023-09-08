import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
//context
import { UserContext } from "../context/UserContext"
//helpers
import { Decrypt } from "../setup/Crypto/Cryption"
//types
import { DataType } from "../types/DataType"
import { CartItemsType } from "../types/CartTypes/CartDataType"

const API_KEY = process.env.REACT_APP_APIKEY


export const useFetchData = () => {
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    const [data, setData] = useState<DataType>({ //Backendte null yerine boş array döndür
        cart: {
            cartItems: [],
            cartItemNumber: 0
        },
        location: {
            userLocations: []
        },
        user: {
            accountInfo: [],
            currentLocation: []
        },
        creditCard: {
            userCreditCards: []
        },
        restaurant: {
            restaurantList: []
        }
    })
    const isFetched = useRef<boolean>(false)

    async function fetchData():Promise<void> {
        const response = await axios.get("https://localhost:7181/api/FetchData/getData", {
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

    useEffect(() => {
        if (currentUserID && !isFetched.current) {
            asyncFetch()
            isFetched.current = true
        }    
    }, [currentUserID])



    return {data, isFetched};
}