import React from 'react'
//css
import '../styles/CategoryAdd.css'

type CategoryAddNewProps = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryAdd = (props: CategoryAddNewProps) => {


    return props.trigger ? (
        <div className='add-category-background'>
            <div className="add-category-container">
                <div className='close-add-category'>
                    <i className="fa-solid fa-square-xmark" onClick={() => {props.setTrigger(false)}}></i>
                </div>
                <p>Add New Category</p>
                <input type="text" />
                <button>Save</button>

            </div>
        </div>
    )
        : null
}

export default CategoryAdd