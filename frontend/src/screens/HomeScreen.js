import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product/Product";
import Message from "../components/Message/Message";
import Loader from "../components/Loader/Loader";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <>
            {!keyword && <ProductCarousel />}
            <h1>Latest Products</h1>
            {/* if loading 
                else if there's an error
                else show the products (not loading, no error)*/}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default HomeScreen;
