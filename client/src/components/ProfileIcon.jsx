import {useContext} from 'react';
import {useAuthContext} from '../contexts/AuthContext/authContext';

const ProfileIcon = () => {
    const {loggedInUserFirstLast} = useAuthContext();
    const initials = loggedInUserFirstLast
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
