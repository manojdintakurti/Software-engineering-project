import "../CSS/LoginPageCSS.css"
import "../CSS/RegisrationPageCSS.css"
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Modal from 'react-modal';

function RegistrationPage(){
    const storedUser = sessionStorage.getItem("currentUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [email, setEmail] = useState(user?.email);
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(user?.gender);
    const [phoneNumber, setPhoneNumber] = useState(user?user.phone:"");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [role, setRole] = useState(user?.role);
    const [error, setError] = useState('');
    const history = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleRegistration = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    password,
                    gender,
                    phoneNumber,
                    dateOfBirth,
                    role,
                }),
            });

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
        history('/');
    };
    return (
        <div className={"registration-page"}>
            <div className={"login-page-logo"}>
            </div>

            <div className={"registration-form"}>

                <div className="login-header">
                    <h1>Basic Info</h1>
                    <p>*All fields required unless noted</p>
                </div>
                <label htmlFor="email" className="form-lables">Email Address</label>
                <input type="text" id="email" name="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Enter your email"
                />

                <label htmlFor="firstName" className="form-lables">First Name</label>
                <input type="text" id="firstName" name="first Name" placeholder="Enter your First Name"
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName" className="form-lables">Last Name</label>
                <input type="text" id="lastName" name="Last Name" placeholder="Enter your Last Name"
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="password" className="form-lables">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="Phone Number" className="form-lables">Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter your Phone Number"
                       value={phoneNumber}
                       onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <div className={"gender-radio"}>
                    <label htmlFor="gender" className="form-lables">What is your gender?(Optional)</label>
                    <div className="radio-container">
                        <label className="radio-label" htmlFor="male">Male</label>
                        <input type="radio" id="male" name="gender"
                               value="male"
                               onChange={(e) => setGender(e.target.value)}
                        />
                        <label className="radio-label" htmlFor="female">Female</label>
                        <input type="radio" id="female" name="gender" value="female"
                               onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                </div>
                <div className={"date-of-birth-div"}>
                    <label>Date of Birth</label>
                    <DatePicker
                        className={"date-picker"}
                        id="dob"
                        inputProps={{ placeholder: 'Select Date of Birth' }}
                        value={dateOfBirth}
                        selected={dateOfBirth}
                        onChange={(date) => setDateOfBirth(date)}
                        dateFormat="dd/M/yyyy" // Customize the date format
                    />
                </div>

                <div className={"gender-radio"}>
                    <label htmlFor="role">Select a role:</label>
                    <select
                        id="role"
                        name="role"
                        value={role} // Set the value of the select element to the current state
                        onChange={(e) => setRole(e.target.value)} // Update the state on change
                    >
                        <option value="ngo">NGO</option>
                        <option value="individual">Individual</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                </div>

                <span className="login-button-container">
                    <button className="login-button btn btn-dark" onClick={handleRegistration}>
                        Register
                    </button>
                    <Link to={"/"} className="fa-primary">Back To Login</Link>

                </span>
                {error && <p className="error-message">{error}</p>}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Registration Success"
                >
                    <h2>Registration Successful!</h2>
                    <p>Your account has been successfully registered.</p>
                    <button onClick={closeModal}>OK</button>
                </Modal>
            </div>
        </div>
    )
}
export default RegistrationPage;