
import { Link } from 'react-router-dom'
import './navBar.css'

export default function NavBar () 
{

    return (
        <nav className="nav-bar">
            <ul className='menu'>
                <li> <Link to={`/`}>Home</Link> </li>
                <li> <Link to={`/search`}>Search</Link></li>
            </ul>
            <div className='library'>
                <div className='library-header'>
                    Library
                </div>

            </div>
        </nav>
    )
}