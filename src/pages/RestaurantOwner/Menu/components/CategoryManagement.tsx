import React, { useState } from 'react'
//helpers
import { AddCategory, GetCategories } from '../../../../setup/API/RestaurantManagementAPIs/menu_api'
//css
import '../styles/CategoryManagement.css'
//models
import { Category } from '../../../../models/EntityModels/Category'
//components
import CategoryItemCard from './CategoryItemCard'
import { AddCategoryRequest } from '../../../../models/ParameterModels/MenuParameterModels'

type CategoryManagementType = {
    categories: Category[]
}

const CategoryManagement = (props: CategoryManagementType) => {
    const [categories, setCategories] = useState<Category[]>(props.categories)
    const [addNewCategoryState, setAddNewCategoryState] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState("")

    const refetchCategories = async () => {
        const response: any = await GetCategories()
        setCategories(response)
    }

    const isAddNewCategoryOpen = () => {
        if (!addNewCategoryState) {
            return (
                <i className="fa-solid fa-plus"></i>
            )
        }
        else {
            return (
                <i className="fa-solid fa-minus"></i>
            )
        }
    }

    const addCategory = async () => {
        const addCategoryParams: AddCategoryRequest = {
            name: newCategoryName
        }

        await AddCategory(addCategoryParams)
        await refetchCategories() //category silme ve uyarı ekle
    }

    return (
        <>
            <div className='category-management-container'>
                <div className="category-title">
                    <p>Sections</p>
                    <div className="add-button-wrapper" onClick={() => {
                        setAddNewCategoryState(!addNewCategoryState)
                        setNewCategoryName("")
                    }}>
                        {isAddNewCategoryOpen()}
                    </div>
                </div>

                {addNewCategoryState &&
                    <div className='add-new-category-wrapper'>
                        <input className="add-new-category-input" name='new-category' placeholder='Name of the new category'
                            type="text" autoFocus={true} onChange={(e) => { setNewCategoryName(e.target.value) }} />
                        <input className="add-new-category-button" type="button" value='Add' onClick={() => addCategory()} />
                    </div>
                }

                <div className='category-list'>
                    {categories.map((category) => (
                        <div className='category-item-card-wrapper' key={category.Id}>
                            <CategoryItemCard categoryInfo={category} />
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default CategoryManagement