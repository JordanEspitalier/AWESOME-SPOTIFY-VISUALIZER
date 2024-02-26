import './navBar.css'

export default function NavBar () 
{

    return (
        <nav className="nav-bar">
            <ul className='menu'>
                <li>Home</li>
                <li>Search</li>
            </ul>
            <div className='library'>
                <div className='library-header'>
                    Library
                </div>

            </div>
        </nav>
    )
}