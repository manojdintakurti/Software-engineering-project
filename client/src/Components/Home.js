import "../CSS/home.css"
import {Link} from "react-router-dom";
import Carousel from "./Carousel";
import {useNavigate} from "react-router";

function Home(props){
    const history = useNavigate();
    const handleLogout = () => {
        // Perform logout actions, e.g., clear user details from session
        sessionStorage.removeItem("currentUser");

        // Redirect to the login page or wherever needed
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
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </div>


                    <div className="header-center">
                        {/* Create a Post button */}
                        {user.role==="Restaurant" &&  <Link to="/create-post" className="create-post-btn">Create a Post</Link>}
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
