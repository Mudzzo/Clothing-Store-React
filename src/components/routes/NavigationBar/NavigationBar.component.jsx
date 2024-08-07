import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
import { signOutUser } from "../../../utils/firebase/firebase.utils";

import './NavigationBar.styles.scss'

const NavigationBar = () => {
    const { currentUser } = useContext(UserContext);
    const {cartState, setCartState} = useContext(CartContext);

    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'> 
                        SHOP
                    </Link>
                    {
                    currentUser 
                    ? <span className="nav-link" onClick={signOutUser}>SIGN OUT</span> 
                    : <Link className="nav-link" to="/auth">SIGN IN</Link>
                    }
                    <CartIcon/>
                </div>
                { cartState && <CartDropdown/>}
                
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default NavigationBar;