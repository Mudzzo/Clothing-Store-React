import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './check-out-item.styles.scss'

const CheckOutItem = ({cartItem}) => {
    const {name, quantity, imageUrl, price, id} = cartItem;
    const {increaseItem, decreaseItem, removeItem} = useContext(CartContext);

    const IncreaseItem = () => {increaseItem(id)}
    const DecreaseItem = () => {decreaseItem(cartItem)}
    const RemoveItem = () => {removeItem(id)}

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} className='image'/>
            </div>

            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={DecreaseItem} className='arrow'>&#10094;</div>
                    <span className='value'>{quantity}</span>
                <div onClick={IncreaseItem} className='arrow'>&#10095;</div>
            </span>
            <span className='price'>${price}</span>
            <div className='remove-button' onClick={RemoveItem} >&#10005;</div>

        </div>
    )
}

export default CheckOutItem;