import "../CSS/home.css"
import {Link} from "react-router-dom";
import Carousel from "./Carousel";
import {useNavigate} from "react-router";
import Modal from "react-modal";
import {useState} from "react";

function Home(props){
    const history = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    async function fetchRestaurantProfile() {
        try {
            const storedUser = sessionStorage.getItem("currentUser");
            const user = storedUser ? JSON.parse(storedUser) : null;
            const userId = user?.userId;
            const response = await fetch(`http://localhost:8000/api/restaurant/fetch-profile/${userId}`);
            if (!response.ok) {
                setModalOpen(true);
            }else{
                const profile = await response.json();
                if (profile === null) {
                    setModalOpen(true);
                } else {
                    history('/create-post');
                }
            }
        } catch (error) {
            // Handle network errors or other exceptions
            setModalOpen(true);
        }
    }
    const closeModal = () => {
        setModalOpen(false);
        history('/restaurant-profile');
    };
    const handleLogout = () => {
        sessionStorage.removeItem("currentUser");
        history("/");
    };
    const storedUser = sessionStorage.getItem("currentUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    return (
        <div className={"home-container"}>
                <div className={"home-header"}>
                    <div className="header-left">
                        {/* Logo */}
                        <img src={require("../images/icon.png")} alt="Your Logo" className="logo" width={100} height={100}/>
                        {/* Home link */}
                        <Link to="/home" className="nav-link">
                            Home
                        </Link>
                    </div>
                    <div className="header-center">
                        {/* Create a Post button */}
                        {user.role==="restaurant" &&  <button onClick={fetchRestaurantProfile} className="create-post-btn">Create a Post</button>}
                        <Modal
                            className={"modal-body"}
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Please Create your Restaurant Profile"
                            style={{
                                    content: {
                                        top: '50%',
                                        left: '50%',
                                        right: 'auto',
                                        bottom: 'auto',
                                        marginRight: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    },}}
                        >
                            <p>To create a post you need to setup your restaurant Profile first</p>
                            <button onClick={closeModal}>Create Profile
                            </button>
                        </Modal>
                    </div>
                    <div className="header-right">
                        {/* Notifications icon */}
                        <div className="notification-icon">🔔</div>

                        {/* Support link */}
                        <Link to="/support" className="nav-link">
                            <img src={require("../images/img.png")}  width={25} height={25}/>
                            Support
                        </Link>
                        {/* Account link */}
                        <div className="nav-item dropdown">
                            <Link to="/account" className="nav-link dropdown-toggle">
                                <i className="fa-regular fa-xl fa-user"></i>
                                Hi, {user?.firstName}
                            </Link>
                            <div className="dropdown-menu">
                                <Link to="/user-profile" className="dropdown-item">
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className="dropdown-item">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <div className={"home-body"}>
                <Carousel />
            </div>
        </div>
    );
}
export default Home
