import "../CSS/LoginPageCSS.css"
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";

function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Make sure you import useNavigate from 'react-router-dom'

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const userDto = await response.json();
            sessionStorage.setItem("currentUser",JSON.stringify(userDto));
            // Assuming the backend returns a user DTO upon successful login

            // Redirect to home page or perform other actions on successful login
            navigate('/home');

        } catch (error) {
            setError('Invalid email or password');
        }
    };
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
                    <input type="text" id="email" name="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Enter your email"/>
                        <label htmlFor="password" className="form-lables">Password</label>
                        <input type="password" id="password" name="password"
                               placeholder="Enter your password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    <p className="forgot-password"><a href="#">I forgot my password</a></p>
                    <span className="login-button-container">
                        <button className="login-button btn btn-dark"
                                onClick={handleLogin}
                        >
                          Login
                        </button>
                        {/*<Link to={"/home"} className="login-button btn btn-dark">Login</Link>*/}
                    </span>
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className={"create-account-div"}>
                    <span>Don't have an account</span>
                    <Link to={"/registration"} className="create-account btn-dark">Create an account</Link>
                </div>


            </div>

        </div>
    );
}
export default LoginPage;