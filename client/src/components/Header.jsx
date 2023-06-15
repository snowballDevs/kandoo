const Header = () => {

    return (
        <header className="w-full">
            <nav className="flex justify-between py-5 px-10 ">
                <div>
                    <h2>KANDOO</h2>
                </div>

                <div>
                    <ul className="flex gap-4">
                        <li>Your Boards</li>
                        <li>Sign In/Out</li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header