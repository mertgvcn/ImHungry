import { useState } from 'react'
//css
import '../styles/MenuItem.css'
//types
import { IngredientType, MenuItemType } from '../../../types/RestaurantDataType'
//components
import AddItem from '../../../components/AddItem/AddItem'
import { GetItemIngredients } from '../../../setup/API/item_api'



const MenuItem = (props: MenuItemType) => {
  const { itemID, itemName, itemDescription, imageSource, price } = props.data

  //AddItem state
  const [addItemState, setAddItemState] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);


  const handleAddToCart = async () => {
    const ingredientList: any = await GetItemIngredients(itemID)
    setIngredients(ingredientList)
    setAddItemState(true)
  }


  return (
    <>
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


        <button id="add-to-cart" onClick={handleAddToCart}><i className="fa-solid fa-cart-plus"></i></button>

      </div>

      <AddItem trigger={addItemState} setTrigger={setAddItemState} itemData={props} ingredients={ingredients} />
    </>
  )
}

export default MenuItem