import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message/Message";
import FormContainer from '../components/FormContainer/FormContainer';
import Loader from '../components/Loader/Loader';
import { getUserDetails } from '../actions/userActions';

const UserEditScreen = ({ match, history }) => {

    // get user id and put into variable
    const userId = match.params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    
    const dispatch = useDispatch();
    // get state for user register 
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    
    // redirect if already logged in
    useEffect(() => {
       
    }, []);


    const submitHandler = (e) => {
        e.preventDefault();
        
    }


    return (
        // <>
        //     <Link to="/admin/userlist" className="btn btn-light my-3">
        //         Go Back
        //     </Link>
        // </>
        <FormContainer>
            <h1>Sign Up</h1>
            {/* check for laoding and error */}
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="name" 
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Update
                </Button>
            </Form>

            
        </FormContainer>
    )
}

export default UserEditScreen;
