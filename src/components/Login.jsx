import { useState } from "react";
import "../css/Login.css";
import { login } from "../services/api.js"
import { useNavigate } from "react-router-dom"
import jwtDecode from "./JwtDecode.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "ivan@gmail.com",
    password: "123456",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();    
    try {
      const accessToken = await login(formData.email, formData.password);
      const userData = jwtDecode(accessToken);
      if (userData.email) {
        navigate("/")
      }
      
    } catch (error) {
        console.error("Error logging in: ", error);
    }
};

  return (
    <div className="login">
      <h3>Login</h3>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button className="btn-login">Login</button>
      </form>
    </div>
  );
}

export default Login;
