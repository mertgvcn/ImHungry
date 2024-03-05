import React, { useState } from 'react'
//css
import '../styles/CategoryManagement.css'
//models
import { Category } from '../../../../models/EntityModels/Category'
//components
import CategoryItemCard from './CategoryItemCard'
import CategoryAdd from './CategoryAdd'

type CategoryManagementType = {
    categories: Category[]
}

const CategoryManagement = (props: CategoryManagementType) => {
    const [addNewCategoryState, setAddNewCategoryState] = useState(false)

    return (
        <>
            <div className='category-management-container'>
                <div className="category-title">
                    <p>Sections</p>
                    <div className="add-button-wrapper" onClick={() => {setAddNewCategoryState(true)}}>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                </div>

                <div className='add-new-category-wrapper'>
                    <input type="text" />
                </div>

                <div className='category-list'>
                    {props.categories.map((category) => (
                        <div className='category-item-card-wrapper' key={category.Id}>
                            <CategoryItemCard categoryInfo={category} />
                        </div>
                    ))}
                </div>
            </div>

            <CategoryAdd trigger={addNewCategoryState} setTrigger={setAddNewCategoryState} />
        </>

    )
}

export default CategoryManagement