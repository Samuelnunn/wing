import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { login } from "../../services/auth";
import "./LoginForm.css";
import wing from './w-logo.png';


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
        if (!user.errors) {
            setAuthenticated(true);
            onClose();
            window.location.href='/matches';
        } else {
            setErrors(user.errors);
        }
    };


  return (
    <form onSubmit={handleSubmit} className='form-container'>
        <div className='left-side-container'>
            <img src={wing} className='w-logo'/>
        </div>
        <div className='login-container'>
            <div>
                  {errors.map((error) => (
                      <div>{error}</div>
                  ))}
            </div>
            <div className='email-ele'>
            <label htmlFor="email">Email </label>
                    <input
                        name="email"
                        type="text"
                        placeholder="bubble@bop.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input-fields'
                    />
            </div>
                <div className='password-ele'>
                    <label htmlFor="password">Password </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="*******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input-fields'
                    />
                </div>
                    <div className='button-ele'>
                        <button type="submit" className='button-ele'>Login</button>
                    </div>
        </div>
    </form>
  );
};

export default LoginForm;
