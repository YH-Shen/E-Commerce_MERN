import axios from "axios"
import { CART_CLEAR_ITEMS } from "../constants/cartConstants"
import { 
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
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
    USER_REGISTER_SUCCESS 
} from "../constants/userConstants"

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

    // remove cart
    dispatch({type: CART_CLEAR_ITEMS});

    // reset user list
    dispatch({type: USER_LIST_RESET});

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

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        // get userInfo
        const { 
            userLogin: { userInfo },
        } = getState();

        // send data in headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, 
            }
        }

        const { data } = await axios.get(
            "/api/users", 
            config,
        )
        // dispatch user_list_success after making request
        //  and pass in all the data through payload which should be user list
        dispatch({
            type:  USER_LIST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        // if error, then:
        dispatch(({
            type: USER_LIST_FAIL,
            // want the backend error msg if exist,  
            // else show the generic error msg
            payload: error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.response,
        }))
    
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        // get userInfo
        const { 
            userLogin: { userInfo },
        } = getState();

        // pass authorization token in headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, 
            }
        }

        // hit the route on the backend
        await axios.delete( `/api/users/${id}`, config);
        // dispatch user_delete_success after making request
        dispatch({ type:  USER_DELETE_SUCCESS });

    } catch (error) {
        // if error, then:
        dispatch(({
            type: USER_DELETE_FAIL,
            // want the backend error msg if exist,  
            // else show the generic error msg
            payload: error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.response,
        }))
    
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })
  
        const {
            userLogin: { userInfo },
        } = getState();
  
        const config = {
            headers: {
            Authorization: `Bearer ${userInfo.token}`,
            },
        }
  
        const { data } = await axios.get(`/api/users/${id}`, config);
  
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
  }