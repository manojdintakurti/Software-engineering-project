import "../CSS/LoginPageCSS.css"
import "../CSS/RegisrationPageCSS.css"
import DOBSelector from "./DOBSelector";


function RegistrationPage(){
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
                <input type="text" id="email" name="email" placeholder="Enter your email"/>

                <label htmlFor="firstName" className="form-lables">First Name</label>
                <input type="text" id="firstName" name="first Name" placeholder="Enter your First Name"/>

                <label htmlFor="SecondName" className="form-lables">Second Name</label>
                <input type="text" id="secondName" name="Second Name" placeholder="Enter your Second Name"/>

                <label htmlFor="password" className="form-lables">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" />

                <div className={"gender-radio"}>
                    <label htmlFor="gender" className="form-lables">What is your gender?(Optional)</label>
                    <div className="radio-container">
                        <label className="radio-label" htmlFor="male">Male</label>
                        <input type="radio" id="male" name="gender" value="male" />
                        <label className="radio-label" htmlFor="female">Female</label>
                        <input type="radio" id="female" name="gender" value="female" />
                    </div>
                </div>
                <DOBSelector />
                <label htmlFor="role">Select a role:</label>
                <select id="role" name="role">
                    <option value="ngo">NGO</option>
                    <option value="individual">Individual</option>
                    <option value="restaurant">Restaurant</option>
                </select>
                <span className="login-button-container"><button className="login-button btn btn-dark">Register</button></span>

            </div>
        </div>
    )
}
export default RegistrationPage;