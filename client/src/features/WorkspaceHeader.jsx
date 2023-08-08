import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
import dataService from '../services/dataService';
import {MdDelete, MdModeEdit} from 'react-icons/md';
import formatDate from '../utils/formatDate';
const WorkspaceHeader = ({boardInfo}) => {
    const {setCurrentPage} = useRoutingContext();

    const deleteProject = async (id) => {
        try {
            const deletedProject = await dataService.deleteBoard(id);
            console.log(deleteProject);
            setCurrentPage('dashboard');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='bg-white grid mt-2 w-full px-4 py-4 sm:px-6 max-w-7xl mx-auto items-center grid-cols-1 md:grid-cols-2 dark:bg-gray-900'>
                <div className='row'>
                    <p className='font-light text-md dark:text-white'>
                        Project:
                    </p>
                    <h1 className='font-bold text-3xl dark:text-white'>
                        {boardInfo.boardName}
                    </h1>
                    <h2 className='text-gray-700 mb-4 text-sm dark:text-gray-400'>
                        Created: {formatDate(boardInfo.createdAt)}
                    </h2>
                    <p className='text-gray-500 dark:text-gray-300 line-clamp-2'>
                        {boardInfo.description}
                    </p>
                </div>
                <div className='flex gap-5 mt-5 md:mt-0 justify-end'>
                    <button className='flex items-center justify-center font-semibold bg-gray-900 hover:bg-blue-500 text-gray-100 dark:bg-gray-600 dark:hover:bg-blue-500 dark:text-gray-100 rounded w-32 py-2 px-2'>
                        <MdModeEdit className='text-xl mr-2' /> Edit
                    </button>

                    <button
                        onClick={() => deleteProject(boardInfo._id)}
                        className='flex items-center justify-center font-semibold bg-red-500 hover:bg-red-700 text-gray-100 dark:bg-gray-600 dark:hover:bg-red-500 dark:text-gray-100 rounded w-32 py-2 px-2'
                    >
                        <MdDelete className='text-xl mr-2' /> Delete
                    </button>
                </div>
            </div>
        </>
    );
};

export default WorkspaceHeader;
