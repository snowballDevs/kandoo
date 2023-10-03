import {HiPlusCircle} from 'react-icons/hi';

const AddTask = ({addTask, column, containerId}) => (
    <button
        className='flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor text-gray-900 font-semibold hover:bg-gray-400'
        type='button'
        onClick={() => {
            addTask(column._id, containerId);
        }}
    >
        <HiPlusCircle className='text-2xl' />
        Add task
    </button>
);

export default AddTask;
