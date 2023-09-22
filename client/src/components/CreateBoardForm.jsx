import {useState, useContext} from 'react';
import dataService from '../services/dataService';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';

const BoardForm = () => {
    const {handleModal, isModalOpen, handleClose, handleOpen} =
        useContext(ModalContext);

    const {setCurrentPage} = useRoutingContext();

    const {setSelectedBoard} = useSelectedBoardContext();

    const [formData, setFormData] = useState({
        boardName: '',
        description: '',
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
            
            const response = await dataService.createBoard(formData);
            console.log(response);
            // handle response
            if (response.status >= 200 && response.status < 300) {
                console.log('Request Successful', response);
                const {board} = response.data;
                setSelectedBoard(board);
                setCurrentPage('workspace');
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
                        className='mx-auto w-40'
                        src='/kandoologo.png'
                        alt='Kandoo logo'
                    />
                    <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        The start of something special
                    </h2>
                </div>

                <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-2' onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor='boardName'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Project Name
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='boardName'
                                    name='boardName'
                                    type='text'
                                    onChange={handleChange}
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between'></div>
                            <div>
                                <label
                                    htmlFor='description'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Description
                                </label>
                                <div className='mt-2'>
                                    <textarea
                                        id='description'
                                        name='description'
                                        rows='3'
                                        onChange={handleChange}
                                        required
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    ></textarea>
                                </div>
                                <p className='mt-3 text-sm leading-6 text-gray-600'>
                                    Write a few sentences about your project.
                                </p>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Create a project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BoardForm;
