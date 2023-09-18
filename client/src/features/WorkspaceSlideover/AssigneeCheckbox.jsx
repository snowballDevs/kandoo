const AssigneeCheckbox = ({user, onChange, formData}) => {
    const isChecked = formData?.assignedUserIds.includes(user._id);

    return (
        <div key={user._id} className='relative flex items-start'>
            <div className='min-w-0 flex-1 text-sm leading-6'>
                <label
                    htmlFor={`user-${user._id}`}
                    className='select-none font-medium text-gray-900'
                >
                    {user.fullName}
                </label>
            </div>
            <div className='ml-2 flex h-6 items-center'>
                <input
                    id={`user-${user._id}`}
                    name='assignedUserIds'
                    type='checkbox'
                    className='h-4 w-4 rounded-xl border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                    checked={isChecked}
                    onChange={onChange}
                    value={user._id}
                />
            </div>
        </div>
    );
};

export default AssigneeCheckbox;
