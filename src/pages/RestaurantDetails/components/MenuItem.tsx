import React, { useContext, useState } from 'react'
//context
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { CartContext } from '../../../context/CartContext'
import { ChangeContext } from '../../../context/ChangeContext'
//CSS
import '../styles/MenuItem.css'
//TYPE
import { MenuItemType } from '../../../types/RestaurantType'
//EXPORTED FUNCTIONS
import { addToCart } from '../../../setup/API/cart_api'
import { Decrypt } from '../../../setup/Crypto/Cryption'
import Alert from '../../../components/Shared/Alert'



const MenuItem = ({ data: { itemID, itemName, itemDescription, imageSource, price } }: MenuItemType) => {

  const location = useLocation()
  const currentRestaurantID = location.state.data;

  const {cartToggle, setCartToggle} = useContext(ChangeContext)
  const { setCartItemAmount } = useContext(CartContext)
  const { currentUserID }: any = useContext(UserContext)
  const _currentUserID = Number(Decrypt(currentUserID))

  //Button state
  const [disabled, setDisabled] = useState<boolean>(false);

  //*ALERT PROPERTIES
  const [color, setColor] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const AddToCart = () => {
    if (!disabled) {
      handleAddToCart()
    }
  }

  const handleAddToCart = async () => {
    setDisabled(true)
    const response = await addToCart(_currentUserID, itemID, currentRestaurantID)

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


  //Support functions
  const popAlert = (color: string, msg: string) => {
    setIsOpen(true)
    setColor(color)
    setMsg(msg)

    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }



  return (
    <>
      <Alert isOpen={isOpen} color={color} msg={msg} />

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