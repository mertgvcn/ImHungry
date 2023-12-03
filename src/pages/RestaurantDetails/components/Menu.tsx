import { useEffect, useRef, useState } from 'react'
//TYPE
import { ItemViewModel } from '../../../models/ViewModels/ItemViewModel'
import { Category } from '../../../models/EntityModels/Category'
//CSS
import '../styles/Menu.css'
//COMPONENTS
import MenuItem from './MenuItem'


type MenuPropType = {
    menu: ItemViewModel[]
}


const Menu = (props: MenuPropType) => {
    const [menuTitles, setMenuTitles] = useState<Category[]>([])
    const [menu, setMenu] = useState<ItemViewModel[]>(props.menu)
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
        var categoryNames: string[] = [] //we need categoryNames to track menuTitles
        var menuTitles: Category[] = [] //not primitive type, includes() doesnt work for this.

        menu.map((item) => {
            if (!categoryNames.includes(item.Category.Name)) { 
                categoryNames.push(item.Category.Name)
                menuTitles.push({
                    Id: item.Category.Id,
                    Name: item.Category.Name
                })
            }
        })

        setMenuTitles(menuTitles)
    }


    const placeItems = (categoryID: number) => { //Placing menu items to correct sections (each item should be under its own category)
        return menu?.map((menuItem) => {
            if (menuItem.Category.Id == categoryID) {
                return (
                    <MenuItem menuItem={menuItem} key={menuItem.Id} />
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
                    <div className='menu-sections' key={title.Id}>
                        <p id="menu-title">{title.Name}</p>
                        <div className="menu-items">
                            {placeItems(title.Id)}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Menu