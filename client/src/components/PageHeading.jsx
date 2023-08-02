const PageHeading = ({currentPage}) => {
    return (
        <div class='bg-white shadow'>
            <div class='mx-auto max-w-7xl px-4 py-4 sm:px-6'>
                <h1 class='text-lg font-bold tracking-tight text-gray-900 capitalize'>
                    {currentPage}
                </h1>
            </div>
        </div>
    );
};

export default PageHeading;
