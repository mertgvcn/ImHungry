import React, { useContext, useEffect, useRef, useState } from 'react'
import { PaymentContext } from '../../../context/PaymentContext'
import { ChangeContext } from '../../../context/ChangeContext'
import { UserContext } from '../../../context/UserContext'
//exported functions
import { Decrypt } from '../../../setup/Crypto/Cryption'
import { getRestaurantName } from '../../../setup/API/restaurant_api'
//css
import '../styles/Order.css'
import { getUserCartRestaurantID } from '../../../setup/API/cart_api'

const Order = () => {
    //Context
    const { ccID, locID } = useContext(PaymentContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //States
    const currentRestaurantID = useRef<number>(0)
    const [currentRestaurantName, setCurrentRestaurantName] = useState<string>();

    const fetchRestaurantName = async () => {
        const restaurantID = await getUserCartRestaurantID(_currentUserID)
        currentRestaurantID.current = restaurantID[0].restaurantID

        const restaurantName = await getRestaurantName(currentRestaurantID.current)
        setCurrentRestaurantName(restaurantName[0].name)
    }

    useEffect(() => {
        fetchRestaurantName()
    }, [])

    return (
        <>
            <div className="order-wrapper">

                {/* Title */}
                <div className="order-title-wrapper">
                    <p id='order-title'>Order Details</p>
                </div>

                {/* Body */}
                <div className="order-info-wrapper">
                    <p>Order Details</p>

                    <div className="cart-item-list">
                        <p>{currentRestaurantName}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order