import React, { useContext, useState } from 'react'
//context
import { useLocation } from 'react-router-dom'
import { CartContext } from '../../../context/CartContext'
import { ChangeContext } from '../../../context/ChangeContext'
//CSS
import '../styles/MenuItem.css'
//TYPE
import { MenuItemType } from '../../../types/RestaurantDataType'
import { CartTransactionRequest } from '../../../models/parameters/cartParams/CartTransactionRequest'
//EXPORTED FUNCTIONS
import { usePopAlert } from '../../../hooks/usePopAlert'
import Alert from '../../../components/Shared/Alert'
import { AddItemToCart } from '../../../setup/API/cart_api'



const MenuItem = ({ data: { itemID, itemName, itemDescription, imageSource, price } }: MenuItemType) => {

  const location = useLocation()
  const currentRestaurantID = location.state.data;

  const { cartToggle, setCartToggle } = useContext(ChangeContext)
  const { setCartItemAmount } = useContext(CartContext)
  const {alertStates, popAlert} = usePopAlert()

  //Button state
  const [disabled, setDisabled] = useState<boolean>(false);

  const AddToCart = () => {
    if (!disabled) {
      handleAddToCart()
    }
  }

  const handleAddToCart = async () => {
    setDisabled(true)

    const addItemToCartRequest: CartTransactionRequest = {
      itemID: itemID,
      restaurantID: currentRestaurantID
    }
    const response = await AddItemToCart(addItemToCartRequest)

    if (response.data != "different_restaurant") {
      popAlert("green", itemName + " added to cart!")
      setCartItemAmount((currentAmount: any) => {
        return Number(currentAmount) + 1
      })
      setCartToggle(!cartToggle)
    }
    else {
      popAlert("red", "There are products from another restaurants in the cart!")
    }

    setDisabled(false)
  }


  return (
    <>
      <Alert isOpen={alertStates.isOpen} color={alertStates.color} msg={alertStates.msg} />

      <div className='menu-item-wrapper'>
        {imageSource && (
          <div className="item-image">
            <img src={require(`../../../assets/FoodImages/${imageSource}`)} alt="img not found" />
          </div>
        )}

        <div className="item-info">
          <div className="item-name-description">
            <div className="item-name">{itemName}</div>
            <div className="item-description">{itemDescription}</div>
          </div>
          <div className="item-price">{price}TL</div>
        </div>


        <button id="add-to-cart" onClick={AddToCart} disabled={disabled}><i className="fa-solid fa-cart-plus"></i></button>

      </div>
    </>

  )
}

export default MenuItem