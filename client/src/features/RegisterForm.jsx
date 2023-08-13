import {useContext, useState} from 'react';
import dataService from '../services/dataService';
import {useAuthContext} from '../contexts/AuthContext/authContext';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import {ModalContext} from '../contexts/ModalContext/ModalContext';

const RegisterForm = ({formDisplay}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {handleClose} = useContext(ModalContext);

    const {setIsAuthenticated} = useAuthContext();

    const {setCurrentPage} = useRoutingContext();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await dataService.signup(formData);
            if (response.status >= 200 && response.status < 300) {
                console.log('Registration successful: ', response);
                handleClose();
                setCurrentPage('dashboard');
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error message: ', error.message);
        }

        console.log(event);
    };

    return (
        <div>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 bg-primaryLight text-secondaryLight'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='mx-auto h-10 w-auto'
                        src='/KandooLogoW.png'
                        alt='Your Company'
                    />
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
                        Register for a new account
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form
                        className='space-y-6'
                        action='#'
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor='firstName'
                                className='block text-sm font-medium leading-6 text-secondaryLight text-left'
                            >
                                First Name
                                <input
                                    id='firstName'
                                    name='firstName'
                                    type='text'
                                    onChange={handleChange}
                                    autoComplete='firstName'
                                    required
                                    className='mt-2 block w-full rounded-md border-0 py-1.5 text-secondaryLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </label>
                        </div>
                        <div>
                            <label
                                htmlFor='firstName'
                                className='block text-sm font-medium leading-6 text-secondaryLight text-left'
                            >
                                Last Name
                                <input
                                    id='lastName'
                                    name='lastName'
                                    type='text'
                                    onChange={handleChange}
                                    autoComplete='lastName'
                                    required
                                    className='mt-2 block w-full rounded-md border-0 py-1.5 text-secondaryLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </label>
                        </div>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium leading-6 text-secondaryLight text-left'
                            >
                                Email address
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    onChange={handleChange}
                                    autoComplete='email'
                                    required
                                    className='mt-2 block w-full rounded-md border-0 py-1.5 text-secondaryLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </label>
                        </div>

                        <div>
                            <div className=' items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium leading-6 text-secondaryLight'
                                >
                                    Password
                                    <div className='mt-2'>
                                        <input
                                            id='password'
                                            name='password'
                                            type='password'
                                            onChange={handleChange}
                                            autoComplete='current-password'
                                            required
                                            className='mt-2 block w-full rounded-md border-0 py-1.5 text-secondaryLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500 {}'>
                        Already a member?{' '}
                        <button
                            type='button'
                            className='font-semibold leading-6 text-flashy hover:text-indigo-500'
                            onClick={() => formDisplay('login')}
                        >
                            Login now
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
