import { useState } from 'react'
//css
import '../styles/MenuItem.css'
//models
import { ItemViewModel } from '../../../models/ViewModels/ItemViewModel'
import { GetItemIngredientResponse } from '../../../models/ParameterModels/ItemParameterModels'
//components
import AddItem from '../../../components/AddItem/AddItem'
//helpers
import { GetItemIngredients } from '../../../setup/API/item_api'


type MenuItemType = {
  menuItem: ItemViewModel
}


const MenuItem = (props : MenuItemType) => {
  const { Id, Name, Description, ImageSource, Price } = props.menuItem

  //AddItem state
  const [addItemState, setAddItemState] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<GetItemIngredientResponse[]>([]);


  const handleAddToCart = async () => {
    const ingredientList: any = await GetItemIngredients(Id)
    setIngredients(ingredientList)
    setAddItemState(true)
  }


  return (
    <>
      <div className='menu-item-wrapper'>
        {ImageSource && (
          <div className="item-image">
            <img src={require(`../../../assets/FoodImages/${ImageSource}`)} alt="img not found" />
          </div>
        )}

        <div className="item-info">
          <div className="item-name-description">
            <div className="item-name">{Name}</div>
            <div className="item-description">{Description}</div>
          </div>
          <div className="item-price">{Price}TL</div>
        </div>


        <button id="add-to-cart" onClick={handleAddToCart}><i className="fa-solid fa-cart-plus"></i></button>

      </div>

      <AddItem trigger={addItemState} setTrigger={setAddItemState} itemData={props.menuItem} ingredients={ingredients} />
    </>
  )
}

export default MenuItem