import React, {useEffect, useState} from 'react';
import '../CSS/CarouselCSS.css';
import axios from "axios";

function CarouselItem(item) {
    const handleClaim = async (item) => {
        try {
            const response = await fetch('http://localhost:8000/api/post/claim', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error during fetch:', error.message);
        }
    };
    return (
        <div className="carousel-item">
            <img src={`data:image/jpg;base64,${item.item.imageData}`} alt="Converted" className={"carousel-image"}/>
            <div className="carousel-content">
                <h2 className="title">{item.item.title}</h2>
                <p className="best-before">Best Before: {item.item.bestBefore.slice(0,10)}</p>
                <button className="claim-button" onClick={() => handleClaim(item)}>
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
                    item={item}
                />
            ))}
        </div>
    );
}

export default Carousel;
