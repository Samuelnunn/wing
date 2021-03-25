import React, { useState } from 'react';
import { Modal } from '../../context/ModalContext';
import AboutWing from './about'
import './Splash.css';
import '../../index.css'
import wing from './wing-logo2.png'



const SplashPage = () => {
    
    const [showModal, setShowModal] = useState(false);

    const onClose= () => {setShowModal(false)};

    const modalClickHandler = (e) => {
        setShowModal(true)
    }

    return (
            <div className='logo'>
                <img className='wing-logo' src={wing} onClick={modalClickHandler}/>
                <div></div>
                <div>
                    {showModal && (
                        <Modal onClose={onClose}>
                            <AboutWing onClose={onClose}/>
                        </Modal>
                    )}
                </div>
            </div>
    );
};

export default SplashPage;