import "../css/Navbar.css"
import { Link } from "react-router-dom"

function Navbar() {
    return <nav className="navbar">
        <div className="navbar-app">
            <Link to="/" className="nav-link">Vehicle-Logger</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/about" className="nav-link">About</Link>
        </div>
    </nav>
}

export default Navbar