import React, { useState } from 'react';
import { Modal } from '../../context/ModalContext';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useDispatch } from 'react-redux';
import { login } from '../../services/auth'

const AuthFormModal = ({setAuthenticated, authenticated}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [formType, setFormType] = useState("login");
    const onClose= () => {setShowModal(false)}
    return (
            <>
                <button onClick={() => {
                        setShowModal(true);
                        setFormType("login");
                    }}>Log In</button>
                <button onClick={() => {
                        setShowModal(true);
                        setFormType("signup")
                    }}>Sign Up</button>
                <button onClick={()=>{
                    return dispatch(login({ email:"demo@aa.io", password:"password" })).catch(
                        (res) => {
                            if (res.data && res.data.errors) console.log(res.data.errors);
                        }
                  );
                }} >Demo</button>
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



