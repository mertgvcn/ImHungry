import React from 'react'
import '../styles/MenuItem.css'
import { MenuItemType } from '../../../types/RestaurantType'

const MenuItem = ({ data: { itemName, itemDescription, imageSource,  price} }: MenuItemType) => {

  const handleAddToCard = () => {
    console.log("sa")
  }

  return (
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
  )
}

export default MenuItem