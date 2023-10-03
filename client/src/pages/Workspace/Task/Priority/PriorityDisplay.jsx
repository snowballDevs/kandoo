const PriorityDisplay = ({level}) => {
    let className;
    let text;
    switch (level) {
        case 'high':
            className = 'bg-red-200 text-red-600';
            text = 'High';
            break;
        case 'medium':
            className = 'bg-yellow-200 text-yellow-600';
            text = 'Medium';
            break;
        default:
            className = 'bg-blue-200 text-blue-600';
            text = 'Low';
    }

    return (
        <div className='text-sm'>
            <span className='mr-2 font-semibold'>Priority:</span>
            <span
                className={`inline-block mr-1 last:mr-0 py-1 px-2 rounded-full text-xs font-semibold uppercase ${className}`}
            >
                {text}
            </span>
        </div>
    );
};
export default PriorityDisplay;
