import React, { useEffect, useState } from 'react'
import './styles/AddItem.css'
import { addItem, getCategories } from '../../setup/API/admin_api'
import { categoryType } from '../../types/CategoryType'

const AddItem = () => {
    const [itemName, setItemName] = useState<string>("")
    const [itemDescription, setItemDescription] = useState<string>("")
    const [imageSource, setImageSource] = useState<string>("")
    const [categoryID, setCategoryID] = useState<string>("1")
    const [price, setPrice] = useState<string>("")

    const [categories, setCategories] = useState<categoryType[]>([])

    const fetchCategories = async () => {
        const data = await getCategories()
        setCategories(data)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleCategoryChange = (e:any) => {
        const selectedCategoryId = e.target.value;
        setCategoryID(selectedCategoryId);
    }

    const handleAddItem = async () => {       
        const response = await addItem(itemName, itemDescription, imageSource, categoryID, price)
        console.log(response.data)
    }

    return (
        <div>
            <div className="add-item-wrapper">
                <h2>ADD ITEM</h2>
                <input type="text" placeholder='item name'
                    value={itemName} onChange={(e) => setItemName(e.target.value)} />
                <input type="text" placeholder='item description'
                    value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                <input type="text" placeholder='image source'
                    value={imageSource} onChange={(e) => setImageSource(e.target.value)} />
                <select onChange={handleCategoryChange}>
                    {categories?.map((category) => {
                        return <option value={category.categoryID} key={category.categoryID}>{category.categoryName}</option>
                    })}
                </select>
                <input type="text" placeholder='price'
                    value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="button" value="add" onClick={handleAddItem} />
            </div>
        </div>
    )
}

export default AddItem