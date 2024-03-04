import React, { useEffect, useRef, useState } from 'react'
import '../styles/MenuManagement.css'
import { Category } from '../../../../models/EntityModels/Category'
import { ItemViewModel } from '../../../../models/ViewModels/ItemViewModel'
import MenuItemCard from './MenuItemCard'


type MenuManagementType = {
  menu: ItemViewModel[]
  categories: Category[]
}


const MenuManagement = (props: MenuManagementType) => {
  const [categories, setCategories] = useState<Category[]>(props.categories)
  const [menu, setMenu] = useState<ItemViewModel[]>(props.menu)

  const placeItems = (categoryID: number) => { //Placing menu items to correct sections (each item should be under its own category)
    return menu?.map((menuItem) => {
      if (menuItem.Category.Id == categoryID) {
        return (
          <MenuItemCard menuItem={menuItem} key={menuItem.Id} />
        );
      }
      return null;
    }).filter((item) => item !== null); // null değerleri filtrele
  };

  return (
    <div className='menu-management-container'>
      <div className="menu-title">
        <p>Menu</p>
      </div>

      <ul className='menus'> {/*Her kategori altında o kategoriye ait yemekler gözükecek şekilde*/}
        {categories?.map((category) => (
          <div className='menu-sections' key={category.Id}>
            <p id="menu-title">{category.Name}</p>
            <div className="menu-items">
              {placeItems(category.Id)}
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default MenuManagement