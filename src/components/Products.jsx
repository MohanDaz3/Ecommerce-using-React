import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Products = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts(28); // Fetch 28 products initially
    }, []);

   const getProducts = async (limit) => {
    setLoading(true);
    const response = await fetch(`https://api.escuelajs.co/api/v1/products?limit=${limit}`);
    const responseData = await response.json();
    setData(responseData);
    setFilteredData(responseData.slice(0, 32)); // Ensure that filteredData holds only up to 32 products
    setLoading(false);
};

    const Loading = () => {
        return (
            <div className="mt-4 ">
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

    const filterProduct = (cat) => {
        if (cat === "All Brands") {
            setFilteredData(data); // If "All Brands" is selected, display all products
        } else {
            const updatedItems = data.filter((item) => item.category.name === cat);
            setFilteredData(updatedItems); // Filter products based on the selected category
        }
    };

    return (
        <div>
            <div className="container mt-5 pb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className='display-6'>All Products</h1>
                        <hr />
                        <div className="buttons">
                            <Button onClick={() => filterProduct("All Brands")} className='me-2' variant="outline-dark">All Brands</Button>
                            <Button onClick={() => filterProduct("change")} className='me-2' variant="outline-dark">Clothes</Button>
                            <Button onClick={() => filterProduct("Furniture")} className='me-2' variant="outline-dark">Furniture</Button>
                            <Button onClick={() => filterProduct("Shoes")} className='me-2' variant="outline-dark">Shoes</Button>
                            <Button onClick={() => filterProduct("Electronics")} className='me-2' variant="outline-dark">Electronics</Button>
                        </div>
                        <div className="row">
                            {loading ? <Loading /> : (
                                filteredData.map((item) => {
                                    const imageUrl = item.images && item.images.length > 0 ? item.images[0] : '';
                                    return (
                                        <div className="col-3 mt-5" key={item.id}>
                                            <Card className="border border-dark">
                                                <Card.Img variant="top" style={{ height: '300px' }} src={imageUrl} />
                                                <Card.Body>
                                                    <Card.Title>{item.title.substring(0, 12)}</Card.Title>
                                                    <Card.Text className='fw-bold'>
                                                        $ {item.price}
                                                    </Card.Text>
                                                    <Link to={`/products/${item.id}`}> <Button variant="dark">Buy Now</Button></Link>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                       
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Products;
