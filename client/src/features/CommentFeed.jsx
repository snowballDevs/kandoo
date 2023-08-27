import {useState} from 'react';
import ProfileIcon from '../components/ProfileIcon';
import {useAuthContext} from '../contexts/AuthContext/authContext';
import dataService from '../services/dataService';
import formattedDate from '../utils/formatDate';

// todo: Setup Comment Likes
// todo: setup comment deletes

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const CommentFeed = ({taskComments, boardId, columnId, taskId}) => {
    const {loggedInUserFirstLast} = useAuthContext();

    const [allComments, setAllComments] = useState(taskComments);
    console.log(allComments);

    // comment input form data
    const [commentInput, setCommentInput] = useState({
        description: '',
        createdBy: loggedInUserFirstLast,
    });
    // console.log(task)
    // const lookingAtTasks = () => {
    //   console.log(allComments)

    // }
    // lookingAtTasks()

    const addNewComment = (commentInput, dateTime) => {
        setAllComments([
            ...allComments,
            {
                description: commentInput.description,
                createdBy: commentInput.createdBy,
                likes: 0,
                commentDate: dateTime,
            },
        ]);
    };

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
            const response = await dataService.createComment(
                boardId,
                columnId,
                taskId,
                commentInput
            );
            console.log(response);
            // resets comment textarea
            addNewComment(commentInput, Date.now());
            setCommentInput({
                description: '',
                createdBy: loggedInUserFirstLast,
            });
        } catch (error) {
            console.log(error);
        }
        // this stops parent forms from being submitted
        event.stopPropagation();
    };

    return (
        <div className='space-y-2 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5 basis-2/3'>
            <div>
                <h3
                    htmlFor='project-comments'
                    className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5 mb-3'
                >
                    {allComments.length > 0
                        ? `${allComments.length} Comment${
                              allComments.length === 1 ? '' : 's'
                          }`
                        : 'No Comments (Yet)'}
                </h3>
            </div>
            {allComments.length > 0 ? (
                <ul className='min-h-[40%] space-y-6 mt-3 overflow-y-auto'>
                    {allComments.map((comment, commentIdx) => (
                        <li
                            key={comment._id}
                            className='relative flex gap-x-4 my-2'
                        >
                            <div
                                className={classNames(
                                    commentIdx === allComments.length - 1
                                        ? 'h-6'
                                        : '-bottom-6',
                                    'absolute left-0 top-0 flex w-6 justify-center'
                                )}
                            >
                                <div className='w-px bg-gray-200' />
                            </div>
                            <div>
                                <div className='ml-8'>
                                    <ProfileIcon
                                        firstLastName={comment.createdBy}
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
                                    </div>
                                    <div className='flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200 ml-2'>
                                        <div className='flex justify-between gap-x-4'>
                                            <div className='py-0.5 text-xs leading-5 text-gray-500'>
                                                <span className='font-medium text-gray-900'>
                                                    {comment.createdBy}
                                                </span>{' '}
                                                commented
                                            </div>
                                            <time
                                                dateTime={comment.commentDate}
                                                className='flex-none py-0.5 text-xs leading-5 text-gray-500'
                                            >
                                                {formattedDate(
                                                    comment.commentDate
                                                )}
                                            </time>
                                        </div>
                                        <p className='text-sm leading-6 text-gray-500'>
                                            {comment.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='text-sm block text-center p-5'>
                    Be the first to add comments!
                </div>
            )}

            {/* New comment form */}
            <div className='mt-6 flex gap-x-3 pt-4'>
                <ProfileIcon firstLastName={loggedInUserFirstLast} />

                <form
                    onSubmit={handleCommentSubmit}
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
                            onChange={handleCommentChange}
                            // defaultValue=''
                            value={commentInput.description}
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
