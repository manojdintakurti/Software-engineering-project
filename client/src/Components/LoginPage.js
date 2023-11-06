import "../CSS/LoginPageCSS.css"
import {Link} from "react-router-dom";

function LoginPage(){
    return (
        <div className={"login-page"}>
            <div className={"login-page-logo"}>
            </div>
            <div className={"login-page-form"}>
                <div className="login-container">
                    <div className="login-header">
                        <h1>Log In</h1>
                        <p>To access your account</p>
                    </div>
                    <label htmlFor="email" className="form-lables">Email Address</label>
                    <input type="text" id="email" name="email" placeholder="Enter your email"/>

                        <label htmlFor="password" className="form-lables">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                            <p className="forgot-password"><a href="#">I forgot my password</a></p>
                    <span className="login-button-container"><button className="login-button btn btn-dark">Login</button></span>

                </div>
                <div className={"create-account-div"}>
                    <span>Don't have an account</span>
                    <Link to={"./registration"} className="create-account btn-dark">Create an account</Link>
                </div>


            </div>

        </div>
    );
}
export default LoginPage;