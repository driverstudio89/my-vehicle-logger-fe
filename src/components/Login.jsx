import { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

function Login() {
  const authContext = useAuthContext();
  const [email, setEmail] = useState("ivan@gmail.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!!response.ok) {
        authContext.login(data.token);
        navigate("/");
      } else {
        setErrors(data);
      }
    } catch (err) {
      setErrors(err.message);
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
        {errors && <div className="login-errors">
          <p>{errors.email}</p>
          <p>{errors.password}</p>
        </div>}

        <button className="btn-login">Login</button>
      </form>
    </div>
  );
}

export default Login;
