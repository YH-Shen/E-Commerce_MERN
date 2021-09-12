import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message/Message";
import FormContainer from '../components/FormContainer/FormContainer';
import Loader from '../components/Loader/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ location, history }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);


    const dispatch = useDispatch();

    // get user details
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    // check if user is logged in 
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // get user update profile success from state
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;
    
    useEffect(() => {
        // redirect to log in if not logged in
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user || !user.name ) {
                // reset user profile stage
                // dispatch({ type: USER_UPDATE_PROFILE_RESET });
                // get state
                dispatch(getUserDetails("profile"));
            } else if (success) {
                // if update is successful, reset in 3s 
                setTimeout(() => dispatch({type: USER_UPDATE_PROFILE_RESET}), 2000);
            } else {
                // render the page
                setName(user.name);
                setEmail(user.email);
                
            }
            
        }
    }, [dispatch, history, user, userInfo]);


    const submitHandler = (e) => {
        e.preventDefault();
        // clear error messages
        setMessage(null);
        // check password // 
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
        } 
        else {
            // dispatch update profile
            dispatch(updateUserProfile({
                id: user._id,
                name,
                email, 
                password
            }));
            console.log("success", success);
        }
    }


    return (
        <FormContainer>
            <h1>User Profile</h1>
            {/* check for laoding and error */}
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
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
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
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
                    Update User Profile
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ProfileScreen;
