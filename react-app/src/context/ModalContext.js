import React, { createContext, useEffect, useState, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';

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
        const ModalContext = useContext(ModalContext)
        if (!ModalContext) return null

        return ReactDOM.createPortal(
            <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
              <i className="fas fa-times modal-close" onClick={onClose}></i>
              {children}
            </div>
          </div>,
          ModalContext   
        )
    }

export default ModalProvider;