import { useContext } from 'react';
import { CartContext } from '../../../contexts/cart.context';
import CartItem from '../../cart-item/cart-item.component';
import CheckOutItem from '../../check-out-item/check-out-item.component';

import './check-out.styles.scss'

const CheckOut = () => {
    const {cartItems,TotalPrice} = useContext(CartContext);


    return(
        <div className='checkout-container'>
            <div className="checkout-header">
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>

            </div>
            {cartItems.map(item => <CheckOutItem key={item.id} cartItem={item}/>)}
            <span className='total'>{`Total Price: $${TotalPrice }`}</span>
        </div>
    )
}

export default CheckOut;