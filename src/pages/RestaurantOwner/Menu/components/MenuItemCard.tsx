import React from 'react'
import { ItemViewModel } from '../../../../models/ViewModels/ItemViewModel'
import '../styles/MenuItemCard.css'

type MenuItemCardType = {
    menuItem: ItemViewModel
}

const MenuItemCard = (props: MenuItemCardType) => {
    const { Id, Name, Description, ImageSource, Price } = props.menuItem

    return (
        <>
            <div className='menu-item-card-container'>
                {ImageSource && (
                    <div className="item-image">
                        <img src={require(`../../../../assets/FoodImages/${ImageSource}`)} alt="img not found" />
                    </div>
                )}

                <div className="item-info">
                    <div className="item-name-description">
                        <div className="item-name">{Name}</div>
                        <div className="item-description">{Description}</div>
                    </div>
                    <div className="item-price">{Price}TL</div>
                </div>

                {/*item management buttons*/}
                <div className='item-buttons'>
                    <i id='edit-button' className="fa-solid fa-pen-to-square"></i>
                </div>
            </div>
        </>
    )
}

export default MenuItemCard