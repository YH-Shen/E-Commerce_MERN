import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import {
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        // send data in headers: "Content-Type": "application/json"
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );
        // dispatch user_login_success after making request
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        // if error, then:
        dispatch({
            type: USER_LOGIN_FAIL,
            // want the backend error msg if exist,
            // else show the generic error msg
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};

export const logout = () => (dispatch) => {
    // remove from local storage
    localStorage.removeItem("userInfo");

    // reducer returns empty obj
    dispatch({ type: USER_LOGOUT });

    // remove cart
    dispatch({ type: CART_CLEAR_ITEMS });

    // reset user list
    dispatch({ type: USER_LIST_RESET });

    // reset create review
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
};

export const register = (name, email, password, isAdmin = false) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        // send data in headers: "Content-Type": "application/json"
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users",
            { name, email, password, isAdmin },
            config
        );
        // dispatch user_register_success after making request
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });

        // log users in rightaway after register
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        // if error, then:
        dispatch({
            type: USER_REGISTER_FAIL,
            // want the backend error msg if exist,
            // else show the generic error msg
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        });

        // get userInfo
        const {
            userLogin: { userInfo },
        } = getState();

        // send data in headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get("/api/users", config);
        // dispatch user_list_success after making request
        //  and pass in all the data through payload which should be user list
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // if error, then:
        dispatch({
            type: USER_LIST_FAIL,
            // want the backend error msg if exist,
            // else show the generic error msg
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });

        // get userInfo
        const {
            userLogin: { userInfo },
        } = getState();

        // pass authorization token in headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // hit the route on the backend
        await axios.delete(`/api/users/${id}`, config);
        // dispatch user_delete_success after making request
        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        // if error, then:
        dispatch({
            type: USER_DELETE_FAIL,
            // want the backend error msg if exist,
            // else show the generic error msg
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        // log in with new user info
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        // reset local storage
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        // get userInfo
        const {
            userLogin: { userInfo },
        } = getState();

        // pass authorization token, and contentType in headers
        const config = {
            headers: {
                ContentType: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // hit the route on the backend
        const { data } = await axios.put(
            `/api/users/${user._id}`,
            user,
            config
        );
        // dispatch user_delete_success after making request
        dispatch({ type: USER_UPDATE_SUCCESS });

        // also pass in updated data into user detail
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

        dispatch({ type: USER_DETAILS_RESET });
    } catch (error) {
        // if error, then:
        dispatch({
            type: USER_UPDATE_FAIL,
            // want the backend error msg if exist,
            // else show the generic error msg
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};
