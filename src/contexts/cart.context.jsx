import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        );
    }


    return [...cartItems,{...productToAdd,quantity: 1}]
    // [{...productToAdd, quantity: 1}]
}

const IncreasingItem = (cartItems, productToIncreaseId) => {
   return cartItems.map((cartItem) => cartItem.id === productToIncreaseId 
   ? {...cartItem, quantity: cartItem.quantity + 1}
   : cartItem
   )
}

const DecreasingItem = (cartItems, productToDecrease) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToDecrease.id
    );

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToDecrease.id)
    }
    else{
        return cartItems.map((cartItem) => cartItem.id === productToDecrease.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        )
    }
 }

 const RemovingItem = (cartItems, productToRemoveId) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemoveId
    );

    if(existingCartItem){
        return cartItems.filter(cartItem => cartItem.id !== productToRemoveId)
    }
 }



export const CartContext = createContext({
    cartState: false,
    setCartState: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    increaseItem: () => {},
    decreaseItem: () => {},
    removeItem: () => {},
    TotalPrice: 0,
});

export const CartProvider = ({children}) => {
    const [cartState, setCartState] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [TotalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0))
    },[cartItems])

    useEffect(() => {
        setTotalPrice(cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0))
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const increaseItem = (productToIncreaseId) => {
        setCartItems(IncreasingItem(cartItems,productToIncreaseId))
    }

    const decreaseItem = (productToDecrease) => {
        setCartItems(DecreasingItem(cartItems,productToDecrease))
    }

    const removeItem = (ProductToRemoveId) => {
        setCartItems(RemovingItem(cartItems,ProductToRemoveId))
    }

    const value = {cartState,setCartState,addItemToCart, cartItems, cartCount, increaseItem, decreaseItem,removeItem, TotalPrice}
    return  (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
