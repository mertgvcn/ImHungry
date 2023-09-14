import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
//EXPORTED FUNCTIONS
import { getMenuTitles, getMenu } from '../../../setup/API/restaurant_api'
//TYPE
import { CategoryType, MenuType } from '../../../types/RestaurantDataType'
//CSS
import '../styles/Menu.css'
//COMPONENTS
import MenuItem from './MenuItem'


type MenuPropType = {
    menu: MenuType[]
}


const Menu = (props: MenuPropType) => {
    const [menuTitles, setMenuTitles] = useState<CategoryType[]>([])
    const [menu, setMenu] = useState<MenuType[]>(props.menu)
    const didComponentMount = useRef(false)
    
    
    //On first render
    useEffect(() => {
        if(!didComponentMount.current) {
            extractCategoryNames()
        }

        didComponentMount.current = true
    }, [])


    //Functions
    const extractCategoryNames = () => {
        var categoryNames: string[] = []
        var menuTitles: CategoryType[] = [] //not primitive type, includes() doesnt work for this.

        menu.map((item) => {
            if (!categoryNames.includes(item.categoryName)) {
                categoryNames.push(item.categoryName)
                menuTitles.push({
                    categoryID: item.categoryID,
                    categoryName: item.categoryName
                })
            }
        })

        setMenuTitles(menuTitles)
    }


    const placeItems = (categoryID: string) => { //Placing menu items to correct sections (each item should be under its own category)
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
                            {placeItems(title.categoryID)}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Menu