import React, { useState } from 'react';
import { Modal } from '../../context/ModalContext';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useDispatch } from 'react-redux';
import { login } from '../../services/auth'
import './LoginForm.css'

const AuthFormModal = ({setAuthenticated, authenticated}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [formType, setFormType] = useState("login");
    const [errors, setErrors] = useState([]);
    const onClose= () => {setShowModal(false)}
    
    const demoLogin = async (e) => {
        e.preventDefault();
        const user = await login("demo@aa.io", "password");
        setErrors([]);
        if (!user.errors) {
            setAuthenticated(true);
            onClose();
            window.location.href='/matches';
        } else {
            setErrors(user.errors);
        }
      };
    
    
    return (
            <>
            <div className='nav-container'>
                    <button id='nav-link-buttons' onClick={() => {
                            setShowModal(true);
                            setFormType("login");
                        }}>Log In</button>
                    <button id='nav-link-buttons' onClick={() => {
                            setShowModal(true);
                            setFormType("signup")
                        }}>Sign Up</button>
                    <button type='button' id='nav-link-buttons' onClick={demoLogin} >Demo</button>
                </div>
                {showModal && (
                  <Modal onClose={onClose}>
                    {(formType==="login") &&
                        <LoginForm setAuthenticated={setAuthenticated}  authenticated={authenticated} onClose={onClose}/>
                    }
                    {(formType==="signup") &&
                        <SignUpForm  setAuthenticated={setAuthenticated}  authenticated={authenticated} onClose={onClose}/>
                    }
                  </Modal>
                )}
            </>
        );
    }
    
export default AuthFormModal;



