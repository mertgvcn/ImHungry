import React, { useState } from 'react'
//css
import '../styles/CategoryItemCard.css'
//models
import { Category } from '../../../../models/EntityModels/Category'

type CategoryItemCardType = {
    categoryInfo: Category
}

const CategoryItemCard = (props: CategoryItemCardType) => {
    const [editState, setEditState] = useState(false)

    const isEditOpen = () => {
        if (!editState) {
            return (<i className="fa-regular fa-pen-to-square"></i>)
        }
        else {
            return (<i className="fa-solid fa-down-left-and-up-right-to-center"></i>)
        }
    }

    return (
        <>
            <div className='category-item-card-container'>
                <div className='category-name'>
                    <i className="fa-regular fa-circle"></i>
                    <p>{props.categoryInfo.Name}</p>
                </div>

                <div className='category-edit-button' onClick={() => setEditState(!editState)}>
                    {isEditOpen()}
                </div>
            </div>

            {editState &&
                <div className='category-edit-container'>
                    <div className='edit-name-wrapper'>
                        <p>Name: </p>
                        <input className="name-input" type="text" value={props.categoryInfo.Name} />
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                </div>
            }
        </>

    )
}

export default CategoryItemCard