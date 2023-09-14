import {useContext, useState, useEffect} from 'react';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import RegisterForm from './RegisterForm';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import Modal from '../components/Modal';

const LandingPage = () => {
    const {handleOpen, isModalOpen} = useContext(ModalContext);

    const [displayedForm, setDisplayedForm] = useState('register');

    const handleFormChange = (newForm) => {
        setDisplayedForm(newForm);
    };

    const handleClick = () => {
        handleOpen();
        handleFormChange('register');
    };

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
    }, [isModalOpen]);

    return (
        <div>
            <Header formDisplay={handleFormChange} />
            <div className='hero min-h-screen bg-primaryLight'>
                <div className='hero-content text-center'>
                    <div className='max-w-md'>
                        <h1 className='text-5xl font-bold text-secondaryLight'>
                            Projects.{' '}
                            <span className='text-transparent bg-gradient-to-r from-pinkLight via-redLight to-yellowLight bg-clip-text'>
                                Together.
                            </span>
                        </h1>
                        <p className='py-6 text-secondaryLight'>
                            Organize your team goals and deploy faster
                        </p>
                        <button
                            type='button'
                            className='btn bg-flashy text-primaryLight border-primaryLight'
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
