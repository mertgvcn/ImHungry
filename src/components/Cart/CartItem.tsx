import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
//type
import { CartItemType } from '../../types/CartType'
//css
import './styles/CartItem.css'
//exported functions
import { addToCart, deleteFromCart } from '../../setup/API/cart_api'


const CartItem = ({ currentUserID, data: { itemID, restaurantID, itemName, imageSource, price, amount } }: CartItemType) => {
    const { cartItemNumber, setCartItemNumber } = useContext(UserContext)

    const handleRemoveItem = async () => {
        await deleteFromCart(currentUserID, itemID, restaurantID)
        setCartItemNumber(Number(cartItemNumber) - 1)
    }

    const handleAddItem = async () => {
        await addToCart(currentUserID, itemID, restaurantID)
        setCartItemNumber(Number(cartItemNumber) + 1)
    }

    return (
        <>
            <div className='cart-item-wrapper'>
                <div className='item-image'>
                    <img src={require(`../../assets/FoodImages/${imageSource}`)} alt="img not found" />
                </div>

                <div className='item-info'>
                    <p>{itemName}</p>
                    <p style={{ color: '#555555', fontSize: '14px' }}>{price}TL</p>
                </div>

                <div className='item-process'>
                    <i id="item-process-button" className="fa-solid fa-circle-minus" onClick={handleRemoveItem}></i>
                    <p id="item-count">{amount}</p>
                    <i id="item-process-button" className="fa-solid fa-circle-plus" onClick={handleAddItem}></i>
                </div>
            </div>
        </>

    )
}

export default CartItem