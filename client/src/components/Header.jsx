const Header = () => {
    const Links = [
        {name: 'BOARDS', link: 'landingPage'},
    ]
    
    return (
        <nav className='navbar bg-indigo-600'>
            <div className='flex-1'>
                <a className='btn btn-ghost normal-case text-xl text-slate-50'>KANDOO</a>
            </div>
            <div className='flex-none px-4'>
                <div className='dropdown dropdown-end'>
                    <label
                        tabIndex={0}
                        className='btn px-2 btn-ghost btn-circle avatar'
                    >
                        <div className='w-10 rounded-full ' >
                            <img src='/userplaceholder.png' />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
                    >
                        {Links.map(link => {
                            return (
                                <li key={link.name}>
                                    <button className="btn btn-sm btn-ghost" >{link.name}</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header


