import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//context
import { CartContext } from '../../context/CartContext'
import { ChangeContext } from '../../context/ChangeContext'
//css
import './styles/Cart.css'
//helpers
import { GetUserCartItemList } from '../../setup/API/UserAPIs/cart_api'
import { getCookie } from '../../setup/Cookie'
//models
import { CartItemViewModel } from '../../models/ViewModels/CartItemViewModel'
//components
import CartItem from './CartItem'
import CartAlert from './CartAlert'
import useDidMountUpdate from '../../hooks/useDidMountUpdate'


type propsType = {
  trigger: boolean,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  cartItems: CartItemViewModel[]
}


const Cart = (props: propsType) => {
  //Context
  const { cartToggle } = useContext(ChangeContext)
  const { setCartItemAmount } = useContext(CartContext)
  const navigate = useNavigate()


  //Cart Alert State
  const [isAlert, setIsAlert] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")


  //Item Info
  const didComponentMount = useRef(false)
  const [cartItems, setCartItems] = useState<CartItemViewModel[]>(props.cartItems)
  const [itemRestaurantNames, setItemRestaurantNames] = useState<string[]>([])
  const totalPrice = cartItems?.reduce((total, cartItem) => (total += cartItem.Item.Price * cartItem.Amount), 0)
 
  
  //On first render
  useEffect(() => {
    if(!didComponentMount.current) {
      setCartItemAmount(getItemAmount(cartItems))
      extractRestaurantNames(cartItems)
    }

    didComponentMount.current = true
  }, [])


  //If change occurs, re-fetch cart. 
  const fetchCartItems = async (): Promise<void> => {
    const data: any = await GetUserCartItemList()
    setCartItems(data)
    extractRestaurantNames(data)
    setCartItemAmount(getItemAmount(data))

    return new Promise((resolve) => { resolve() })
  }

  useDidMountUpdate(() => {
    if (getCookie("jwt")) {
      fetchCartItems()
    }
  }, [cartToggle])

  
  //Functions
  const extractRestaurantNames = (cartItemList: CartItemViewModel[]) => {
    var restaurantNames: string[] = []

    cartItemList?.map((cartItem) => {
      if (!restaurantNames.includes(cartItem.Restaurant.Name)) {
        restaurantNames.push(cartItem.Restaurant.Name)
      }
    })

    setItemRestaurantNames(restaurantNames)
  }

  const placeItems = (restaurantName: string) => {
    return cartItems?.map((cartItem, idx) => {
      if (restaurantName === cartItem.Restaurant.Name) {
        return (
          <CartItem cartItem={cartItem} key={idx} />
        )
      }
      return null
    }).filter((item) => item !== null); // null değerleri filtrele
  }

  const handleConfirm = () => {
    if (cartItems?.length == 0) {
      setIsAlert(true)
      setMsg("Please add product to the cart first")

      setTimeout(() => {
        setIsAlert(false)
      }, 2500)

      return;
    }

    navigate("/payment")
  }

  const getItemAmount = (cartItemList: CartItemViewModel[]) => {
    return cartItemList.reduce((amount, cartItem) => (amount += cartItem.Amount), 0)
  }

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