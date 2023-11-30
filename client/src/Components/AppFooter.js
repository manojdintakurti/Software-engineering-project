import "../CSS/AppFooterCSS.css"
import {Link} from "react-router-dom";

function AppFooter(){
    return (
        <footer className="footer footer-container">
            <div className="footer-1-col-grid">
                {/*<Link to="/contactus" className="contact-us">Contact Us</Link>*/}
                <div className="grid-col-continer">
                    <p  className="footer-1-col">Store Location:</p>
                    <i className="fa-solid fa-location-dot" ></i>
                    <p  className="pad-right">Falls Church, VA</p>
                </div>
            </div>
            <p className="footer-1-col">&copy; Caring Plates. All Rights Reserved.
            <Link to="/support">Get in touch</Link></p>
            <div className="social-media-icons footer-2col" >
                <i className="fa-brands fa-facebook fa-2xl"></i>
                <i className="fa-brands fa-linkedin fa-2xl"></i>
                <i className="fa-brands fa-twitter fa-2xl"></i>
                <i className="fa-brands fa-youtube fa-2xl"></i>
            </div>
        </footer>
    );
}
export default AppFooter;