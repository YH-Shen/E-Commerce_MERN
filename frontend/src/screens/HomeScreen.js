import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Col, Row } from 'react-bootstrap';
// import products from "../products";
import Product from '../components/Product/Product';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector( state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {

        dispatch(listProducts());

    }, [dispatch])

    return (
        <>
         <h1>Latest Products</h1>
         {/* if loading 
                else if there's an error
                else show the products (not loading, no error)*/}
         {loading ? (
            <h2>Loading...</h2> 
            
         )  : error ? (
             <h3>{error}</h3> 
         )  : (
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>)
        }
            
        </>
    )
}

export default HomeScreen
