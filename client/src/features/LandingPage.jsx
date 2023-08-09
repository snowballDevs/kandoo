import {useContext, useState} from 'react';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import RegisterForm from './RegisterForm';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import Modal from '../components/Modal';

const LandingPage = () => {
    const {handleOpen, isModalOpen, handleModal} = useContext(ModalContext);

    const [displayedForm, setDisplayedForm] = useState('register');

    const handleFormChange = (newForm) => {
        setDisplayedForm(newForm);
    };

    const handleClick = (event) => {
        handleOpen();
        handleFormChange('register');
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
                            onClick={handleClick}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <Modal>
                {displayedForm === 'register' ? (
                    <RegisterForm formDisplay={handleFormChange} />
                ) : (
                    <LoginForm formDisplay={handleFormChange} />
                )}
            </Modal>
        </div>
    );
};
export default LandingPage;
