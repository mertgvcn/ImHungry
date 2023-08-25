import React, { useContext, useEffect, useRef, useState } from 'react'
import { PaymentContext } from '../../../context/PaymentContext'
import { ChangeContext } from '../../../context/ChangeContext'
import { UserContext } from '../../../context/UserContext'
//exported functions
import { Decrypt } from '../../../setup/Crypto/Cryption'
//css
import '../styles/Order.css'

const Order = () => {
    //Context
    const { ccID, locID } = useContext(PaymentContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //States






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
                        <p>{}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order