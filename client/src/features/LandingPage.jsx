import {useContext, useState} from 'react';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import RegisterForm from './RegisterForm';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import Modal from '../components/Modal';

const LandingPage = () => {
    const {handleOpen, isModalOpen, handleModal} = useContext(ModalContext);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    
    const openRegisterModal = () => {
      setIsRegisterOpen(true)
      // setIsLoginOpen(false)
      console.log(`Register SignUp Opened`)
    }

    const openLoginModal = () => {
      setIsLoginOpen(true)
      setIsRegisterOpen(false)
    }

    const closeModals = () => {
      setIsRegisterOpen(false)
      setIsLoginOpen(false)
    }

    const clickHandler = (event) => {
      handleOpen()
      openRegisterModal()
    }

    return (
        <div>
            <Header />
            <div className='hero min-h-screen bg-base-200'>
                <div className='hero-content text-center'>
                    <div className='max-w-md'>
                        <h1 className='text-5xl font-bold'>
                            Projects. Together.
                        </h1>
                        <p className='py-6'>
                            Organize your team goals and deploy faster
                        </p>
                        <button
                            type='button'
                            className='btn btn-primary'
                            data-modal='modal-register'
                            onClick={clickHandler}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <Modal closeAllAuthModals={closeModals} registerFormStatus={isRegisterOpen} loginFormStatus={isLoginOpen}>
                {isRegisterOpen && <RegisterForm onClose={closeModals} onLoginClick={openLoginModal}/>}
                {isLoginOpen && <LoginForm  isOpen={isLoginOpen} onClose={closeModals}/>}
            </Modal>
        </div>
    );
};
export default LandingPage;
