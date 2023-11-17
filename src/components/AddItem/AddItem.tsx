import React, { useContext, useRef, useState } from 'react'
import { ChangeContext } from '../../context/ChangeContext'
import { useLocation } from 'react-router-dom'
//css
import './styles/AddItem.css'
//types
import { IngredientType, MenuItemType } from '../../types/RestaurantDataType'
import { CartTransactionRequest } from '../../models/ParameterModels/CartParameterModels'
//helpers
import { usePopAlert } from '../../hooks/usePopAlert'
import { AddItemToCart } from '../../setup/API/cart_api'
//components
import IngredientCard from './IngredientCard'
import Alert from '../Shared/Alert'


type AddItemProps = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
    itemData: MenuItemType
    ingredients: IngredientType[]
}


const AddItem = (props: AddItemProps) => {
    const { itemID, itemName, itemDescription, imageSource, price } = props.itemData.data

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
                itemID: itemID,
                restaurantID: currentRestaurantID,
                ingredients: getRequestedIngredients(),
                amount: amount
            }
            try {
                await AddItemToCart(addItemToCartRequest)
                popAlert("green", `${itemName} added to the cart`)
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
                requestedIngredients.push(ingredient.name)
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
                            {imageSource && <img src={require(`../../assets/FoodImages/${imageSource}`)} alt="img not found" />}
                            <div className="col">
                                <p id="item-name">{itemName}</p>
                                {itemDescription && <p id="item-description">{itemDescription}</p>}
                            </div>
                        </div>
                    </div>

                    {props.ingredients.length > 0 && <div className="ingredients">
                        <p id='ingredients-title'>Ingredients</p>
                        <div className="ingredient-list">
                            {props.ingredients.map((ingredient, idx) => (
                                <div key={idx} onClick={() => {
                                    ingredient.isActive = !ingredient.isActive
                                }}>
                                    <IngredientCard name={ingredient.name} />
                                </div>
                            ))}
                        </div>
                    </div>}

                    <div className="add-item-confirm">
                        <div className='amount-price'>
                            <i id='change-amount-button' className="fa-solid fa-circle-minus" onClick={handleDecreaseAmount}></i>
                            <p>{amount}</p>
                            <i id='change-amount-button' className="fa-solid fa-circle-plus" onClick={handleIncreaseAmount}></i>
                            <p id='total-price'>Price : {amount * parseInt(price)}TL</p>
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