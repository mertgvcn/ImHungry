import React from 'react'
//css
import '../styles/CategoryItemCard.css'
//models
import { Category } from '../../../../models/EntityModels/Category'

type CategoryItemCardType = {
    categoryInfo: Category
}

const CategoryItemCard = (props: CategoryItemCardType) => {
    return (
        <div className='category-item-card-container'>
            <div className='category-name'>
                <i className="fa-regular fa-circle"></i>
                <p>{props.categoryInfo.Name}</p>
            </div>
        </div>
    )
}

export default CategoryItemCard