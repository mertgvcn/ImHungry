import React, { useContext, useState } from 'react'
//context
import { CartContext } from '../../context/CartContext'
import { ChangeContext } from '../../context/ChangeContext'
//type
import { CartItemType } from '../../types/CartType'
//css
import './styles/CartItem.css'
//helpers
import { AddItemToCart, DeleteItemFromCart } from '../../setup/API/cart_api'
import { CartTransactionRequest } from '../../models/parameters/cartParams/CartTransactionRequest'
//components
import ConfirmPopUp from '../Shared/ConfirmPopUp'


const CartItem = ({ data: { itemID, restaurantID, itemName, imageSource, price, amount, ingredients } }: CartItemType) => {
    const { cartToggle, setCartToggle } = useContext(ChangeContext)
    const { setCartItemAmount } = useContext(CartContext)

    //ingredient states
    const [ingredientListState, setIngredientListState] = useState<boolean>(false)
    const ingredientList = stringToArray(ingredients, ",")

    //confirm state
    const [confirmProperties, setConfirmProperties] = useState({
        isOpen: false,
        msg: "",
    })

    const cartTransactionRequest: CartTransactionRequest = {
        itemID: itemID,
        restaurantID: restaurantID,
        ingredients: ingredients,
        amount: 0
    }

    const handleRemoveItem = async () => {
        //To avoid missclick deletion, ask user is it intended or not
        if (amount == 1) {
            setConfirmProperties({
                isOpen: true,
                msg: `Do you want to delete ${itemName} from the cart?`
            })
        }
        else {
            await handleDeleteItem()
        }
    }

    const handleDeleteItem = async () => {
        cartTransactionRequest.amount = -1
        
        await DeleteItemFromCart(cartTransactionRequest)

        setCartItemAmount((currentAmount: any) => {
            return Number(currentAmount) - 1
        })
        setCartToggle(!cartToggle)
    }

    const handleAddItem = async () => {
        cartTransactionRequest.amount = 1

        await AddItemToCart(cartTransactionRequest)

        setCartItemAmount((currentAmount: any) => {
            return Number(currentAmount) + 1
        })
        setCartToggle(!cartToggle)
    }

    return (
        <>
            <div className='cart-item-wrapper'>

                {ingredients &&
                    <i id="show-ingredients-button" className={ingredientListState ? "fa-solid fa-circle-chevron-down" : "fa-solid fa-circle-chevron-right"}
                        onClick={() => {
                            setIngredientListState(!ingredientListState)
                        }}></i>}

                <div className='item-image'>
                    <img src={require(`../../assets/FoodImages/${imageSource}`)} alt="img not found" />
                </div>

                <div className='item-info'>
                    <p>{itemName}</p>
                    <p style={{ color: '#555555', fontSize: '14px' }}>{price * amount}TL</p>
                </div>

                <div className='item-process'>
                    <i id="item-process-button" className="fa-solid fa-circle-minus" onClick={handleRemoveItem}></i>
                    <p id="item-count">{amount}</p>
                    <i id="item-process-button" className="fa-solid fa-circle-plus" onClick={handleAddItem}></i>
                </div>
            </div>


            <div className="extended-ingredient-list" hidden={!ingredientListState}>
                {
                    ingredientList.map((ingredient, idx) => (
                        <p className="ingredient" key={idx}>
                            <i className="fa-solid fa-diamond" style={{ fontSize: 8, marginRight: 5 }}></i>
                            {ingredient}
                        </p>
                    ))
                }
            </div>

            <ConfirmPopUp confirmProperties={confirmProperties} setConfirmProperties={setConfirmProperties} confirmFunction={handleDeleteItem} />
        </>
    )
}

const stringToArray = (ingredientString: string, splitCharacter: string) => {
    return ingredientString.split(splitCharacter)
}

export default CartItem