import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import { logout } from '../../actions/userActions';
import "./Header.css";

const Header = () => {
    // bring in actions from redux with dispatch
    const dispatch = useDispatch();

    // bring in state from redux store with use selector
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >E-Commerce</Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link ><i className="fas fa-shopping-cart nav-icon" /> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? ( 
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link ><i className="fas fa-user nav-icon" /> Sign In</Nav.Link>
                                </LinkContainer>
                            )}
                            

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
