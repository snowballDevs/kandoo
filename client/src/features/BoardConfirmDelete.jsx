import {Fragment, useState} from 'react';
import {ExclamationTriangleIcon, XMarkIcon} from '@heroicons/react/24/outline';

const BoardConfirmDelete = ({closeModal, deleteBoard, boardId}) => {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                    <ExclamationTriangleIcon
                        className='h-6 w-6 text-red-600'
                        aria-hidden='true'
                    />
                </div>

                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <h3
                        className='text-base font-semibold leading-6 text-gray-900'
                    >
                        Delete Board
                    </h3>
                    <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                            Are you sure you want to delete this board? All of
                            your tasks, comments, and columns will be
                            permanently removed from our servers forever. This
                            action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                    onClick={() => deleteBoard(boardId)}
                >
                    Delete
                </button>
                
            </div>
        </div>
    );
};
export default BoardConfirmDelete;
