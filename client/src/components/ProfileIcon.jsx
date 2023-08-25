// expectation is the input is `FirstName LastName` like `Keanu Reeves`
const ProfileIcon = ({firstLastName}) => {

    const initials = firstLastName
        .split(' ')
        .map((n) => n[0])
        .join('');
    return (
        <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500'>
            <span className='text-xs font-medium leading-none text-white'>
                {initials}
            </span>
        </span>
    );
};

export default ProfileIcon;
