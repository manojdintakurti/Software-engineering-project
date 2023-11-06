import './App.css';
import axios from "axios";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom"
import AppFooter from "./Components/AppFooter";
import LoginPage from "./Components/LoginPage";
import RegistrationPage from "./Components/RegistrationPage";
function App() {
  axios.defaults.baseURL = 'http://webdev.cs.vt.edu:8080/CaringPlates/api/'

  return (
    <Router basename="/CaringPlates">
        {/*<AppHeader />*/}
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
        <AppFooter />
    </Router>

  );
}

export default App;
