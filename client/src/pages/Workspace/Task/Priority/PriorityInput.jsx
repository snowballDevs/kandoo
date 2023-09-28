const PriorityInput = ({formData, onChange, priority}) => {
    const priorityStyles = {
        high: 'bg-red-200 text-red-600',
        medium: 'bg-yellow-200 text-yellow-600',
        low: 'bg-blue-200 text-blue-600',
    };

    let priorityStyle = priorityStyles[priority];

    return (
        <div className='relative items-start sm:col-span-3 mr-3'>
            <div className='absolute flex h-6 items-center'>
                <input
                    id={`${priority}-priority`}
                    name='priority'
                    aria-describedby='high-priority-description'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={onChange}
                />
            </div>
            <div className='pl-7 text-sm leading-6'>
                <label
                    htmlFor={`${priority}-priority`}
                    className='font-medium text-gray-900'
                >
                    <span
                        className={`inline-block mr-1 last:mr-0 py-1 px-2 rounded-full  text-xs font-semibold uppercase ${priorityStyle} `}
                    >
                        {priority}
                    </span>
                </label>
            </div>
        </div>
    );
};

export default PriorityInput;
