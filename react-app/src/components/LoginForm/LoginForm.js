import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { login } from "../../services/auth";
import "./LoginForm.css";


const LoginForm = ({ setAuthenticated, onClose }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
    
        const user = await login(email, password);
        if (user) {
            setAuthenticated(true);
            onClose();
            window.location.href='/matches';
        } else {
            setErrors(user.errors);
        }
    };


  return (
    <form onSubmit={handleSubmit}>
      <div>
            {errors.map((error) => (
                <div>{error}</div>
            ))}
      </div>
      <div>
            <label htmlFor="email">Email</label>
            <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
      </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </div>
    </form>
  );
};

export default LoginForm;
