import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {useModalContext} from '../contexts/ModalContext/ModalContext';

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
const WorkspaceSlideOver = (boardInfo) => {
    const {isSlideOverOpen, setIsSlideOverOpen} = useModalContext();
    console.log(boardInfo)
    return (
        <Transition.Root show={isSlideOverOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => setIsSlideOverOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
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
                                                        <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
                                                            New project
                                                        </Dialog.Title>
                                                        <p className='text-sm text-gray-500'>
                                                            Get started by
                                                            filling in the
                                                            information below to
                                                            create your new
                                                            project.
                                                        </p>
                                                    </div>
                                                    <div className='flex h-7 items-center'>
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
                                                            <XMarkIcon
                                                                className='h-6 w-6'
                                                                aria-hidden='true'
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider container */}
                                            <div className='space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0'>
                                                {/* Project name */}
                                                <div className='space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                    <div>
                                                        <label
                                                            htmlFor='project-name'
                                                            className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'
                                                        >
                                                            Task Name
                                                        </label>
                                                    </div>
                                                    <div className='sm:col-span-2'>
                                                        <input
                                                            type='text'
                                                            name='project-name'
                                                            id='project-name'
                                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                        />
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
                                                    <div className='sm:col-span-2'>
                                                        <textarea
                                                            id='project-description'
                                                            name='project-description'
                                                            rows={3}
                                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            defaultValue=''
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className='font-medium text-gray-900'>
                                                        Description
                                                    </h3>
                                                    <div className='mt-2 flex items-center justify-between'>
                                                        <p className='text-sm italic text-gray-500'>
                                                            Add a description to
                                                            this image.
                                                        </p>
                                                        <button
                                                            type='button'
                                                            className='relative -mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                                        >
                                                            <span className='absolute -inset-1.5' />
                                                            {/* <PencilIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                            <span className='sr-only'>
                                                                Add description
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Team members */}
                                                <div className='space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                    <div>
                                                        <h3 className='text-sm font-medium leading-6 text-gray-900'>
                                                            Team Members
                                                        </h3>
                                                    </div>
                                                    <div className='sm:col-span-2'>
                                                        <div className='flex space-x-2'>
                                                            {team.map(
                                                                (person) => (
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
                                                                className='relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                                            >
                                                                <span className='absolute -inset-2' />
                                                                <span className='sr-only'>
                                                                    Add team
                                                                    member
                                                                </span>
                                                                {/* <PlusIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                    className='inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                >
                                                    Create
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
