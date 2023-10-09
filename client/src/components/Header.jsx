/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-fragments */
import {useContext, Fragment} from 'react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {useAuthContext} from '../contexts/AuthContext/authContext';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import ProfileIcon from './ProfileIcon';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Header = ({formDisplay}) => {
    const {handleOpen} = useContext(ModalContext);

    const {logout, user} = useAuthContext();

    const {currentPage, setCurrentPage} = useRoutingContext();

    const Links = [];

    const handleLogin = (login) => {
        handleOpen();
        formDisplay(login);
    };

    if (user) {
        Links.push({
            name: 'DASHBOARD',
            onClick: () => setCurrentPage('dashboard'),
        });
        Links.push({name: 'LOGOUT', onClick: logout});
    } else {
        Links.push({name: 'LOGIN', onClick: () => handleLogin('login')});
    }

    // const oldCode = () => (
    //     <header className='bg-tertiaryLight'>
    //         <nav className='navbar max-w-7xl mx-auto'>
    //             <div className='flex-1'>
    //                 <button
    //                     type='button'
    //                     className='btn btn-ghost normal-case text-xl text-primaryLight'
    //                     onClick={() => setCurrentPage('landingPage')}
    //                 >
    //                     KANDOO
    //                 </button>
    //             </div>
    //             <div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
    //                 {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
    //                 <h3 className='inline-flex capitalize items-center px-1 pt-1 text-md font-semibold text-gray-900'>
    //                     {currentPage !== 'landingPage' && currentPage}
    //                 </h3>
    //             </div>
    //             {/* user profile icon */}
    //             <div className='flex-none px-4'>
    //                 <div className='dropdown dropdown-end'>
    //                     <button
    //                         type='button'
    //                         tabIndex={0}
    //                         className='btn px-2 btn-ghost btn-circle avatar'
    //                     >
    //                         <div className='w-8 rounded-full '>
    //                             {user ? (
    //                                 <ProfileIcon fullName={user.fullName} />
    //                             ) : (
    //                                 <img
    //                                     src='/userplaceholder.png'
    //                                     alt='user profile'
    //                                 />
    //                             )}
    //                         </div>
    //                     </button>
    //                     <ul className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-primaryLight rounded-box w-52'>
    //                         {Links.map((link) => (
    //                             <li key={link.name}>
    //                                 <button
    //                                     data-modal='modal-login'
    //                                     type='button'
    //                                     className='btn btn-sm btn-ghost text-secondaryLight'
    //                                     onClick={
    //                                         link.onClick ? link.onClick : null
    //                                     }
    //                                 >
    //                                     {link.name}
    //                                 </button>
    //                             </li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             </div>
    //         </nav>
    //     </header>
    // );

    return (
        <Disclosure as='nav' className='bg-tertiaryLight'>
            {({open}) => (
                <>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                        <div className='flex h-16 items-center justify-between'>
                            <div className='flex items-center'>
                                <div className='flex-shrink-0'>
                                    <button
                                        type='button'
                                        className=' normal-case text-xl text-primaryLight'
                                        onClick={() =>
                                            setCurrentPage('landingPage')
                                        }
                                    >
                                        KANDOO
                                    </button>
                                </div>
                            </div>
                            <div className='hidden sm:ml-6 sm:block'>
                                <div className='flex items-center'>
                                    {currentPage !== 'landingPage' && (
                                        <div className='sm:inline-block lg:ml-6 lg:flex lg:space-x-8'>
                                            <h3 className='inline-flex capitalize items-center px-1 pt-1 text-md font-semibold text-gray-900'>
                                                {currentPage}
                                            </h3>
                                        </div>
                                    )}

                                    {/* Profile dropdown */}
                                    <Menu as='div' className='relative ml-3'>
                                        <div>
                                            <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                                <span className='absolute -inset-1.5' />
                                                <span className='sr-only'>
                                                    Open user menu
                                                </span>

                                                {user ? (
                                                    <ProfileIcon
                                                        fullName={user.fullName}
                                                    />
                                                ) : (
                                                    <img
                                                        src='/userplaceholder.png'
                                                        alt='user profile'
                                                        className='h-8 w-8 rounded-full'
                                                    />
                                                )}
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter='transition ease-out duration-100'
                                            enterFrom='transform opacity-0 scale-95'
                                            enterTo='transform opacity-100 scale-100'
                                            leave='transition ease-in duration-75'
                                            leaveFrom='transform opacity-100 scale-100'
                                            leaveTo='transform opacity-0 scale-95'
                                        >
                                            <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                {Links.map((link) => (
                                                    <Menu.Item key={link.name}>
                                                        {({active}) => (
                                                            <a
                                                                href='#'
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100'
                                                                        : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 font-semibold'
                                                                )}
                                                                onClick={
                                                                    link.onClick
                                                                        ? link.onClick
                                                                        : null
                                                                }
                                                            >
                                                                {link.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                            <div className='-mr-2 flex sm:hidden'>
                                {/* Mobile menu button */}
                                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    <span className='absolute -inset-0.5' />
                                    <span className='sr-only'>
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='border-t border-gray-700 pb-3 pt-4'>
                            <div className='flex items-center px-5 sm:items-end'>
                                <div className='flex-shrink-0  '>
                                    {user ? (
                                        <ProfileIcon fullName={user.fullName} />
                                    ) : null}
                                </div>
                                {user && (
                                    <div className='ml-3'>
                                        <div className='text-base font-semibold text-secondaryLight'>
                                            {user.fullName}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='mt-3 space-y-1 px-2'>
                                <ul>
                                    {Links.map((link) => (
                                        <Disclosure.Button
                                            as='a'
                                            href='#'
                                            className='block rounded-md px-3 py-2 text-base font-medium text-secondaryLight'
                                            key={link.name}
                                            onClick={
                                                link.onClick
                                                    ? link.onClick
                                                    : null
                                            }
                                        >
                                            {link.name}
                                        </Disclosure.Button>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Header;
