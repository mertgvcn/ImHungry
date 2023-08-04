import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
//CSS
import './styles/Cart.css'
//Exported Functions
import { getUserCartItems, getUserCartTotalPrice } from '../../setup/API/cart_api'
import { Decrypt } from '../../setup/Crypto/Cryption'
//Types
import { CartType } from '../../types/CartType'
//Components
import CartItem from './CartItem'

type propsType = {
  trigger: boolean,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const Cart = (props: propsType) => {
  const { currentUserID, cartItemNumber } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  const [items, setItems] = useState<Array<CartType>>()
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const fetchCartItems = async () => {
    if (_currentUserID) {
      const data = await getUserCartItems(_currentUserID)
      setItems(data)
    }
  }

  const fetchCartTotalPrice = async () => {
    if (_currentUserID) {
      const data = await getUserCartTotalPrice(_currentUserID)
      if(data[0].sum == null) {
        data[0].sum = 0
      }
      setTotalPrice(data[0].sum)
    }
  }

  useEffect(() => {
    fetchCartItems()
    fetchCartTotalPrice()
  }, [props.trigger, cartItemNumber])

  return (
    <div className='cart-wrapper' style={props.trigger ? { right: "0px" } : { right: "-100%" }}>
      <i id='back' className="fa-solid fa-left-long" onClick={() => props.setTrigger(false)}></i>

      <div className="cart-body">
        <p id="cart-title">Your Cart</p>
        <p id='product-list-title'>Products</p>

        <div className='products'>
          {items?.map((item, index) => (
            <CartItem currentUserID={_currentUserID} data={item} key={index} />
          ))}
        </div>

        <hr />

        <p id="total-price">Total Price: {totalPrice} TL</p>

        <button id="cart-confirm-button">CONFIRM CART</button>
      </div>
    </div>
  )
}

export default Cart