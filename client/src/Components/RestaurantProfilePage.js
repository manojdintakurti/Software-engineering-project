import "../CSS/LoginPageCSS.css"
import "../CSS/RegisrationPageCSS.css"
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";
import 'react-datepicker/dist/react-datepicker.css'
import Modal from 'react-modal';
import { Autocomplete } from '@lob/react-address-autocomplete'


function RestaurantProfilePage(){
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipCode] = useState('');
    const [landmark, setLandMark] = useState('');
    const [phone, setPhone] = useState('');
    const [zeolocation, setZeolocation] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const storedUser = sessionStorage.getItem("currentUser");
    const userJ = storedUser ? JSON.parse(storedUser) : null;
    const user = userJ?.userId;
    const restaurantId = userJ?.restaurantDTO?.restId;
    const handleRestaurantProfileUpdate = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/restaurant/create-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user,
                    restaurantId,
                    name,
                    address,
                    landmark,
                    phone,
                    zipcode,
                    zeolocation
                }),
            });
            console.log(JSON.stringify({
                name,
                address,
                landmark,
                phone,
                zipcode,
                zeolocation
            }))

            if (!response.ok) {
                throw new Error('Registration failed. Please try again.');
            }

            const result = await response.json();

            if (result !== null) {
                // Redirect to login page on successful registration

                setModalOpen(true);
            } else {
                // Handle registration failure, e.g., display an error message
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };
    const closeModal = () => {
        setModalOpen(false);
        // Redirect to the login page
        history('/create-post');
    };
    return (
        <div className={"registration-page"}>
            <div className={"login-page-logo"}>
            </div>
            <div className={"registration-form"}>
                <div className="login-header">
                    <h1>Restaurant Profile Page</h1>
                    <p>*All fields required unless noted</p>
                </div>
                <label htmlFor="name" className="form-lables">Restaurant Name</label>
                <input type="text" id="name" name="Restaurant Name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="Enter your Restaurant Name"/>
                <label htmlFor="Address" className="form-labels">
                    Address
                </label>
                <input
                    type="text"
                    id="Address"
                    name="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your Address"
                />

                <label htmlFor="Landmark" className="form-labels">
                    Landmark
                </label>
                <input
                    type="text"
                    id="Landmark"
                    name="Landmark"
                    value={landmark}
                    onChange={(e) => setLandMark(e.target.value)}
                    placeholder="Enter a Landmark"
                />

                <label htmlFor="PhoneNumber" className="form-labels">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="PhoneNumber"
                    name="PhoneNumber"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your Phone Number"
                />

                <label htmlFor="ZipCode" className="form-labels">
                    Zip Code
                </label>
                <input
                    type="text"
                    id="ZipCode"
                    name="ZipCode"
                    value={zipcode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter your Zip Code"
                />

                <label htmlFor="GeoLocation" className="form-labels">
                    Geo Location
                </label>
                <input
                    type="text"
                    id="GeoLocation"
                    name="GeoLocation"
                    value={zeolocation}
                    onChange={(e) => setZeolocation(e.target.value)}
                    placeholder="Enter your Geo Location"
                />


                <span className="login-button-container">
                    <button className="login-button btn btn-dark" onClick={handleRestaurantProfileUpdate}>
                        Register
                    </button>
                    <Link to={"/home"} className="fa-primary">Back To Home</Link>
                </span>
                {error && <p className="error-message">{error}</p>}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Registration Success"
                >
                    <h2>Registration Successful!</h2>
                    <p>Restaurant Profile has been saved successfully</p>
                    <button onClick={closeModal}>OK</button>
                </Modal>
                <Autocomplete
                    onPlaceSelected={(place) => {
                        console.log(place);
                    }}
                />;
            </div>
        </div>
    )
}
export default RestaurantProfilePage;