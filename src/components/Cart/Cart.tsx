import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
//context
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import { ChangeContext } from '../../context/ChangeContext'
//css
import './styles/Cart.css'
//helpers
import { getUserCartItems } from '../../setup/API/cart_api'
import { Decrypt } from '../../setup/Crypto/Cryption'
//Types
import { CartDataType, CartItemsType } from '../../types/CartTypes/CartDataType'
//Components
import CartItem from './CartItem'
import CartAlert from './CartAlert'
import useDidMountUpdate from '../../hooks/useDidMountUpdate'


const API_KEY = process.env.REACT_APP_APIKEY

type propsType = {
  trigger: boolean,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  cart: CartDataType
}



const Cart = (props: propsType) => {
  //Context
  const { cartToggle } = useContext(ChangeContext)
  const { cartItemAmount, setCartItemAmount } = useContext(CartContext)
  const { currentUserID, } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  //Cart Alert State
  const [isAlert, setIsAlert] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")

  //Item Info
  const didComponentMount = useRef(false)
  const [items, setItems] = useState<CartItemsType[]>(props.cart.cartItems)
  const [itemRestaurantNames, setItemRestaurantNames] = useState<string[]>([])
  const totalPrice = items?.reduce((total, item) => (total += item.price * item.amount), 0)
  const itemAmount = items?.reduce((amount, item) => (amount += item.amount), 0)

  const fetchCartItems = async () => {
    console.log("cart items fetchleniyorr..")
    const data: any = await getUserCartItems(_currentUserID)
    setItems(data)
  }

  async function syncFetch() {
    if (_currentUserID) {
      await fetchCartItems()
      extractRestaurantNames()
      setCartItemAmount(itemAmount)
    }
  }

  useDidMountUpdate(() => {
    syncFetch()
  }, [cartToggle])

  //Functions
  const extractRestaurantNames = () => {
    var restaurantNames: string[] = []

    items?.map((item) => {
      if (!restaurantNames.includes(item.name)) {
        restaurantNames.push(item.name)
      }
    })

    setItemRestaurantNames(restaurantNames)
  }

  const placeItems = (restaurantName: string) => {
    return items?.map((item, idx) => {
      if (restaurantName === item.name) {
        return (
          <CartItem currentUserID={_currentUserID} data={item} key={idx} />
        )
      }
      return null
    }).filter((item) => item !== null); // null değerleri filtrele
  }

  const handleConfirm = () => {
    if (items?.length == 0) {
      setIsAlert(true)
      setMsg("Please add product to the cart first")

      setTimeout(() => {
        setIsAlert(false)
      }, 2500)

      return;
    }

    window.location.href = "/payment"
  }

  useEffect(() => {
    if(didComponentMount.current) {
      setCartItemAmount(itemAmount)
      extractRestaurantNames()
    }

    didComponentMount.current = true
  }, [])

  return (
    <>
      <div className='cart-wrapper' style={props.trigger ? { right: "0px" } : { right: "-100%" }}>
        <i id='back' className="fa-solid fa-left-long" onClick={() => props.setTrigger(false)}></i>

        <div className="cart-body">
          <p id="cart-title">Your Cart</p>
          <p id='product-list-title'>Products</p>

          <div className='products'>
            {
              itemRestaurantNames.map((restaurantName, idx) => (
                <div className='item-list' key={idx}>
                  <p>{restaurantName}</p>
                  <div className='items'>
                    {placeItems(restaurantName)}
                  </div>
                </div>
              ))
            }
          </div>

          <hr />

          <p id="total-price">Total Price: {totalPrice} TL</p>

          <button id="cart-confirm-button" onClick={handleConfirm}>Confirm Cart</button>
        </div>

        <CartAlert trigger={isAlert} setTrigger={setIsAlert} msg={msg} />
      </div>
    </>
  )
}

export default Cart