import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext, CartContextProvider } from "../../context/CartContext";
//css
import "./styles/Navbar.css";
//components
import Cart from "../Cart/Cart";
import UserMenu from "../UserMenu/UserMenu";


type NavbarType = {
    isLogin: boolean,
}



const Navbar = (props: NavbarType) => {
    //Context
    const { cartItemAmount } = useContext(CartContext)

    //States
    const [userMenuState, setUserMenuState] = useState<boolean>(false)
    const [cartState, setCartState] = useState<boolean>(false)

    const goHome = () => {
        window.location.href = "/"
    }

    return (
        <>
            <nav id="navbar-wrapper">
                <div id="navbar-components">
                    <div id="navbar-title" onClick={goHome}>
                        <p id="title"><i className="fa-solid fa-drumstick-bite" style={{ paddingRight: "8px" }}></i>Im Hungry</p>
                    </div>

                    {props.isLogin &&
                        <div id="navbar-buttons">
                            <i id="user" className="fa-solid fa-user" onClick={() => { setUserMenuState(!userMenuState) }}></i>

                            <div className="cart" onClick={() => { setCartState(!cartState) }}>
                                <i id="cart-logo" className="fa-solid fa-basket-shopping"></i>
                                {cartItemAmount && <div className="cart-badge">{cartItemAmount ? cartItemAmount : 0}</div>}
                            </div>
                        </div>
                    }
                </div>
            </nav>

            {/* {props.isFetched &&
                <>
                    <UserMenu trigger={userMenuState} setTrigger={setUserMenuState} />
                    <Cart trigger={cartState} setTrigger={setCartState} cart={props.data.cart}/>
                </>
            } */}

        </>
    )
}

export default Navbar