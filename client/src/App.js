import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom"

import AppFooter from "./Components/AppFooter";
import LoginPage from "./Components/LoginPage";
import RegistrationPage from "./Components/RegistrationPage";
import Home from "./Components/Home";
import CreatePost from "./Components/CreatePost";
function App() {
  return (
    <Router basename="/CaringPlates">
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
        </Routes>
        <AppFooter />
    </Router>

  );
}

export default App;
