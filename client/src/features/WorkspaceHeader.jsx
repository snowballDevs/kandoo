import {MdDelete, MdModeEdit} from 'react-icons/md';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
import dataService from '../services/dataService';
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
        <div>
            <div className=' grid mt-2 w-full px-4 py-4 sm:px-6 max-w-7xl mx-auto items-center grid-cols-1 md:grid-cols-2 bg-primaryLight'>
                <div className='row'>
                    <p className='font-light text-md light:text-secondaryLight dark:text-secondaryLight'>
                        Project:
                    </p>
                    <h1 className='font-bold text-3xl text-secondaryLight'>
                        {boardInfo.boardName}
                    </h1>
                    <h2 className='text-gray-700 mb-4 text-sm dark:text-gray-400'>
                        Created: {formatDate(boardInfo.createdAt)}
                    </h2>
                    <p className='text-secondaryLight line-clamp-2'>
                        {boardInfo.description}
                    </p>
                </div>
                <div className='flex gap-5 mt-5 md:mt-0 justify-end'>
                    <button type='button' className='flex items-center justify-center font-semibold dark:bg-gray-900 bg-tertiaryLight text-gray-100 dark:bg-gray-600 dark:hover:bg-blue-500 dark:text-gray-100 rounded w-32 py-2 px-2'>
                        <MdModeEdit className='text-xl mr-2' />
                    </button>

                    <button
                        type='button'
                        onClick={() => deleteProject(boardInfo._id)}
                        className='flex items-center justify-center font-semibold hover:bg-red-700 text-gray-100 bg-dangerLight dark:hover:bg-red-500 dark:text-gray-100 rounded px-3 '
                    >
                        <MdDelete className='text-xl mr-2' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceHeader;