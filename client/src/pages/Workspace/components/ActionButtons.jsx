import {MdModeEdit, MdDelete, MdClose} from 'react-icons/md';

const ActionButtons = ({toggleEditMode, handleDelete, handleClose}) => (
    <div className='flex h-7 gap-2 items-center'>
        <button
            type='button'
            className='relative text-gray-400 hover:text-gray-500'
            onClick={toggleEditMode}
        >
            <span className='absolute -inset-2.5' />
            <span className='sr-only'>Edit panel</span>
            <MdModeEdit className='h-5 w-5' aria-hidden='true' />
        </button>
        <button
            type='button'
            className='relative text-gray-400 hover:text-gray-500'
            onClick={handleDelete}
        >
            <span className='absolute -inset-2.5' />
            <span className='sr-only'>Delete task</span>
            <MdDelete className='h-5 w-5' aria-hidden='true' />
        </button>
        <button
            type='button'
            className='relative text-gray-400 hover:text-gray-500'
            onClick={handleClose}
        >
            <span className='absolute -inset-2.5' />
            <span className='sr-only'>Close panel</span>
            <MdClose className='h-6 w-6' aria-hidden='true' />
        </button>
    </div>
);

export default ActionButtons;
