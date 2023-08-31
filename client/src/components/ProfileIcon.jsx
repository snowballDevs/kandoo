// expectation is the input is `FirstName LastName` like `Keanu Reeves`
const ProfileIcon = ({firstName, lastName}) => {

    const initials = `${firstName[0]}${lastName[0]}`;

    return (
        <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500'>
            <span className='text-xs font-medium leading-none text-white'>
                {initials}
            </span>
        </span>
    );
};

export default ProfileIcon;
