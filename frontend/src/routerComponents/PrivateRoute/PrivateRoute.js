import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    // get logged in state from redux store
    const { userInfo } = useSelector( state => state.userLogin );
    // if not logged in, redirect to login
    return (
        <Route 
            {...rest}
            render={(props) => userInfo ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
            } 
        />
            
            
        
    )
}

export default PrivateRoute;
