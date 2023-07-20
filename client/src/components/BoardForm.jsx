const BoardForm = () => {
    return (
        <div className='mb-4'>
            <label
                htmlFor='email'
                className='block text-white-700 font-bold mb-2'
            >
                Email:
                <input
                    type='email'
                    id='email'
                    className='w-full border border-gray-300 p-2 rounded-md'
                />
            </label>
        </div>
    );
};

export default BoardForm;
