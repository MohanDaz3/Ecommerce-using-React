import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/action';

const Product = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const send = (item) => {
        dispatch(ADD(item));
        alert("Item added successfully");
    };

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    const Loading = () => {
        return (
            <div className="mt-4">
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
            </div>
        );
    };

    const ShowProduct = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mt-5">
                        {product.images && product.images.length > 0 && (
                            <img src={product.images[0]} alt={product.title} height={400} width={500} />
                        )}
                    </div>
                    <div className="col-lg-6 mt-5">
                        <h4 className='text-uppercase'>{product.category.name}</h4>
                        <h1 className='display-5'>{product.title}</h1>
                        <p className='fw-bolder'>Rating {product.rating && product.rating.rate}</p>
                        <h3>$ {product.price}</h3>
                        <p>{product.description}</p>
                        <Button onClick={() => send(product)} variant="dark">Add to Cart</Button>
                        <Button className='ms-3' variant="dark">Go to Cart</Button>
                    </div>
                </div>
            </div>
        );
    };
    

    return (
        <div>
            <div className="container">
                {loading ? <Loading /> : (product ? <ShowProduct /> : <p>No product found</p>)}
            </div>
        </div>
    );
};

export default Product;
