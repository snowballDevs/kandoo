import {useContext, useEffect} from 'react';
import {ModalContext} from '../contexts/ModalContext/ModalContext';

const Modal = ({children}) => {
    const {isModalOpen, handleClose} = useContext(ModalContext);

    useEffect(() => {
        console.log('Rendered');

        function handleEscapeKey(event) {
            console.log(event);
            if (event.code === 'Escape') {
                handleClose();
            }
        }
        document.addEventListener('keydown', handleEscapeKey);

        // cleanup when unmounting/removing this component
        return () => {
            console.log('removed');
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [handleClose]);

    return (
        <dialog className='modal' open={isModalOpen}>
            <div className='modal-box bg-primaryLight text-secondaryLight'>
                <button
                    onClick={handleClose}
                    className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                    type='button'
                >
                    x
                </button>
                {children}
            </div>
            <div
                className='modal-backdrop bg-slate-400 opacity-50'
                onClick={handleClose}
                role='button'
                tabIndex={0}
                aria-hidden='true'
            />
        </dialog>
    );
};

export default Modal;
