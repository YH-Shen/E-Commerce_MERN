import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

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

    // save the netrie cart in localStorage after dispatch
    // we can only save strings in localStroage, need to parse back to js when we take out
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}