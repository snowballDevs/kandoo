import PriorityInput from './PriorityInput';

const PriorityList = ({formData, onChange}) => {
    const priorities = ['high', 'medium', 'low'];

    return (
        <fieldset className='space-y-2 px-4 sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
            <legend className='sr-only'>Priority</legend>
            <div
                className='text-sm font-semibold leading-6 text-gray-900'
                aria-hidden='true'
            >
                Priority:
            </div>
            <div className='space-y-5 sm:col-span-2'>
                <div className=' flex sm:mt-0'>
                    {priorities.map((priority) => (
                        <PriorityInput
                            onChange={onChange}
                            formData={formData}
                            priority={priority}
                            key={priority}
                        />
                    ))}
                </div>
            </div>
        </fieldset>
    );
};

export default PriorityList;
