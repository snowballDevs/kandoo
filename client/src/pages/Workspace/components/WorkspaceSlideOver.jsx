import {useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import dataService from '../../../services/dataService';
import formatDate from '../../../utils/formatDate';
import {useModalContext} from '../../../contexts/ModalContext/ModalContext';
import {useSelectedBoardContext} from '../../../contexts/BoardContext/boardContext';
import CommentFeed from '../Comment/CommentFeed';
import PriorityDisplay from '../Task/Priority/PriorityDisplay';
import TaskDescription from '../Task/TaskDescription';
import EditActionButtons from '../Task/EditActionButtons';
import ActionButtons from './ActionButtons';
import AssigneesList from '../Task/Assignee/AssigneesList';
import ProfileIcon from '../../../components/ProfileIcon';
import PriorityList from '../Task/Priority/PriorityList';

const WorkspaceSlideOver = () => {
    const {isSlideOverOpen, handleSlideOver} = useModalContext();
    const {
        selectedTaskId,
        selectedColumnId,
        selectedBoard,
        setSelectedTask,
        items,

        setSelectedBoard,
    } = useSelectedBoardContext();
    const [editingMode, setEditingMode] = useState(false);

    const column = items.find((col) => col._id === selectedColumnId);
    const task = column?.tasks.find((tsk) => tsk._id === selectedTaskId);
    const assignedUsers = selectedBoard.users.filter((user) =>
        task?.assignedUserIds.includes(user._id)
    );

    const [formData, setFormData] = useState({
        taskName: task?.taskName || '',
        taskDetail: task?.taskDetail || '',
        priority: task?.priority || '',
        assignedUserIds: task?.assignedUserIds || [],
    });

    const toggleEditingMode = () => {
        setEditingMode(!editingMode);
    };

    function handleClose() {
        handleSlideOver();
    }

    async function handleTaskSubmit(event) {
        event.preventDefault();
        try {
            const response = await dataService.updateTask(
                selectedBoard._id,
                column._id,
                task._id,
                formData
            );

            const updatedTask = response.data;

            setSelectedBoard((prev) => ({
                ...prev,
                columns: prev.columns.map((col) =>
                    col._id === column._id
                        ? {
                              ...col,
                              tasks: col.tasks.map((t) =>
                                  task._id === updatedTask._id ? updatedTask : t
                              ),
                          }
                        : col
                ),
            }));

            // setItems((prev) => {
            //     const updatedColumns = [...prev];

            //     const columnIndex = updatedColumns.findIndex(
            //         (c) => c._id === column._id
            //     );

            //     const taskIndex = updatedColumns[columnIndex].tasks.findIndex(
            //         (t) => t._id === task._id
            //     );

            //     updatedColumns[columnIndex].tasks[taskIndex] = updatedTask;

            //     return updatedColumns;
            // });
            toggleEditingMode();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleTaskDelete() {
        try {
            handleClose();
            await dataService.deleteTask(
                selectedBoard._id,
                column._id,
                task._id
            );

            setSelectedBoard((prev) => ({
                ...prev,
                columns: prev.columns.map((col) =>
                    col._id === column._id
                        ? {
                              ...col,
                              tasks: col.tasks.filter(
                                  (t) => t._id !== task._id
                              ),
                          }
                        : col
                ),
            }));

            // setItems((prev) => {
            //     const updatedColumns = [...prev];

            //     const columnIndex = updatedColumns.findIndex(
            //         (c) => c._id === column._id
            //     );

            //     const updatedTasks = updatedColumns[columnIndex].tasks.filter(
            //         (t) => t._id !== task._id
            //     );

            //     updatedColumns[columnIndex].tasks = updatedTasks;

            //     return updatedColumns;
            // });
        } catch (error) {
            console.error(error);
        }
    }

    function handleTaskChange(event) {
        console.log(event);
        const {name, value, type, checked} = event.target;

        // Handle Assignee box input
        if (type === 'checkbox') {
            if (checked) {
                // add the user to the assignedUserIds array
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    assignedUserIds: [...prevFormData.assignedUserIds, value],
                }));
            } else {
                //  remove the user from the assignedUserIds array
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    assignedUserIds: prevFormData.assignedUserIds.filter(
                        (id) => id !== value
                    ),
                }));
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    }

    return (
        <div>
            <Transition
                show={isSlideOverOpen}
                as='div'
                afterLeave={() => setSelectedTask(null)}
                afterEnter={() => setSelectedTask(task)}
            >
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={handleClose}
                >
                    <div className='fixed inset-0' />

                    <div className='fixed inset-0 overflow-hidden'>
                        <div className='absolute inset-0 overflow-hidden'>
                            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
                                <Transition.Child
                                    as='div'
                                    enter='transform transition ease-in-out duration-500 sm:duration-700'
                                    enterFrom='translate-x-full'
                                    enterTo='translate-x-0'
                                    leave='transform transition ease-in-out duration-500 sm:duration-700'
                                    leaveFrom='translate-x-0'
                                    leaveTo='translate-x-full'
                                >
                                    {/* Adding overflow auto for now to scroll to see comments */}
                                    <Dialog.Panel className='pointer-events-auto w-screen max-w-2xl'>
                                        <div>
                                            <div className='h-screen flex flex-col overflow-y-scroll bg-white shadow-xl'>
                                                <form
                                                    // className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'
                                                    className='basis-1/3'
                                                    onSubmit={handleTaskSubmit}
                                                >
                                                    {/* Header */}
                                                    <div className='bg-gray-50 px-4 py-6 sm:px-6'>
                                                        <div className='flex items-start justify-between space-x-3'>
                                                            <div className='space-y-1'>
                                                                <Dialog.Title className='text-2xl font-semibold leading-6 max-w-sm text-gray-900'>
                                                                    {editingMode ? (
                                                                        <input
                                                                            type='text'
                                                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiaryLight sm:text-sm sm:leading-6'
                                                                            name='taskName'
                                                                            value={
                                                                                formData.taskName
                                                                            }
                                                                            onChange={
                                                                                handleTaskChange
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <div className='text-2xl font-semibold leading-6 truncate text-gray-900'>
                                                                            {
                                                                                formData.taskName
                                                                            }
                                                                            {/* {task.tags} */}
                                                                        </div>
                                                                    )}
                                                                </Dialog.Title>
                                                                <div className='flex'>
                                                                    <p className='text-sm text-gray-500'>
                                                                        in list:{' '}
                                                                        <span className='text-tertiaryLight'>
                                                                            {column
                                                                                ? column.title
                                                                                : ''}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <p className='text-sm text-gray-500 '>
                                                                    Created:{' '}
                                                                    {task
                                                                        ? formatDate(
                                                                              task.created_at
                                                                          )
                                                                        : ''}
                                                                </p>
                                                            </div>

                                                            {!editingMode && (
                                                                <PriorityDisplay
                                                                    level={
                                                                        task
                                                                            ? task.priority
                                                                            : ''
                                                                    }
                                                                />
                                                            )}

                                                            <ActionButtons
                                                                toggleEditMode={
                                                                    toggleEditingMode
                                                                }
                                                                handleDelete={
                                                                    handleTaskDelete
                                                                }
                                                                handleClose={
                                                                    handleClose
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Divider container */}
                                                    <div className='space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0'>
                                                        {/* Assignees */}
                                                        <div className='space-y-2 px-4 flex  sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                            <h3 className='text-sm font-semibold leading-6 text-gray-900'>
                                                                Assignees:
                                                            </h3>

                                                            <div className=' text-sm font-medium leading-6 text-gray-900 '>
                                                                {!editingMode ? (
                                                                    <div className=' text-sm font-medium leading-6 text-gray-900 '>
                                                                        <div className='flex space-x-2'>
                                                                            {assignedUsers.map(
                                                                                (
                                                                                    user
                                                                                ) => (
                                                                                    <ProfileIcon
                                                                                        key={
                                                                                            user._id
                                                                                        }
                                                                                        fullName={
                                                                                            user.fullName
                                                                                        }
                                                                                    />
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <AssigneesList
                                                                        users={
                                                                            selectedBoard.users
                                                                        }
                                                                        assignedUsers={
                                                                            task?.assignedUserIds
                                                                        }
                                                                        formData={
                                                                            formData
                                                                        }
                                                                        onChange={
                                                                            handleTaskChange
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Project description */}
                                                        <TaskDescription
                                                            handleTaskChange={
                                                                handleTaskChange
                                                            }
                                                            taskDetail={
                                                                formData.taskDetail
                                                            }
                                                            editingMode={
                                                                editingMode
                                                            }
                                                        />

                                                        {/* Priority */}
                                                        {editingMode && (
                                                            <PriorityList
                                                                formData={
                                                                    formData
                                                                }
                                                                onChange={
                                                                    handleTaskChange
                                                                }
                                                            />
                                                        )}

                                                        {/* Action buttons */}
                                                        {editingMode && (
                                                            <EditActionButtons
                                                                toggleEditMode={
                                                                    toggleEditingMode
                                                                }
                                                                handleTaskSubmit={
                                                                    handleTaskSubmit
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </form>
                                                {/* Comments */}
                                                {!editingMode && (
                                                    <CommentFeed
                                                        taskId={task?._id}
                                                        taskComments={
                                                            task?.comments
                                                        }
                                                        boardId={
                                                            selectedBoard?._id
                                                        }
                                                        columnId={
                                                            selectedColumnId
                                                        }
                                                        setSelectedBoard={
                                                            setSelectedBoard
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default WorkspaceSlideOver;
