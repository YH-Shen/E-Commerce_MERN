import axios from "axios";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";

// action creators
//  using thunk to add a func inside a func
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        // make request
        const { data } = await axios.get("/api/products");
        // if success, then:
        dispatch(({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        }))
    } catch (error) {
        // if error, then:
        dispatch(({
            type: PRODUCT_LIST_FAIL,
            // want the backend error msg if exist,  
            // else show the generic error msg
            payload: error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.response,
        }))
    }
}