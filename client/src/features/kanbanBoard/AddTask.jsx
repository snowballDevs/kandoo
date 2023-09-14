import {HiPlusCircle} from 'react-icons/hi';

const AddTask = ({addTask, containerId}) => {
    return (
        <button
            className='flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:bg-warningLight'
            onClick={() => {
                addTask(containerId);
            }}
        >
            <HiPlusCircle className='text-2xl' />
            Add task
        </button>
    );
};

export default AddTask;
