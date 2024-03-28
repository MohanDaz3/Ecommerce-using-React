import React from 'react'
import Card from 'react-bootstrap/Card';
import bg from './bg.jpg'
import Products from './Products';

const Home = () => {
    return (
        <div className='home-banner'>
            <Card className="bg-dark text-dark border-0">
                <Card.Img src={bg} alt="banner" />
                <Card.ImgOverlay>
                  <div className="container mt-5">
                  <Card.Title className='display-5 fw-bolder'>Hurry ! Latest trends</Card.Title>
                    <Card.Text className='lead fs-1'>
                       Mega sale is open
                    </Card.Text>
                    <Card.Text className='lead fs-2'>Shop Now <i className='fa fa-shopping-bag'></i></Card.Text>
                  </div>
                </Card.ImgOverlay>
            </Card>
            <Products/>
        </div>
    )
}

export default Home