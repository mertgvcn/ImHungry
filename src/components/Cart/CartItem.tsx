import { useContext, useState } from 'react'
//context
import { CartContext } from '../../context/CartContext'
import { ChangeContext } from '../../context/ChangeContext'
//models
import { CartItemViewModel } from '../../models/ViewModels/CartItemViewModel'
import { CartTransactionRequest } from '../../models/ParameterModels/CartParameterModels'
//css
import './styles/CartItem.css'
//helpers
import { AddItemToCart, DecreaseItemAmountByOne } from '../../setup/API/UserAPIs/cart_api'
//components
import ConfirmPopUp from '../Shared/ConfirmPopUp'


type CartItemType = {
    cartItem: CartItemViewModel
}


const CartItem = ({ cartItem } : CartItemType) => {
    const { cartToggle, setCartToggle } = useContext(ChangeContext)
    const { setCartItemAmount } = useContext(CartContext)

    //ingredient states
    const [ingredientListState, setIngredientListState] = useState<boolean>(false)
    const ingredientList = stringToArray(cartItem.IngredientList, ",")

    //confirm state
    const [confirmProperties, setConfirmProperties] = useState({
        isOpen: false,
        msg: "",
    })

    const cartTransactionRequest: CartTransactionRequest = {
        CartItemID: cartItem.Id,
        ItemID: cartItem.Item.Id,
        RestaurantID: cartItem.Restaurant.Id,
        Ingredients: cartItem.IngredientList,
        Amount: 0
    }

    const handleRemoveItem = async () => {
        //To avoid missclick deletion, ask user is it intended or not
        if (cartItem.Amount == 1) {
            setConfirmProperties({
                isOpen: true,
                msg: `Do you want to delete ${cartItem.Item.Name} from the cart?`
            })
        }
        else {
            await handleDeleteItem()
        }
    }

    const handleDeleteItem = async () => {
        await DecreaseItemAmountByOne(cartItem.Id)

        setCartItemAmount((currentAmount: any) => {
            return Number(currentAmount) - 1
        })
        setCartToggle(!cartToggle)
    }

    const handleAddItem = async () => {
        cartTransactionRequest.Amount = 1
        await AddItemToCart(cartTransactionRequest)

        setCartItemAmount((currentAmount: any) => {
            return Number(currentAmount) + 1
        })
        setCartToggle(!cartToggle)
    }

    return (
        <>
            <div className='cart-item-wrapper'>

                {cartItem.IngredientList &&
                    <i id="show-ingredients-button" className={ingredientListState ? "fa-solid fa-circle-chevron-down" : "fa-solid fa-circle-chevron-right"}
                        onClick={() => {
                            setIngredientListState(!ingredientListState)
                        }}></i>}

                <div className='item-image'>
                    <img src={require(`../../assets/FoodImages/${cartItem.Item.ImageSource}`)} alt="img not found" />
                </div>

                <div className='item-info'>
                    <p>{cartItem.Item.Name}</p>
                    <p style={{ color: '#555555', fontSize: '14px' }}>{cartItem.Item.Price * cartItem.Amount}TL</p>
                </div>

                <div className='item-process'>
                    <i id="item-process-button" className="fa-solid fa-circle-minus" onClick={handleRemoveItem}></i>
                    <p id="item-count">{cartItem.Amount}</p>
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

const stringToArray = (ingredientString: string | null, splitCharacter: string) => {
    return ingredientString ? ingredientString.split(splitCharacter) : []
}

export default CartItem