import {Fragment, useState, useEffect, forwardRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
// import {ToastContainer, toast} from 'react-toastify';
import {BsPlus, BsXLg} from 'react-icons/bs';
import {MdModeEdit} from 'react-icons/md';
import dataService from '../../services/dataService';
import formatDate from '../../utils/formatDate';
import {useModalContext} from '../../contexts/ModalContext/ModalContext';
import {useSelectedBoardContext} from '../../contexts/BoardContext/boardContext';
import CommentFeed from '../CommentFeed';
import PriorityDisplay from './PriorityDisplay';
import TaskDescription from './TaskDescription';
import EditActionButtons from './EditActionButtons';
import ActionButtons from './ActionButtons';

const WorkspaceSlideOver = ({boardInfo}) => {
    const {isSlideOverOpen, setIsSlideOverOpen, handleSlideOver} =
        useModalContext();
    const {
        selectedTaskId,
        selectedColumnId,
        selectedBoard,
        setSelectedTask,
        items,
        setItems,
        setSelectedColumn,
        setSelectedBoard,
    } = useSelectedBoardContext();
    const [editingMode, setEditingMode] = useState(false);
    console.log(selectedTaskId);
    console.log(items.find((col) => col._id === selectedColumnId));
    const column = items.find((column) => column._id === selectedColumnId);
    const task = column?.tasks.find((task) => task._id === selectedTaskId);

    console.log(task);

    console.log(column);

    const [formData, setFormData] = useState({
        taskName: task?.taskName || '',
        taskDetail: task?.taskDetail || '',
        priority: task?.priority || '',
    });

    const toggleEditingMode = () => {
        setEditingMode(!editingMode);
    };

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
            console.log(updatedTask);

            setSelectedBoard((prev) => ({
                ...prev,
                columns: prev.columns.map((col) =>
                    col._id === column._id
                        ? {
                              ...col,
                              tasks: col.tasks.map((task) =>
                                  task._id === updatedTask._id
                                      ? updatedTask
                                      : task
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
            const response = await dataService.deleteTask(
                selectedBoard._id,
                column._id,
                task._id
            );
            console.log(response);

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

    function handleClose() {
        handleSlideOver();
    }

    const clearTaskOnClose = () => {
        setIsSlideOverOpen(false);
        setSelectedTask(null);
        setSelectedColumn(null);
    };

    function handleTaskChange(event) {
        // setIsDirty(true);
        console.log(event);
        const {name, value, type, checked} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
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
                                                        <div className='space-y-2 px-4 flex sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                            <div>
                                                                <h3 className='text-sm font-medium leading-6 text-gray-900'>
                                                                    Assignees:
                                                                </h3>
                                                            </div>
                                                            <div className='sm:col-span-2 text-sm font-medium leading-6 text-gray-900 '>
                                                                <div className='flex space-x-2'>
                                                                    {task?.assignedUserIds &&
                                                                        task.assignedUserIds.map(
                                                                            (
                                                                                person
                                                                            ) => (
                                                                                <a
                                                                                    key={
                                                                                        person.email
                                                                                    }
                                                                                    href={
                                                                                        person.href
                                                                                    }
                                                                                    className='flex-shrink-0 rounded-full hover:opacity-75'
                                                                                >
                                                                                    <img
                                                                                        className='inline-block h-8 w-8 rounded-full'
                                                                                        src={
                                                                                            person.imageUrl
                                                                                        }
                                                                                        alt={
                                                                                            person.name
                                                                                        }
                                                                                    />
                                                                                </a>
                                                                            )
                                                                        )}

                                                                    <button
                                                                        type='button'
                                                                        className='relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-infoLight focus:ring-offset-2'
                                                                    >
                                                                        <span className='absolute -inset-2' />
                                                                        <span className='sr-only'>
                                                                            Add
                                                                            team
                                                                            member
                                                                        </span>
                                                                        <BsPlus
                                                                            className='h-5 w-5'
                                                                            aria-hidden='true'
                                                                        />
                                                                    </button>
                                                                </div>
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
                                                            <fieldset className='space-y-2 px-4 sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                                <legend className='sr-only'>
                                                                    Priority
                                                                </legend>
                                                                <div
                                                                    className='text-sm font-medium leading-6 text-gray-900'
                                                                    aria-hidden='true'
                                                                >
                                                                    Priority
                                                                </div>
                                                                <div className='space-y-5 sm:col-span-2'>
                                                                    <div className=' flex sm:mt-0'>
                                                                        <div className='relative items-start sm:col-span-3 mr-3'>
                                                                            <div className='absolute flex h-6 items-center'>
                                                                                <input
                                                                                    id='high-priority'
                                                                                    name='priority'
                                                                                    aria-describedby='high-priority-description'
                                                                                    type='radio'
                                                                                    className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                                                                                    value='high'
                                                                                    checked={
                                                                                        formData.priority ===
                                                                                        'high'
                                                                                    }
                                                                                    onChange={
                                                                                        handleTaskChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className='pl-7 text-sm leading-6'>
                                                                                <label
                                                                                    htmlFor='high-priority'
                                                                                    className='font-medium text-gray-900'
                                                                                >
                                                                                    <span className='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-red-200 text-xs font-semibold text-red-600 uppercase'>
                                                                                        High
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className='relative flex items-start'>
                                                                            <div className='absolute flex h-6 items-center'>
                                                                                <input
                                                                                    id='medium-priority'
                                                                                    name='priority'
                                                                                    aria-describedby='medium-priority-description'
                                                                                    type='radio'
                                                                                    className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                                                                                    value='medium'
                                                                                    checked={
                                                                                        formData.priority ===
                                                                                        'medium'
                                                                                    }
                                                                                    onChange={
                                                                                        handleTaskChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className='pl-7 text-sm leading-6 mr-3'>
                                                                                <label
                                                                                    htmlFor='medium-priority'
                                                                                    className='font-medium text-gray-900'
                                                                                >
                                                                                    <span className='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-yellow-200 text-xs font-semibold text-yellow-600 uppercase'>
                                                                                        Medium
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className='relative flex items-start'>
                                                                            <div className='absolute flex h-6 items-center'>
                                                                                <input
                                                                                    id='low-priority'
                                                                                    name='priority'
                                                                                    aria-describedby='low-priority-description'
                                                                                    type='radio'
                                                                                    className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                                                                                    value='low'
                                                                                    onChange={
                                                                                        handleTaskChange
                                                                                    }
                                                                                    checked={
                                                                                        formData.priority ===
                                                                                        'low'
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className='pl-7 text-sm leading-6'>
                                                                                <label
                                                                                    htmlFor='low-priority'
                                                                                    className='font-medium text-gray-900'
                                                                                >
                                                                                    <span className='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-blue-200 text-xs font-semibold text-blue-600 uppercase'>
                                                                                        Low
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Saving for Post MVP */}

                                                                    {/* <hr className='border-gray-200' /> 
                                                        <div className='flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
                                                            <div>
                                                                <a
                                                                    href='#'
                                                                    className='group flex items-center space-x-2.5 text-sm font-medium text-tertiaryLight hover:text-secondaryLight'
                                                                >
                                                                    <BsLink45Deg
                                                                        className='h-5 w-5 text-infoLight group-hover:text-secondaryLight'
                                                                        aria-hidden='true'
                                                                    />
                                                                    <span>
                                                                        Copy
                                                                        link
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href='#'
                                                                    className='group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900'
                                                                >
                                                                    <BsFillQuestionCircleFill
                                                                        className='h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                                                        aria-hidden='true'
                                                                    />
                                                                    <span>
                                                                        Learn
                                                                        more
                                                                        about
                                                                        sharing
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div> */}
                                                                </div>
                                                            </fieldset>
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
                                                {/* {!editingMode && (
                                                <CommentFeed
                                                    taskId={task._id}
                                                    taskComments={task.comments}
                                                    boardId={selectedBoard._id}
                                                    columnId={column._id}
                                                />
                                            )} */}
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