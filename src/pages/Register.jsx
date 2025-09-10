import "../css/Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
import { apiRequest } from "../services/api.js";

function Register() {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  if (authContext.isAuthenticated) {
    navigate("/");
  }

  const [email, setEmail] = useState("ivan@gmail.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [errors, setErrors] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    

    if(password === confirmPassword) {
        try {
            const response = await apiRequest("/users/register",
              { method: "POST",
                   headers: {"Content-Type": "application/json"},
                   body: JSON.stringify({ email, password })}
            );
            
            if (!!response.ok) {
              navigate("/profile")
            } else {
              const data = await response.json().catch(() => ({}));
              setErrors(data);
            }
      
          } catch (err) {
              console.log(err);
              setErrors(err.message);
          }
    } else {
        setErrors(prev => ({
            ...prev,
            confirmPassword: "Confirm password does not match"
        }));
    }


    
  };

  return (
    <div className="register">
      <h3>Register</h3>

      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
          />
        </div>

        {errors && (
          <div className="login-errors">
            <p>{errors.email}</p>
            <p>{errors.password}</p>
            <p>{errors.confirmPassword}</p>
            <p>{errors.message}</p>
          </div>
        )}

        <button className="btn-login">Register</button>
      </form>
    </div>
  );
}

export default Register;
