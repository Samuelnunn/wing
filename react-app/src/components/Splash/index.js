import React, { useState } from 'react';
import { Modal } from '../../context/ModalContext';
import AboutWing from './about'
import './Splash.css';
import '../../index.css'



const SplashPage = () => {
    
    const [showModal, setShowModal] = useState(false);

    const onClose= () => {setShowModal(false)};

    const modalClickHandler = (e) => {
        setShowModal(true)
    }

    return (
            <div className='logo'>
                <h1 className='text' onClick={modalClickHandler}>Wing</h1>
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