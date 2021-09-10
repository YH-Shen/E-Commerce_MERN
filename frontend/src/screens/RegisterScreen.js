import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message/Message";
import FormContainer from '../components/FormContainer/FormContainer';
import Loader from '../components/Loader/Loader';
import { register } from '../actions/userActions';


const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    // confirm password
    const [confirmPassword, setConfirmPassword] = useState("");


    const dispatch = useDispatch();
    // get state for user register 
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    // url query string in location.search
    const redirect = location.search ? location.search.split("=")[1] : "/";
    
    // redirect if already logged in
    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);


    const submitHandler = (e) => {
        e.preventDefault();
        // clear error messages
        setMessage(null);
        error = null;
        // check password // 
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            
            // dispatch register
            dispatch(register(name, email, password));
        }

        // dipstach Register;  
        // dispatch(register(name, email, password));
    }


    return (
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
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account? <Link to={redirect 
                                            ? `/login?redirect=${redirect}` 
                                            : "/login"}>
                                    Login</Link> 
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
