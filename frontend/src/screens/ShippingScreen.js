import React from 'react'
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { clearCart } from '../actions/cartActions';
import Message from '../components/Message/Message';

const ShippingScreen = () => {

    const dispatch = useDispatch();
    const emptyCartHandler = () => {
        
        dispatch(clearCart());
    }
    return (
        <div>
            <h1>Check Out Under Construction...</h1>
            <Message variant="success">
                I am going to pretend that it's been paid for now!<br/>
                And nothing will be shipping to you XD
            </Message>
            <Button onClick={emptyCartHandler}>Prentend to Check Out and Empty My Cart</Button>
        </div>
    )
}

export default ShippingScreen;
