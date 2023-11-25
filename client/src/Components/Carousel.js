import React, {useEffect, useState} from 'react';
import '../CSS/CarouselCSS.css';
import axios from "axios"; // Import your CSS file for styling

function CarouselItem({ imageData, title, bestBefore }) {
    return (
        <div className="carousel-item">
            <img src={`data:image/jpg;base64,${imageData}`} alt="Converted" className={"carousel-image"}/>
            <div className="carousel-content">
                <h2 className="title">{title}</h2>
                <p className="best-before">Best Before: {bestBefore.slice(0,10)}</p>
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
    return (
        <div className="carousel">
            {items.map((item, index) => (
                <CarouselItem
                    key={index}
                    imageData={item.imageData}
                    title={item.title}
                    bestBefore={item.bestBefore}
                />
            ))}
        </div>
    );
}

export default Carousel;
