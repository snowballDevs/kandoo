import {useContext, useState} from 'react';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import RegisterForm from './RegisterForm';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import Modal from '../components/Modal';

const LandingPage = () => {
    const {handleOpen, isModalOpen, handleModal} = useContext(ModalContext);

    const [displayedForm, setDisplayedForm] = useState('register');

    const handleLoginForm = () => {
        setDisplayedForm('login');
    };

    const handleRegisterForm = () => {
        setDisplayedForm('register');
    };

    const clickHandler = (event) => {
        handleOpen();
    };

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
            <Modal>
                {displayedForm === 'register' ? (
                    <RegisterForm formDisplay={handleLoginForm} />
                ) : (
                    <LoginForm formDisplay={handleRegisterForm} />
                )}
            </Modal>
        </div>
    );
};
export default LandingPage;
