import {useState} from 'react';
import ProfileIcon from '../components/ProfileIcon';
import {useAuthContext} from '../contexts/AuthContext/authContext';
import dataService from '../services/dataService';

// todo: Create a way to add Comments to a task
// todo:  Create form for comment input, and add submit to server + update state
// todo: Show corresponding comments
// todo: update the total number of comments in the comment title
// todo: make sure to update comments controller to allow dislikes

const taskSample = {
    taskName: 'Task 8-24 postman filler',
    assignedUserIds: [],
    priority: 2,
    tags: [],
    taskDetail: 'This is a test from postman',
    _id: '64e7d4e215fe0c2e1e564a8a',
    created_at: '2023-08-24T22:08:34.757Z',
    comments: [
        {
            description:
                'This is a comment created by postman test 8-24 comment 1',
            createdBy: 'Chris Jin',
            likes: 0,
            _id: '64e7d52515fe0c2e1e564a96',
            commentDate: '2023-08-24T22:09:41.691Z',
        },
        {
            description:
                'This is a comment created by postman test 8-24 comment 2',
            createdBy: 'Chris Jin',
            likes: 0,
            _id: '64e7d52d15fe0c2e1e564aa3',
            commentDate: '2023-08-24T22:09:49.491Z',
        },
    ],
};

const activity = [
    {
        id: 4,
        type: 'commented',
        person: {
            name: 'Chelsea Hagon',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        comment:
            'Called client, they reassured me the invoice would be paid by the 25th.',
        date: '3d ago',
        dateTime: '2023-01-23T15:56',
    },
    {
        id: 5,
        type: 'commented',
        person: {
            name: 'Chelsea Hagon',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        comment:
            'Called client, they reassured me the invoice would be paid by the 25th.',
        date: '3d ago',
        dateTime: '2023-01-23T15:56',
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const CommentFeed = ({task, boardId, columnId}) => {
    const {loggedInUserFirstLast} = useAuthContext();

    const [allComments, setAllComments] = useState(task.comments);

    // comment input form data
    const [commentInput, setCommentInput] = useState({
        description: '',
        createdBy: loggedInUserFirstLast,
    });

    const handleCommentChange = (event) => {
        const {name, value} = event.target;
        setCommentInput((prevComment) => ({
            ...prevComment,
            [name]: value,
        }));
        console.log(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        try {
            // const response = await dataService.createComment(boardId, columnId, task._id, commentInput);
            // console.log(response)
        } catch (error) {
            console.log(error);
        }
        event.stopPropagation();
    };

    return (
        <div>
            <ul className='space-y-6 mt-3 overflow-y-auto'>
                {activity.map((activityItem, activityItemIdx) => (
                    <li key={activityItem.id} className='relative flex gap-x-4'>
                        <div
                            className={classNames(
                                activityItemIdx === activity.length - 1
                                    ? 'h-6'
                                    : '-bottom-6',
                                'absolute left-0 top-0 flex w-6 justify-center'
                            )}
                        >
                            <div className='w-px bg-gray-200' />
                        </div>
                        <div>
                            <div className='ml-5'>
                                <ProfileIcon
                                    firstLastName={activityItem.person.name}
                                />
                            </div>
                            <div className='flex'>
                                <div className='flex-col ml-7 mt-2 justify-center content-center'>
                                    <button
                                        type='button'
                                        className='block rounded-full  px-2 py-2 text-xs font-semibold text-gray-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-4 h-4'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18'
                                            />
                                        </svg>
                                    </button>
                                    <p className='text-sm text-center'>0</p>
                                    <button
                                        type='button'
                                        className='rounded-full px-2 py-2 text-xs font-semibold text-gray-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-4 h-4'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className='flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200 ml-2'>
                                    <div className='flex justify-between gap-x-4'>
                                        <div className='py-0.5 text-xs leading-5 text-gray-500'>
                                            <span className='font-medium text-gray-900'>
                                                {activityItem.person.name}
                                            </span>{' '}
                                            commented
                                        </div>
                                        <time
                                            dateTime={activityItem.dateTime}
                                            className='flex-none py-0.5 text-xs leading-5 text-gray-500'
                                        >
                                            {activityItem.date}
                                        </time>
                                    </div>
                                    <p className='text-sm leading-6 text-gray-500'>
                                        {activityItem.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {/* New comment form */}
            <div className='mt-6 flex gap-x-3'>
                <ProfileIcon firstLastName={loggedInUserFirstLast} />

                <form
                    onSubmit={
                        handleCommentSubmit
                    }
                    className='relative flex-auto'
                >
                    <div className='overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
                        <label htmlFor='description' className='sr-only'>
                            Add your comment
                        </label>
                        <textarea
                            rows={2}
                            name='description'
                            id='description'
                            className='block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            placeholder='Add your comment...'
                            defaultValue=''
                            onChange={handleCommentChange}
                        />
                    </div>

                    <div className='absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
                        <button
                            type='submit'
                            className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        >
                            Comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommentFeed;
