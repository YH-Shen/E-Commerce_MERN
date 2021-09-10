import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        // send data in headers: "Content-Type": "application/json"
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(
            "/api/users/login", 
            {email, password}, 
            config
        )
        // dispatch user_login_success after making request
        dispatch({
            type:  USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        // if error, then:
        dispatch(({
            type: USER_LOGIN_FAIL,
            // want the backend error msg if exist,  
            // else show the generic error msg
            payload: error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.response,
        }))
    
    }
}

export const logout = () => (dispatch) => {

    // remove from local storage
    localStorage.removeItem("userInfo");
    // reducer returns empty obj
    dispatch({ type: USER_LOGOUT });
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        // send data in headers: "Content-Type": "application/json"
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(
            "/api/users", 
            {name, email, password}, 
            config
        )
        // dispatch user_register_success after making request
        dispatch({
            type:  USER_REGISTER_SUCCESS,
            payload: data
        });

        // log users in rightaway after register
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        // if error, then:
        dispatch(({
            type: USER_REGISTER_FAIL,
            // want the backend error msg if exist,  
            // else show the generic error msg
            payload: error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.response,
        }))
    
    }
}