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
    
    const demoLogin = e => {
        e.preventDefault();
        dispatch(login('samuelnunn90@gmail.com', 'password'))
          .then(() => {
            dispatch(onClose());
          });
      };
    
    
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
                <button type='button' onClick={demoLogin} >Demo</button>
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



