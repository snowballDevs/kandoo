const TaskDescription = ({taskDetail, handleTaskChange, editingMode}) => {
    return (
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
                        value={taskDetail}
                        name='taskDetail'
                        onChange={handleTaskChange}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiaryLight sm:text-sm sm:leading-6'
                    />
                ) : (
                    <p className='text-sm text-gray-500'>{taskDetail}</p>
                )}
            </div>
        </div>
    );
};

export default TaskDescription;
