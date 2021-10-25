import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
} from "../constants/productConstants";

// action creators
//  using thunk to make async requests inside action creators
//  using thunk add a function inside a function
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        // make request
        const { data } = await axios.get("/api/products");
        // if success, then:
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // if error, then:
        dispatch({
            type: PRODUCT_LIST_FAIL,
            // want the backend error msg if exist,
            // else show the generic error msg
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        // make request
        const { data } = await axios.get(`/api/products/${id}`);
        // if success, then:
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // if error, then:
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            // want the backend error msg if exist,
            // else show the generic error msg
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};

export const createProductReview =
    (productId, review) => async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

            // get user info and logged in status
            const {
                userLogin: { userInfo },
            } = getState();

            // send data in headers: "Content-Type": "application/json"
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // make request
            await axios.post(
                `/api/products/${productId}/reviews`,
                review,
                config
            );
            // if success, then:
            dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
        } catch (error) {
            // if error, then:
            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL,
                // want the backend error msg if exist,
                // else show the generic error msg
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.response,
            });
        }
    };
