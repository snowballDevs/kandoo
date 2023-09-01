import {Fragment, useState, useEffect } from 'react';
import {Dialog, Transition} from '@headlessui/react';
// import {ToastContainer, toast} from 'react-toastify';
import {BsPlus, BsXLg} from 'react-icons/bs';
import {MdModeEdit} from 'react-icons/md';
import dataService from '../services/dataService';
import formatDate from '../utils/formatDate';
import {useModalContext} from '../contexts/ModalContext/ModalContext';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext'
import CommentFeed from './CommentFeed';

const WorkspaceSlideOver = ({
  boardInfo, 
  taskInfo, 
  columnInfo,
}) => {
    const {isSlideOverOpen, setIsSlideOverOpen} = useModalContext();
    const {setSelectedTask, setSelectedColumn, setSelectedComments, selectedComments, } = useSelectedBoardContext();
    const [editingMode, setEditingMode] = useState(false);
    
    const [formData, setFormData] = useState({
      taskName: taskInfo.taskName,
      taskDetail: taskInfo.taskDetail,
      priority: taskInfo.priority,
    });

    const toggleEditingMode = () => {
        setEditingMode(!editingMode);
    };

    async function handleTaskSubmit(event) {
        event.preventDefault();
        try {
            const response = await dataService.updateTask(
                boardInfo._id,
                columnInfo._id,
                taskInfo._id,
                formData
            );
            console.log(response);
            //   setIsDirty(false);
            toggleEditingMode();
        } catch (error) {
            console.error(error);
        }
    }

    const clearTaskOnClose = () => {
      setSelectedTask(null)
      setSelectedColumn(null)
      setSelectedComments(null)
      setIsSlideOverOpen(false)
    }

    

    function handleTaskChange(event) {
        // setIsDirty(true);
        console.log(event);
        const {name, value, type, checked} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    const priorityDisplay = (level) => {
        if (level === 'high') {
            return (
                <span className='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-red-200 text-xs font-semibold text-red-600 uppercase'>
                    High
                </span>
            );
        }
        if (level === 'low') {
            return (
                <span className='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-blue-200 text-xs font-semibold text-blue-600 uppercase'>
                    Low
                </span>
            );
        }
        return (
            <span className='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-yellow-200 text-xs font-semibold text-yellow-600 uppercase'>
                Medium
            </span>
        );
    };

    return (
        <Transition appear show={isSlideOverOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => clearTaskOnClose()}
            >
                <div className='fixed inset-0' />

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
                            <Transition.Child
                                as={Fragment}
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
                                                            <Dialog.Title className='text-2xl font-semibold leading-6 text-gray-900'>
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
                                                                    <div className='text-2xl font-semibold leading-6 text-gray-900'>
                                                                        {
                                                                            formData.taskName
                                                                        }
                                                                        {/* {taskInfo.tags} */}
                                                                    </div>
                                                                )}
                                                            </Dialog.Title>
                                                            <div className='flex'>
                                                                <p className='text-sm text-gray-500'>
                                                                    in list:{' '}
                                                                    <span className='text-tertiaryLight'>
                                                                        {
                                                                            columnInfo.title
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <p className='text-sm text-gray-500 '>
                                                                Created:{' '}
                                                                {formatDate(
                                                                    taskInfo.created_at
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className='text-sm'>
                                                            {editingMode ===
                                                                false &&
                                                                priorityDisplay(
                                                                    formData.priority
                                                                )}
                                                        </div>
                                                        <div className='flex h-7 gap-2 items-center'>
                                                            <button
                                                                type='button'
                                                                className='relative text-gray-400 hover:text-gray-500'
                                                                onClick={
                                                                    toggleEditingMode
                                                                }
                                                            >
                                                                <span className='absolute -inset-2.5' />
                                                                <span className='sr-only'>
                                                                    Edit panel
                                                                </span>
                                                                <MdModeEdit
                                                                    className='h-5 w-5'
                                                                    aria-hidden='true'
                                                                />
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className='relative text-gray-400 hover:text-gray-500'
                                                                onClick={() =>
                                                                  clearTaskOnClose()
                                                                }
                                                            >
                                                                <span className='absolute -inset-2.5' />
                                                                <span className='sr-only'>
                                                                    Close panel
                                                                </span>
                                                                <BsXLg
                                                                    className='h-6 w-6'
                                                                    aria-hidden='true'
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Divider container */}
                                                <div className='space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0'>
                                                    {/* Assignees */}
                                                    <div className='space-y-2 px-4 flex sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                        <div>
                                                            <h3 className='text-sm font-medium leading-6 text-gray-900'>
                                                                Assignees
                                                            </h3>
                                                        </div>
                                                        <div className='sm:col-span-2 text-sm font-medium leading-6 text-gray-900 '>
                                                            <div className='flex space-x-2'>
                                                                {taskInfo.assignedUserIds &&
                                                                    taskInfo.assignedUserIds.map(
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
                                                                        Add team
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
                                                    <div className='space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                        <div>
                                                            <label
                                                                htmlFor='project-description'
                                                                className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'
                                                            >
                                                                Description
                                                            </label>
                                                        </div>
                                                        <div className='sm:col-span-3'>
                                                            {editingMode ? (
                                                                <textarea
                                                                    type='text'
                                                                    rows={3}
                                                                    value={
                                                                        formData.taskDetail
                                                                    }
                                                                    name='taskDetail'
                                                                    onChange={
                                                                        handleTaskChange
                                                                    }
                                                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiaryLight sm:text-sm sm:leading-6'
                                                                />
                                                            ) : (
                                                                <p className='text-sm text-gray-500'>
                                                                    {
                                                                        formData.taskDetail
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Priority */}
                                                    {editingMode === true && (
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
                                                        <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                                                            <div className='flex justify-end space-x-3'>
                                                                <button
                                                                    type='button'
                                                                    className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                                                    onClick={() => {
                                                                        // Reset changes
                                                                        setEditingMode(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    type='button'
                                                                    className='inline-flex justify-center rounded-md bg-tertiaryLight px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-infoLight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiaryLight'
                                                                    onClick={
                                                                        handleTaskSubmit
                                                                    }
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </form>
                                            {/* Comments */}
                                            {editingMode === false && (
                                                <CommentFeed
                                                    taskId={taskInfo._id}
                                                    taskComments={taskInfo.comments}
                                                    boardId={boardInfo._id}
                                                    columnId={columnInfo._id}
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
    );
};

export default WorkspaceSlideOver;
