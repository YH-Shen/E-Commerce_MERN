import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";


//  reducer takes in initial state and an action
//  action has a type and may have a payload
export const productListReducer = (state ={ products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}