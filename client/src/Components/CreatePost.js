import "../CSS/RegisrationPageCSS.css"
import React, { useState } from 'react';
import "../CSS/CreatePostCSS.css"
import {Link} from "react-router-dom";

function CreatePost(){
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [pickUpBy, setPickUpBy] = useState('');
    const [description, setDescription] = useState('');
    const [foodImage, setFoodImage] = useState(null);
    const [postSuccess, setPostSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('quantity', quantity);
        formData.append('preparationTime', preparationTime);
        formData.append('pickUpBy', pickUpBy);
        formData.append('description', description);
        formData.append('foodImage', foodImage);

        try {
            const response = await fetch('http://localhost:8000/posts/create-post', {
                method: 'POST',
                body: formData,
                // Add headers if needed, e.g., content-type
            });

            if (response.ok) {
                // Handle success, e.g., show a success message
                setPostSuccess(true);

            } else {
                // Handle errors, e.g., show an error message
                console.error('Failed to create post:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }

        // Clear the form fields
        setItemName('');
        setQuantity('');
        setPreparationTime('');
        setPickUpBy('');
        setDescription('');
        setFoodImage(null);
    };
    return (
        <div className={"registration-page"}>
            <div className={"login-page-logo"}>
            </div>
            <div className={"create-post"}>
                <Link to={"/home"}>Back</Link>
                <div>
                    <h2 className="form-heading">Food Donation Information</h2>
                </div>
                {postSuccess && <div className="alert alert-success" role="alert">
                    Post Published Successfully. <Link to={"/home"}>Back to Home</Link>
                </div>
                }
                <form onSubmit={handleSubmit} className="food-donation-form">
                    <label htmlFor="itemName">
                        Item Name<span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="itemName"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />

                    <label htmlFor="quantity">
                        Quantity<span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />

                    <label htmlFor="preparationTime">
                        Time of Preparation<span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="preparationTime"
                        value={preparationTime}
                        onChange={(e) => setPreparationTime(e.target.value)}
                        required
                    />

                    <label htmlFor="pickUpBy">
                        Pick Up By<span>*</span>:
                    </label>
                    <input
                        type="text"
                        id="pickUpBy"
                        value={pickUpBy}
                        onChange={(e) => setPickUpBy(e.target.value)}
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <input type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="foodImage">Food Image Uploader:</label>
                    <input type="file" multiple accept="image/png, image/jpeg"
                           required={true}
                           onChange={(e) => {
                               setFoodImage(e.target.files[0]);

                           }}/>
                    <div className="publish-button">
                        <button type="submit" className="btn btn-dark publish-button-text">Publish Post</button>

                    </div>
                </form>
            </div>
        </div>
    );
}
export default CreatePost;
