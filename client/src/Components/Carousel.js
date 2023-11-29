import React, {useEffect, useState} from 'react';
import '../CSS/CarouselCSS.css';
import axios from "axios";
import Modal from "react-modal";

function CarouselItem(item) {
    const [isModalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
        window.location.reload();
    };
    const handleClaim = async (item) => {
        try {
            const storedUser = sessionStorage.getItem("currentUser");
            const user = storedUser ? JSON.parse(storedUser) : null;
            const userId = user?.userId;
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('restaurantId', user?.restaurantDTO?.restId);
            formData.append('imageData', new Blob([new Uint8Array(item.item?.imageData)], { type: 'image/jpeg' }));
            formData.append('bestBefore', item.item?.bestBefore);
            formData.append('itemName',item.item?.title );
            formData.append('description',item.item?.description);
            formData.append('claimed', item.item?.claimed);
            formData.append('quantity',item.item?.quantity);
            formData.append('postId',item.item?.postID);
            const response = await fetch(`http://localhost:8000/api/post/claim-post/${userId}`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if(data){
                setModalOpen(true)
            }
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
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Claimed Successfully"
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.75)'
                    },
                    content: {
                        display: "flex",
                        justifyContent:"center",
                        flexDirection:"column",
                        width:'400px',
                        position: 'absolute',
                        top: '200px',
                        left: '600px',
                        right: '40px',
                        bottom: '40px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px'
                    }
                }}
            >
                <h2>Claimed Successfully!</h2>
                <p>Please check your email for more details</p>
                <button onClick={closeModal}>OK</button>
            </Modal>
        </div>
    );
}

function Carousel() {
    const [items, setItems] = useState([]);
    const [reloadCounter, setReloadCounter] = useState(0);
    const reloadComponent = () => {
        setReloadCounter(reloadCounter + 1);
    };

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
                    reloadComponent = {reloadComponent}

                />
            ))}
        </div>
    );
}

export default Carousel;
