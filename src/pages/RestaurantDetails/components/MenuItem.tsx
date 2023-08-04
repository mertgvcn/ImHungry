import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
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

  const { currentUserID, cartItemNumber, setCartItemNumber }: any = useContext(UserContext)
  const _currentUserID = Number(Decrypt(currentUserID))

  const handleAddToCard = async () => {
    await addToCart(_currentUserID, itemID, currentRestaurantID)
    setCartItemNumber(Number(cartItemNumber)+1)
    popAlert("green", itemName + " added to cart!")
  }

  //*ALERT PROPERTIES
  const [color, setColor] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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


        <div id="add-to-cart" onClick={handleAddToCard}><i className="fa-solid fa-cart-plus"></i></div>

      </div>
    </>

  )
}

export default MenuItem