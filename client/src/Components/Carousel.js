import React, {useEffect, useState} from 'react';
import '../CSS/CarouselCSS.css';
import axios from "axios"; // Import your CSS file for styling

function CarouselItem({ imageUrl, title, bestBeforeDate }) {
    return (
        <div className="carousel-item">
            <img src={require("../images/"+imageUrl)} alt="Product" className="carousel-image" />
            <div className="carousel-content">
                <h2 className="title">{title}</h2>
                <p className="best-before">Best Before: {bestBeforeDate}</p>
                <button className="claim-button">
                    <i className={"fas fa-shopping-cart"}></i>   Claim Now</button>
            </div>
        </div>
    );
}

function Carousel() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/post/fetch-posts")
            .then((result) => setItems(result.data))
            .catch(console.error);
    },[]);
    // Replace these sample data with your actual data
    const carouselItems = [
        {
            imageUrl: '1.jpg',
            title: 'Product 1',
            bestBeforeDate: '2023-12-31',
        },
        {
            imageUrl: '2.jpg',
            title: 'Product 2',
            bestBeforeDate: '2023-11-30',
        },
        {
            imageUrl: '3.jpg',
            title: 'Product 2',
            bestBeforeDate: '2023-11-30',
        },
        {
            imageUrl: '4.jpg',
            title: 'Product 1',
            bestBeforeDate: '2023-12-31',
        },
        {
            imageUrl: '5.jpg',
            title: 'Product 2',
            bestBeforeDate: '2023-11-30',
        },
        {
            imageUrl: '6.jpg',
            title: 'Product 2',
            bestBeforeDate: '2023-11-30',
        },
        {
            imageUrl: '15.jpg',
            title: 'Product 1',
            bestBeforeDate: '2023-12-31',
        },
        {
            imageUrl: '8.jpg',
            title: 'Product 2',
            bestBeforeDate: '2023-11-30',
        },
        {
            imageUrl: '9.jpg',
            title: 'Product 2',
            bestBeforeDate: '2023-11-30',
        },
        {
            imageUrl: '10.jpg',
            title: 'Product 1',
            bestBeforeDate: '2023-12-31',
        },
        {
            imageUrl: '11.jpg',
            title: 'Product 2',
            bestBeforeDate: '2023-11-30',
        },
        {
            imageUrl: '12.jpg',
            title: 'Product 2',
            bestBeforeDate: '2023-11-30',
        }
        // Add more items as needed
    ];

    return (
        <div className="carousel">
            {items.map((item, index) => (
                <CarouselItem
                    key={index}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    bestBeforeDate={item.bestBeforeDate}
                />
            ))}
        </div>
    );
}

export default Carousel;
