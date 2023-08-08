import {useContext, useEffect} from 'react';
import {ModalContext} from '../contexts/ModalContext/ModalContext';

const Modal = ({children, closeAllAuthModals, registerFormStatus, loginFormStatus}) => {
    const {isModalOpen, handleClose} = useContext(ModalContext);

    const closeAll = () => {
      if(registerFormStatus || loginFormStatus){
        closeAllAuthModals()
      }
      handleClose()
    }

    useEffect(() => {
        console.log('Rendered');

        function handleEscapeKey(event) {
            console.log(event);
            if (event.code === 'Escape') {
                handleClose();
                if(registerFormStatus || loginFormStatus) {
                  closeAllAuthModals();
                }
            }
        }
        document.addEventListener('keydown', handleEscapeKey);

        // cleanup when unmounting/removing this component
        return () => {
            console.log('removed');
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [handleClose, closeAllAuthModals]);

    return (
        <dialog className='modal' open={isModalOpen}>
            <div className='modal-box'>
                <button
                    onClick={closeAll}
                    className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                    type='button'
                >
                    x
                </button>
                {children}
            </div>
            <div
                className='modal-backdrop bg-slate-400 opacity-50'
                onClick={closeAll}
                role='button'
                tabIndex={0}
                aria-hidden='true'
            />
        </dialog>
    );
};

export default Modal;
