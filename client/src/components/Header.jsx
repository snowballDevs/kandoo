import { useContext } from 'react';
import {useAuthContext} from '../contexts/AuthContext/authContext'
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import PageHeading from './PageHeading';

const Header = () => {

    const {handleModal, isModalOpen, handleClose, handleOpen} =
    useContext(ModalContext);

    const {login, logout, isAuthenticated} = useAuthContext();

    const {currentPage} = useRoutingContext();

    const Links = [{name: 'BOARDS', link: 'landingPage'}];

    if (isAuthenticated) {
        Links.push({name: 'LOGOUT', onClick: logout});
    } else {
        Links.push({name: 'LOGIN', onClick: handleOpen});
    }

    return (
        <header className='bg-indigo-600'>
            <nav className='navbar max-w-7xl mx-auto'>
                <div className='flex-1'>
                    <a
                        className='btn btn-ghost normal-case text-xl text-slate-50'
                        href='https://github.com/snowballDevs/kandoo'
                    >
                        KANDOO
                    </a>
                </div>
                <div className='flex-none px-4'>
                    <div className='dropdown dropdown-end'>
                        <button
                            type='button'
                            tabIndex={0}
                            className='btn px-2 btn-ghost btn-circle avatar'
                        >
                            <div className='w-10 rounded-full '>
                                <img
                                    src='/userplaceholder.png'
                                    alt='user profile'
                                />
                            </div>
                        </button>
                        <ul className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
                            {Links.map((link) => (
                                <li key={link.name}>
                                    <button
                                        type='button'
                                        className='btn btn-sm btn-ghost'
                                        onClick={
                                            link.onClick ? link.onClick : null
                                        }
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            {currentPage !== 'landingPage' && (
                <PageHeading currentPage={currentPage} />
            )}
        </header>
    );
};

export default Header;
