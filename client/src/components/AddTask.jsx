import {HiPlusCircle} from 'react-icons/hi';

const AddTask = () => {
    return (
        <button
            className='flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:bg-warningLight'
            onClick={() => {
                createTask(column.id);
            }}
        >
            <HiPlusCircle className='text-2xl' />
            Add task
        </button>
    );
};

export default AddTask;
