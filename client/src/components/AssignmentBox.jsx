import {Fragment, useState, useEffect} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid';
import ProfileIcon from './ProfileIcon';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const AssigneesBox = ({usersData, selectedUserId, setSelectedUserId}) => {
    const [selected, setSelected] = useState(selectedUserId);

    const selectedUser = usersData.find((user) => user.id === selected);

    // const [usersData, setUsersData] = useState([]);
    // const [selectedUserId, setSelectedUserId] = useState(usersId[0]);

    // useEffect(() => {
    //     dataService
    //         .getBoardUserNames(boardId)
    //         .then((response) => {
    //             const userData = response.data;
    //             setUsersData(userData);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching user data:', error);
    //         });
    // }, []);

    // const handleSelectUser = (userId) => {
    //     setSelectedUserId(userId); // Update the selected user ID
    // };

    useEffect(() => {
        setSelected(selectedUserId);
    }, [selectedUserId]);

    console.log(selectedUser);

    return (
        <Listbox
            value={selected}
            onChange={(newValue) => {
                setSelected(newValue); // Update local state
                setSelectedUserId(newValue); // Update parent component's state
            }}
        >
            {({open}) => (
                // eslint-disable-next-line react/jsx-fragments
                <div className=''>
                    {/* <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
                        Assigned to
                    </Listbox.Label> */}
                    <div className='relative mt-2'>
                        <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-11 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiaryLight sm:text-sm sm:leading-6'>
                            <span className='flex items-center'>
                                {selectedUser ? (
                                    <>
                                        <ProfileIcon
                                            fullName={`${selectedUser.firstName} ${selectedUser.lastName}`}
                                        />
                                        <span className='ml-3 block truncate'>
                                            {selectedUser.firstName}{' '}
                                            {selectedUser.lastName}
                                        </span>
                                    </>
                                ) : (
                                    'None' // Display "None" if no user is selected
                                )}
                            </span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                                <ChevronUpDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            {/* <select 
                            name="assignedUserIds" 
                            id="assignedUserIds"
                            value={formData.assignedUserIds}
                            onChange={handleTaskChange}
                            > */}
                            <Listbox.Options className='absolute  z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {usersData.map((user) => (
                                    <Listbox.Option
                                        key={user.id}
                                        className={({active, selected}) =>
                                            classNames(
                                                active
                                                    ? 'bg-infoLight text-white'
                                                    : 'text-gray-900',
                                                selected
                                                    ? 'bg-tertiaryLight'
                                                    : '',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={user.id}
                                    >
                                        {({active}) => (
                                            // eslint-disable-next-line react/jsx-fragments
                                            <>
                                                <div className='flex items-center'>
                                                    <ProfileIcon
                                                        fullName={`${user.firstName} ${user.lastName}`}
                                                    />
                                                    <span
                                                        className={classNames(
                                                            selected
                                                                ? 'font-semibold'
                                                                : 'font-normal',
                                                            'ml-3 block truncate'
                                                        )}
                                                    >
                                                        {user.firstName}{' '}
                                                        {user.lastName}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? 'text-white'
                                                                : 'text-tertiaryLight',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className='h-5 w-5'
                                                            aria-hidden='true'
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                            {/* </select> */}
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    );
};

export default AssigneesBox;
