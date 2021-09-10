import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM } from "../constants/cartConstants";


export const cartReducer = (state ={ cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            // if item added already exist in the cart
            //  findout by comparing product id
            const existItem = state.cartItems.find(x => x.product === item.product);

            if (existItem) {
                // if item exist, use the payload, else stays the same
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x)
                }
            } else {
                //  item is new, push it to array
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }

            }
            

        case CART_REMOVE_ITEM:
            return { 
                ...state,
                cartItems: state.cartItems.filter( (x) => x.product !== action.payload)
             };
        
        case CART_CLEAR_ITEMS:
            return { 
                ...state,
                cartItems: [],
             };     

        default:
            return state;
    }
}