import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message/Message";
import FormContainer from '../components/FormContainer/FormContainer';
import Loader from '../components/Loader/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

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


    // check if user update is successful
    const userUpdate = useSelector((state) => state.userUpdate);
    const { 
        loading: loadingUpdate, 
        error: errorUpdate,
        success: successUpdate  
    } = userUpdate;
    
    useEffect(() => {
        // if user update is successful, reset user update state
        //  and redirect to user list
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push("/admin/userlist");
        } else {
            // not updated yet, do all the update stuff

            // check if already an user
            // if no user exists or user id does not match
            if (!user || user._id !== userId) {
                // fetch the user
                dispatch(getUserDetails(userId));
            } else {
                // else display user info
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }

        
    }, [dispatch, history, user, userId, successUpdate]);


    const submitHandler = (e) => {
        e.preventDefault();
        // updateUser takes in the user obj
        // pass in userID and everything in the form
        console.log("userId", userId);
        console.log("name", name);
        console.log("email", email);
        console.log("isAdmin", isAdmin);
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
        
    }


    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {/* check for laoding and error */}
                {loading 
                    ? <Loader /> 
                    : error 
                    ? <Message variant="danger">{error}</Message>
                    :(
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
                    <Form.Group controlId="isAdmin" className="mb-3">
                        <Form.Label>Is Admin</Form.Label>
                        <Form.Check 
                            type="checkbox" 
                            label="Is Admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
                    )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen;
