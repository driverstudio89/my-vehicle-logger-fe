import "../css/Navbar.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const authContext = useAuthContext();

    const handleLogout = () => {
        authContext.logout();
        navigate("/profile")
    }
    
    return <nav className="navbar">
        <div className="navbar-app">
            <Link to="/" className="nav-link">Vehicle-Logger</Link>
        </div>
        <div className="navbar-links">
            

            {/* <Link to="/" className="nav-link">Home</Link> */}
            {authContext.isAuthenticated ? (
                <>
                <Link to="/add-vehicle" className="add-vehicle-link">Add Vehicle</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <div className="btn-logout" onClick={handleLogout}> Logout</div>
                </>
            ) : <Link to="/profile" className="nav-link">Login</Link>}
            <Link to="/about" className="nav-link">About</Link>
        </div>
    </nav>
}

export default Navbar