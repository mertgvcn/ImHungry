import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
//EXPORTED FUNCTIONS
import { getMenuTitles, getMenu } from '../../../setup/API/restaurant_api'
//TYPE
import { MenuTitlesType, MenuType } from '../../../types/RestaurantType'
//CSS
import '../styles/Menu.css'
//COMPONENTS
import MenuItem from './MenuItem'





const Menu = () => {
    const location = useLocation()
    const currentRestaurantID = location.state.data;

    const [menuTitles, setMenuTitles] = useState<Array<MenuTitlesType>>()
    const [menu, setMenu] = useState<Array<MenuType>>()

    const fetchMenuTitles = async () => { //Gives us distinct category id and category name according to categories the restaurant has
        const data = await getMenuTitles(currentRestaurantID)
        setMenuTitles(data)
    }

    const fetchRestaurantMenu = async () => {
        const data = await getMenu(currentRestaurantID)
        setMenu(data)
    }

    useEffect(() => {
        fetchMenuTitles()
        fetchRestaurantMenu()
    }, [])

    //Placing menu items to correct sections (each item should be under its own category)
    const ExtractMenuItemByCategoryID = (categoryID: string) => {
        return menu?.map((menuItem) => {
            if (menuItem.categoryID === categoryID) {
                return (
                    <MenuItem data={menuItem} key={menuItem.itemName} />
                );
            }
            return null;
        }).filter((item) => item !== null); // null değerleri filtrele
    };

    return (
        <div className='menu-wrapper'>
            <div className="main-title">
                <p>MENU</p>
            </div>
            <ul className='menus'> {/*Her kategori altında o kategoriye ait yemekler gözükecek şekilde*/}
                {menuTitles?.map((title) => (
                    <div className='menu-sections' key={title.categoryID}>
                        <p id="menu-title">{title.categoryName}</p>
                        <div className="menu-items">
                            {ExtractMenuItemByCategoryID(title.categoryID)}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Menu