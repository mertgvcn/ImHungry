import React, { useEffect, useState } from 'react'
//css
import './styles/AddItem.css'
//types
import { IngredientType, MenuItemType } from '../../types/RestaurantDataType'
//helpers
import { GetItemIngredients } from '../../setup/API/item_api'
//components
import IngredientCard from './IngredientCard'


type AddItemProps = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
    itemData: MenuItemType
    ingredients: IngredientType[]
}


const AddItem = (props: AddItemProps) => {
    const { itemID, itemName, itemDescription, imageSource, price } = props.itemData.data
    
    const clickme = () => {
        const arr: string[] = []
        console.log("istenen içerikler : ")

        props.ingredients.map((ingredient) => {
            if(ingredient.isActive) {
                arr.push(ingredient.name)
            }
        })

        console.log(arr)
    }

    return props.trigger ? (
        <div className="add-item-background">
            <div className="add-item-wrapper">

                <div className="close-add-item">
                    <i className="fa-solid fa-x" onClick={() => {
                        props.setTrigger(false);
                    }}></i>
                </div>

                <div className="add-item-title">
                    <div className="row">
                        {imageSource && <img src={require(`../../assets/FoodImages/${imageSource}`)} alt="img not found" />}
                        <div className="col">
                            <p id="item-name">{itemName}</p>
                            {itemDescription && <p id="item-description">{itemDescription}</p>}
                        </div>
                    </div>
                </div>

                <div className="ingredients">
                    <p id='ingredients-title'>Ingredients</p>
                    <div className="ingredient-list">
                        {props.ingredients.map((ingredient, idx) => (
                            <div key={idx} onClick={() => {
                                ingredient.isActive = !ingredient.isActive
                            }}>
                                <IngredientCard name={ingredient.name}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="buttons">
                    <button id='confirm-add-item' onClick={clickme}>click me</button>
                    <button id='cancel-add-item'></button>
                </div>

            </div>
        </div>
    ) : null
}

export default AddItem