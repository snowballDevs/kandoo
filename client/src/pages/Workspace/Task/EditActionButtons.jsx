const EditActionButtons = ({handleTaskSubmit, toggleEditMode}) => (
    <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
        <div className='flex justify-end space-x-3'>
            <button
                type='button'
                className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                onClick={toggleEditMode}
            >
                Cancel
            </button>
            <button
                type='button'
                className='inline-flex justify-center rounded-md bg-tertiaryLight px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-infoLight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiaryLight'
                onClick={handleTaskSubmit}
            >
                Update
            </button>
        </div>
    </div>
);

export default EditActionButtons;
