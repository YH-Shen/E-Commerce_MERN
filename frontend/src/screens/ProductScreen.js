import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";
import Rating from "../components/Rating/Rating";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import {
    listProductDetails,
    createProductReview,
} from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    const dispatch = useDispatch();

    // get the state from the store with useSelector
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productCreateReview = useSelector(
        (state) => state.productCreateReview
    );
    const { error: errorProductReview, success: successProductReview } =
        productCreateReview;

    // get user Info
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (successProductReview) {
            alert("Review Submitted");
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        // dispatch the action
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successProductReview]);

    const addToCartHandler = () => {
        // dispatch addToCart action
        dispatch(addToCart(match.params.id, qty));
        // use props.history.push to redirect
        history.push("/cart");

        // //  also send the qty throgh query string
        // history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const submitReviewHandler = (e) => {
        e.preventDefault();
        // dispatch create review
        dispatch(createProductReview(match.params.id, { rating, comment }));
    };

    return (
        <>
            <Link className="btn btn-secondary my-3" to="/">
                {" "}
                Go Back{" "}
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price</Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out Of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty:</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        className="form-select"
                                                        value={qty}
                                                        onChange={(e) => {
                                                            setQty(
                                                                e.target.value
                                                            );
                                                        }}
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item className="d-grid gap-2">
                                        <Button
                                            onClick={addToCartHandler}
                                            variant="primary"
                                            type="button"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>

                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>Write a Customer Review</h4>
                                    {errorProductReview && (
                                        <Message variant="danger">
                                            {errorProductReview}
                                        </Message>
                                    )}
                                    {userInfo ? (
                                        <Form>
                                            <Form.Group controlId="rating">
                                                <Form.Control
                                                    as="select"
                                                    className="form-select mb-3"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select...
                                                    </option>
                                                    <option value="1">
                                                        1 - Poor
                                                    </option>
                                                    <option value="2">
                                                        2 - Fair
                                                    </option>
                                                    <option value="3">
                                                        3 - Good
                                                    </option>
                                                    <option value="4">
                                                        4 - Very Good
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group
                                                controlId="comment"
                                                className="mb-3"
                                            >
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    placeholder="Enter Review"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mb-3"
                                                ></Form.Control>
                                                <Button
                                                    type="submit"
                                                    onClick={
                                                        submitReviewHandler
                                                    }
                                                >
                                                    Submit Review
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please{" "}
                                            <Link to="/login">Sign in</Link> to
                                            write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                                {product.reviews.length === 0 && (
                                    <Message>No Reviews</Message>
                                )}
                                {product.reviews.map((r) => (
                                    <ListGroup.Item
                                        key={r._id}
                                        className="mb-3"
                                    >
                                        <strong>{r.name}</strong>
                                        <Rating value={r.rating} />
                                        <p>{r.createdAt.substring(0, 10)}</p>
                                        <p>{r.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
