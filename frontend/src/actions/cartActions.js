import axios from "axios";
import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM, CART_UPDATE_ITEM } from "../constants/cartConstants";


export const addToCart = (id, qty, action="add") => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    
    if (action === "add") {
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            }
        })
    } else if (action === "reset"){
        dispatch({
            type: CART_UPDATE_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            }
        })
    }
    

    // save the entrie cart in localStorage after dispatch
    // we can only save strings in localStroage, need to parse back to js when we take out
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

export const clearCart = () => (dispatch, getState) => {
    dispatch({
        type: CART_CLEAR_ITEMS,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}