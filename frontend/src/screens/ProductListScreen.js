import React, { useEffect } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message/Message";
import Loader from '../components/Loader/Loader';
import { listProducts } from '../actions/productActions';

const ProductListScreen = ({ history, match }) => {
    // pass in action
    const dispatch = useDispatch();
    // pass in state
    const productList = useSelector( state => state.productList);
    // get loading, error, adn users from state
    const { loading, error, products } = productList;

    // check if user is logged in
    const userLogin = useSelector( state => state.userLogin);

    // get loading, error, adn users from state
    const { userInfo } = userLogin;

    // useEffect to dispatch action
    useEffect(() => {
        // only dispatch users if user is admin
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        } else {
            // else redirect user to login
            history.push("/login");
        }
        
    }, [dispatch, history, userInfo]);

    const deleteHandler = (id) => {
        // add a confirm for delete
        if (window.confirm("Are you sure?")) {
            // Delete Product
            // dispatch(deleteUser(id));
        }
    }

    const createProductHandler = (product) => {
        console.log("Create Product");
    }
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler} id="createProduct-btn">
                        <i className="fas fa-plus"/>  Create Product
                    </Button>
                </Col>
            </Row>
            {loading ? <Loader /> 
                : error 
                ? <Message variant="danger">{error}</Message> : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map( product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>$ {product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                   
                                    
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant="light" className="btn-sm" >
                                                <i className="fas fa-edit"/>
                                            </Button>
                                        </LinkContainer>
                                        <Button 
                                            variant="danger" 
                                            className="btn-sm" 
                                            onClick={() => {deleteHandler(product._id)}}>
                                            <i className="fas fa-trash"/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default ProductListScreen;
