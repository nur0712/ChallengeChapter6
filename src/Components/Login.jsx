import React, { useState } from "react";
import axios from "axios";
import GoogleLogin from "../Auth/GoogleLogin";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (email !== "" && password !== "") {
      const data = {
        email,
        password,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/login`,
          data
        );
        if (result.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setEmail("")
    setPassword("")
  };

  const home = () => (
    navigate("/")
  )

  const reg = () => (
    navigate("/register")
  )

  return (
    <div className="Login">
            {token ? (
                <section className="section1">
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Button onClick={home}>Go to Home</Button> <Button onClick={handleLogout}>Logout</Button>
                    </p>
                </section>
            ) : (
                <section className="section1">
                    <h1>Sign In</h1>
                    <form className="form1">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <Button variant="contained" onClick={handleSubmit}>Sign In</Button>
                    </form>
                        Need an Account?<br />
                        <div className="sign">
                            <Button variant="contained" onClick={reg}>Sign Up</Button> or <GoogleLogin setToken={setToken} label="Login with Google" />
                        </div> 
                </section>
            )}
    </div>
  );
};

export default Login;
