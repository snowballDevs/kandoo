import {useContext} from 'react';
import {useAuthContext} from '../contexts/AuthContext/authContext';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import PageHeading from './PageHeading';

const Header = ({formDisplay}) => {
    const {handleOpen} = useContext(ModalContext);

    const {logout, isAuthenticated} = useAuthContext();

    const {currentPage, setCurrentPage} = useRoutingContext();

    const Links = [];

    const handleLogin = (login) => {
        handleOpen();
        formDisplay(login);
    };

    if (isAuthenticated) {
        Links.push({
            name: 'DASHBOARD',
            onClick: () => setCurrentPage('dashboard'),
        }),
            Links.push({name: 'LOGOUT', onClick: logout});
    } else {
        Links.push({name: 'LOGIN', onClick: () => handleLogin('login')});
    }

    return (
        <header className='bg-tertiaryLight'>
            <nav className='navbar max-w-7xl mx-auto'>
                <div className='flex-1'>
                    <a
                        className='btn btn-ghost normal-case text-xl text-primaryLight'
                        href='https://github.com/snowballDevs/kandoo'
                    >
                        KANDOO
                    </a>
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <h3
                    className="inline-flex capitalize items-center px-1 pt-1 text-md font-medium text-gray-900"
                  >
                    {currentPage !== 'landingPage' && currentPage}
                  </h3>
                  
                </div>
                {/* user profile icon */}
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
                        <ul className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-primaryLight rounded-box w-52'>
                            {Links.map((link) => (
                                <li key={link.name}>
                                    <button
                                        data-modal='modal-login'
                                        type='button'
                                        className='btn btn-sm btn-ghost text-secondaryLight'
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

            {/* {currentPage !== 'landingPage' && (
                <PageHeading currentPage={currentPage} />
            )} */}
        </header>
    );
};

export default Header;
