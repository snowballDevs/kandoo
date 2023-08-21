// this is reusing the BoardForm for Login Form
import {useState, useContext} from 'react';
import dataService from '../services/dataService';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import {useAuthContext} from '../contexts/AuthContext/authContext';

const LoginForm = () => {
    const {handleClose} = useContext(ModalContext);

    const {setIsAuthenticated} = useAuthContext();

    const {setCurrentPage} = useRoutingContext();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(event.target.value);
    };

    const handleSubmit = async (event) => {
        // prevent refreshing the form
        event.preventDefault();
        try {
            const response = await dataService.login(formData);
            // handle response
            if (response.status >= 200 && response.status < 300) {
                console.log('Request Successful', response);
                setCurrentPage('dashboard');
                setIsAuthenticated(true);
                handleClose();
            }
        } catch (error) {
            console.error('Error: ', error.message);
        }
    };
    return (
        <div>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='mx-auto w-32'
                        src='/KandooLogoW.png'
                        alt='Your Company'
                    />
                    <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-secondaryLight'>
                        The start of something special
                    </h2>
                </div>

                <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-2' onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium leading-6 text-secondaryLight'
                            >
                                Email
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    onChange={handleChange}
                                    required
                                    className='mt-2 block w-full rounded-md border-0 py-1.5 text-secondaryLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </label>
                        </div>

                        <div>
                            <div className='flex items-center justify-between' />
                            <div>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium leading-6 text-secondaryLight'
                                >
                                    Password
                                    <input
                                        id='password'
                                        name='password'
                                        type='password'
                                        onChange={handleChange}
                                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-secondaryLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
