import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from '../Rating/Rating';

const Product = (props) => {
    const {product} = props;
    // console.log(product.name, product.rating);
    return (
        <Card className="my-3 p-2 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                </Link>

                <Card.Text as="div">
                    <Rating value={product.rating} 
                            text={`${product.numReviews} reviews`}/>
                    {/* <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                    </div> */}
                </Card.Text>

                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;
