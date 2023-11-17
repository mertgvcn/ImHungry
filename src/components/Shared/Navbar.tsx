import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";
//helpers
import { GetUserCartItemList } from "../../setup/API/cart_api";
//css
import "./styles/Navbar.css";
//components
import Cart from "../Cart/Cart";
import UserMenu from "../UserMenu/UserMenu";
import useDidMountUpdate from "../../hooks/useDidMountUpdate";
import { Link } from "react-router-dom";


type NavbarType = {
    isLogin: boolean,
}


const Navbar = (props: NavbarType) => {

    //Set current cart item amount
    const { cartItemAmount, setCartItemAmount } = useContext(CartContext)

    //States
    const [cartItems, setCartItems] = useState({
        items: [],
        isSuccess: false
    })
    const [userMenuState, setUserMenuState] = useState<boolean>(false)
    const [cartState, setCartState] = useState<boolean>(false)


    //Fetch cart items only if user clicks cart button.
    const fetchCartItems = async (): Promise<void> => {
        if (cartState) {
            const data: any = await GetUserCartItemList()
            setCartItems({
                items: data,
                isSuccess: true
            })
        }

        return new Promise((resolve) => { resolve() })
    }

    useDidMountUpdate(() => {
        fetchCartItems()
    }, [cartState])


    // const didMount = useRef(false)
    // const [cartItemNo, setCartItemNo] = useState<any>(null)

    // const fetchItemAmount = async () => {
    //     const data = await GetUserCartItemNumber()
    //     setCartItemNo(data)      
    // }

    // useEffect(() => {
    //     if (didMount.current) {
    //         fetchItemAmount()
    //     }

    //     didMount.current = true;
    // }, [])

    return (
        <>
            <nav id="navbar-wrapper">
                <div id="navbar-components">

                    <div id="navbar-title">
                        <Link to="/" className='link'>
                            <p id="title"><i className="fa-solid fa-drumstick-bite" style={{ paddingRight: "8px" }}></i>Im Hungry</p>
                        </Link>
                    </div>

                    {props.isLogin &&
                        <div id="navbar-buttons">
                            <i id="user" className="fa-solid fa-user" onClick={() => { setUserMenuState(!userMenuState) }}></i>

                            <div className="cart" onClick={() => { setCartState(!cartState) }}>
                                <i id="cart-logo" className="fa-solid fa-basket-shopping"></i>
                                {cartItemAmount && <div className="cart-badge">{cartItemAmount}</div>}
                            </div>
                        </div>
                    }
                </div>
            </nav >


            {userMenuState && <UserMenu trigger={userMenuState} setTrigger={setUserMenuState} />}
            {cartItems.isSuccess && <Cart trigger={cartState} setTrigger={setCartState} cartItems={cartItems.items} />}

        </>
    )
}

export default Navbar