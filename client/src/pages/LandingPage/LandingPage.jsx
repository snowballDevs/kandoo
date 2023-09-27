import {useContext, useState} from 'react';
import {ModalContext} from '../../contexts/ModalContext/ModalContext';
import RegisterForm from './Auth/RegisterForm';
import LoginForm from './Auth/LoginForm';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Footer from '../../components/Footer';

const LandingPage = () => {
    const {handleOpen} = useContext(ModalContext);

    const [displayedForm, setDisplayedForm] = useState('register');

    const handleFormChange = (newForm) => {
        setDisplayedForm(newForm);
    };

    const handleClick = () => {
        handleOpen();
        handleFormChange('register');
    };

    const oldCode = () => (
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

    return (
        <div className='bg-white'>
            <Header formDisplay={handleFormChange} />
            <div className='relative isolate px-6 pt-14 lg:px-8 bg-primaryLight w-screen flex-auto'>
                <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
                    <div className='text-center'>
                    <h1 className='text-5xl font-bold text-secondaryLight sm:text-6xl'>
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
                            className='rounded-md px-3.5 py-2.5 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-flashy text-primaryLight border-primaryLight hover:text-secondaryLight'
                            onClick={handleClick}
                        >
                            Get Started
                        </button>
                        
                    </div>
                </div>
            </div>
            <Footer  />
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
