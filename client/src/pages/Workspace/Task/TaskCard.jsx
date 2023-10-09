import ProfileIcon from '../../../components/ProfileIcon';
import {useSelectedBoardContext} from '../../../contexts/BoardContext/boardContext';

const TaskCard = ({task}) => {
    const {selectedBoard} = useSelectedBoardContext();

    const priorityColorMap = {
        high: 'border-red-500',
        medium: 'border-yellow-500',
    };
    const priorityColor = priorityColorMap[task.priority] || 'border-blue-500';
    const assignedUsers = selectedBoard.users.filter((user) =>
        task?.assignedUserIds.includes(user._id)
    );

    return (
        <div className=' hover:ring-gray-900 hover:ring-2 rounded'>
            <div
                className={`bg-gray-700 h-full min-h-[70px]  px-2 py-4 flex gap-2 items-center  justify-between  text-left rounded cursor-grab  border-l-8 ${priorityColor}`}
            >
                <p className='my-auto shrink overflow-y-auto overflow-x-hidden  truncate text-white'>
                    {task.taskName}
                </p>
                <div className='isolate flex -space-x-1 overflow-hidden shrink-0 '>
                    {assignedUsers.slice(0, 3).map((user) => (
                        <ProfileIcon key={user._id} fullName={user.fullName} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
