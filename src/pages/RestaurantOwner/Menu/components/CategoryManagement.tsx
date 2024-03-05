import React from 'react'
//css
import '../styles/CategoryManagement.css'
//models
import { Category } from '../../../../models/EntityModels/Category'
//components
import CategoryItemCard from './CategoryItemCard'

type CategoryManagementType = {
    categories: Category[]
}

const CategoryManagement = (props: CategoryManagementType) => {

    return (
        <div className='category-management-container'>
            <div className="category-title">
                <p>Categories</p>
            </div>

            <div className='category-list'>
                {props.categories.map((category) => (
                    <div className='category-item-card-wrapper' key={category.Id}>
                        <CategoryItemCard categoryInfo={category} />
                    </div>
                ))}
            </div>

            <div className="add-new-category-wrapper">
                <div className="add-new-category-button">
                    <i className="fa-solid fa-plus"></i>
                    <p>Add New Category</p>
                </div>
            </div>

        </div>
    )
}

export default CategoryManagement