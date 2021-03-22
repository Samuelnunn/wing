import React, { useEffect, useState, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const ModalContext = React.createContext();

const ModalProvider = ({children}) => {
    const modalRef = useRef();
    const [value, setValue] = useState();
    
    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef}/>
        </>
    );
};
    export const Modal = ({onClose, children }) => {
        const ModalNode = useContext(ModalContext);
        if (!ModalNode) return null

        return ReactDOM.createPortal(
            <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                <i className="fas fa-times modal-close" onClick={onClose}></i>
                {children}
            </div>
          </div>,
          ModalNode
        );
    }

export default ModalProvider;