import "../CSS/home.css"
import {Link} from "react-router-dom";
import Carousel from "./Carousel";
import {useNavigate} from "react-router";
import Modal from "react-modal";
import {useEffect, useState} from "react";
import NotificationDropdown from "./NotificationDropdown";

function Home(props){
    const storedUser = sessionStorage.getItem("currentUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.userId;
    const history = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [rewardPoints, setRewardPoints] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/post/rewards/${userId}`);
            const data = await response.json();
            console.log(data);
            setRewardPoints(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    async function fetchRestaurantProfile() {
        try {
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
    return (
        <div className={"home-container"}>
                <div className={"home-header"}>
                    <div className="header-left">
                        {/* Logo */}
                        <img src={require("../images/icon.png")} alt="Your Logo" className="logo" width={100} height={100}/>
                        <h1 className={"logo-text"}>Caring Plates</h1>
                        {/* Home link */}
                        <Link to="/home" className="nav-link">
                            Home
                        </Link>

                    </div>
                    <div className="header-center">
                        {/* Create a Post button */}
                        {user.role==="restaurant" &&  <button onClick={fetchRestaurantProfile} className="create-post-btn">Create a Post</button>}
                        {user.role!=="restaurant" &&  <button  className="create-post-btn">Reward Points: {rewardPoints}</button>}
                        <Modal
                            className={"modal-body"}
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Please Create your Restaurant Profile"
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
                            <p>To create a post you need to setup your restaurant Profile first</p>
                            <button onClick={closeModal}>Create Profile
                            </button>
                        </Modal>
                    </div>
                    <div className="header-right">
                        {/* Notifications icon */}
                        <NotificationDropdown/>
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
                                {user.role==="restaurant" &&
                                    <Link to="/restaurant-profile" className="dropdown-item">
                                        Restaurant Profile
                                    </Link>
                                }
                                <Link to="/registration" className="dropdown-item">
                                    User Profile
                                </Link>
                                <button onClick={handleLogout} className="dropdown-item">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <div className={"home-body"}>
                <Carousel className={"carousel-bg"} />
            </div>
        </div>
    );
}
export default Home
