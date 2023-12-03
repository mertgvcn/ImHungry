import React, { useContext, useRef, useState } from 'react'
import { ChangeContext } from '../../context/ChangeContext'
import { useLocation } from 'react-router-dom'
//css
import './styles/AddItem.css'
//types
import { CartTransactionRequest } from '../../models/ParameterModels/CartParameterModels'
import { ItemViewModel } from '../../models/ViewModels/ItemViewModel'
import { GetItemIngredientResponse } from '../../models/ParameterModels/ItemParameterModels'
//helpers
import { usePopAlert } from '../../hooks/usePopAlert'
import { AddItemToCart } from '../../setup/API/cart_api'
//components
import IngredientCard from './IngredientCard'
import Alert from '../Shared/Alert'


type AddItemProps = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
    itemData: ItemViewModel
    ingredients: GetItemIngredientResponse[]
}


const AddItem = (props: AddItemProps) => {
    const { itemData, ingredients } = props

    const location = useLocation()
    const currentRestaurantID = location.state.data;

    const { cartToggle, setCartToggle } = useContext(ChangeContext)
    const { alertStates, popAlert } = usePopAlert()

    const [amount, setAmount] = useState<number>(1)
    const isAddingProcessContinuing = useRef<boolean>(false)


    const handleDecreaseAmount = () => {
        if (amount <= 1) {
            return;
        }

        setAmount((prev) => {
            return prev - 1
        })
    }

    const handleIncreaseAmount = () => {
        setAmount((prev) => {
            return prev + 1
        })
    }

    const handleAddToCart = async () => {
        if (!isAddingProcessContinuing.current) {
            isAddingProcessContinuing.current = true

            const addItemToCartRequest : CartTransactionRequest= {
                CartItemID: 0,
                ItemID: itemData.Id,
                RestaurantID: currentRestaurantID,
                Ingredients: getRequestedIngredients(),
                Amount: amount
            }
            try {
                await AddItemToCart(addItemToCartRequest)
                popAlert("green", `${itemData.Name} added to the cart`)
                setCartToggle(!cartToggle)
            }
            catch {
                popAlert("red", "Item could not be added")
            }

            isAddingProcessContinuing.current = false
        }
    }

    const getRequestedIngredients = () => {
        const requestedIngredients: string[] = []

        props.ingredients.map((ingredient) => {
            if (ingredient.isActive) {
                requestedIngredients.push(ingredient.Name)
            }
        })

        return requestedIngredients.toString()
    }

    return props.trigger ? (
        <>
            <div className="add-item-background">
                <div className="add-item-wrapper">

                    <div className="close-add-item">
                        <i className="fa-solid fa-x" onClick={() => {
                            props.setTrigger(false);
                            setAmount(1);
                        }}></i>
                    </div>

                    <div className="add-item-title">
                        <div className="row">
                            {itemData.ImageSource && <img src={require(`../../assets/FoodImages/${itemData.ImageSource}`)} alt="img not found" />}
                            <div className="col">
                                <p id="item-name">{itemData.Name}</p>
                                {itemData.Description && <p id="item-description">{itemData.Description}</p>}
                            </div>
                        </div>
                    </div>

                    {ingredients.length > 0 && <div className="ingredients">
                        <p id='ingredients-title'>Ingredients</p>
                        <div className="ingredient-list">
                            {ingredients.map((ingredient, idx) => (
                                <div key={idx} onClick={() => {
                                    ingredient.isActive = !ingredient.isActive
                                }}>
                                    <IngredientCard name={ingredient.Name} />
                                </div>
                            ))}
                        </div>
                    </div>}

                    <div className="add-item-confirm">
                        <div className='amount-price'>
                            <i id='change-amount-button' className="fa-solid fa-circle-minus" onClick={handleDecreaseAmount}></i>
                            <p>{amount}</p>
                            <i id='change-amount-button' className="fa-solid fa-circle-plus" onClick={handleIncreaseAmount}></i>
                            <p id='total-price'>Price : {amount * itemData.Price}TL</p>
                        </div>
                        <button id='confirm-add-item' onClick={handleAddToCart}><i className="fa-solid fa-cart-plus" style={{ marginRight: 5 }}></i>Add To Cart</button>
                    </div>

                </div>
            </div>

            <Alert isOpen={alertStates.isOpen} msg={alertStates.msg} color={alertStates.color}/>
        </>
    ) : null
}

export default AddItem