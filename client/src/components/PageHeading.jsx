const PageHeading = ({currentPage, boardName}) => {
    return (
        <div className='bg-white shadow'>
            <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 flex items-center gap-6'>
                <h1 className='text-lg font-bold tracking-tight text-gray-900 capitalize'>
                    {currentPage}
                </h1>

                {currentPage === 'workspace' && (
                    <h2 className=''>{boardName}</h2>
                )}
            </div>
        </div>
    );
};

export default PageHeading;
