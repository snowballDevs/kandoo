import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {ToastContainer, toast} from 'react-toastify';
import dataService from '../services/dataService';
import formatDate from '../utils/formatDate';
import {useModalContext} from '../contexts/ModalContext/ModalContext';
import {
    BsPlus,
    BsLink45Deg,
    BsFillQuestionCircleFill,
    BsXLg,
} from 'react-icons/bs';
import useEditingMode from '../hooks/useEditingMode';
import TextAreaEditor from '../components/textAreaEditor';

import {MdDelete, MdModeEdit, MdFileCopy} from 'react-icons/md';
import Column from '../components/dndcolumn';
import Task from '../components/Task';

const team = [
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Whitney Francis',
        email: 'whitney.francis@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Leonard Krasner',
        email: 'leonard.krasner@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Floyd Miles',
        email: 'floyd.miles@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Emily Selman',
        email: 'emily.selman@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];
const WorkspaceSlideOver = ({
    key,
    taskName,
    taskDetail,
    taskComments,
    tags,
    assignedUserIds,
    columnName,
    createdAt
}) => {
    const {isSlideOverOpen, setIsSlideOverOpen} = useModalContext();

    return (
        <Transition.Root show={isSlideOverOpen} as={Fragment}>
            <Dialog
                Dialog
                as='div'
                className='relative z-10'
                onClose={() => setIsSlideOverOpen(false)}
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
                                <Dialog.Panel className='pointer-events-auto w-screen max-w-2xl'>
                                    <form className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                                        <div className='flex-1'>
                                            {/* Header */}
                                            <div className='bg-gray-50 px-4 py-6 sm:px-6'>
                                                <div className='flex items-start justify-between space-x-3'>
                                                    <div className='space-y-1'>
                                                        <Dialog.Title className='text-2xl font-semibold leading-6 text-gray-900'>
                                                            {taskName} {tags}
                                                        </Dialog.Title>
                                                        <p className='text-sm text-gray-500 flex'>
                                                            in list&nbsp;
                                                            <div className='text-tertiaryLight'>
                                                                {columnName}
                                                            </div>
                                                            
                                                        </p>
                                                        <p className='text-sm text-gray-500 flex'>
                                                        Created: {formatDate(createdAt)}
                                                            
                                                        </p>
                                                    </div>
                                                    <div className='flex h-7 gap-2 items-center'>
                                                        <button
                                                            type='button'
                                                            className='relative text-gray-400 hover:text-gray-500'
                                                            
                                                            onClick={useEditingMode}
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
                                                                setIsSlideOverOpen(
                                                                    false
                                                                )
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
                                                            {assignedUserIds &&
                                                                assignedUserIds.map(
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
                                                        <p
                                                            // id='project-description'
                                                            // name='project-description'
                                                            // rows={3}
                                                            // className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiaryLight sm:text-sm sm:leading-6'
                                                            // defaultValue={''}
                                                            className='text-sm text-gray-500'
                                                        >
                                                            {taskDetail}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Comments */}
                                                <div className='space-y-2 px-4  sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                    <div>
                                                        <label
                                                            htmlFor='project-comments'
                                                            className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'
                                                        >
                                                            Comments{' '}
                                                            {taskComments.length >
                                                            0
                                                                ? taskComments
                                                                : '0'}
                                                        </label>
                                                    </div>
                                                    <p className='text-sm italic text-gray-500 space-y-2 px-4  sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                        {taskComments.length > 0
                                                            ? taskComments
                                                            : // {taskComment.map((comment) => (
                                                              //     <Comment
                                                              //         comment = {taskComments}
                                                              //     />
                                                              //   ))}
                                                              'No comments yet'}
                                                    </p>
                                                    <textarea
                                                        id='project-description'
                                                        name='project-description'
                                                        rows={3}
                                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiaryLight sm:text-sm sm:leading-6'
                                                        defaultValue='Write your comment here'
                                                    />
                                                </div>

                                                {/* Tags */}
                                                <fieldset className='space-y-2 px-4 sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                    <legend className='sr-only'>
                                                        Tags
                                                    </legend>
                                                    <div
                                                        className='text-sm font-medium leading-6 text-gray-900'
                                                        aria-hidden='true'
                                                    >
                                                        Tags
                                                    </div>
                                                    <div className='space-y-5 sm:col-span-2'>
                                                        <div className='space-y-5 sm:mt-0 '>
                                                            <div className='relative items-start sm:col-span-3'>
                                                                <div className='absolute flex h-6 items-center'>
                                                                    <input
                                                                        id='public-access'
                                                                        name='privacy'
                                                                        aria-describedby='public-access-description'
                                                                        type='radio'
                                                                        className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                                                                        defaultChecked
                                                                    />
                                                                </div>
                                                                <div className='pl-7 text-sm leading-6'>
                                                                    <label
                                                                        htmlFor='public-access'
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
                                                                        id='restricted-access'
                                                                        name='privacy'
                                                                        aria-describedby='restricted-access-description'
                                                                        type='radio'
                                                                        className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                                                                    />
                                                                </div>
                                                                <div className='pl-7 text-sm leading-6'>
                                                                    <label
                                                                        htmlFor='restricted-access'
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
                                                                        id='private-access'
                                                                        name='privacy'
                                                                        aria-describedby='private-access-description'
                                                                        type='radio'
                                                                        className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                                                                    />
                                                                </div>
                                                                <div className='pl-7 text-sm leading-6'>
                                                                    <label
                                                                        htmlFor='private-access'
                                                                        className='font-medium text-gray-900'
                                                                    >
                                                                        <span class='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-blue-200 text-xs font-semibold text-blue-600 uppercase'>
                                                                            Low
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr className='border-gray-200' />
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
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                                            <div className='flex justify-end space-x-3'>
                                                <button
                                                    type='button'
                                                    className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                                    onClick={() =>
                                                        setIsSlideOverOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type='submit'
                                                    className='inline-flex justify-center rounded-md bg-tertiaryLight px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-infoLight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiaryLight'
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default WorkspaceSlideOver;
