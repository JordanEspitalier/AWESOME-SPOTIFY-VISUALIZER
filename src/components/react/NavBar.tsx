
import { Link } from 'react-router-dom'
import './navBar.css'
import { useUserStore } from '../../store/user'
import { useEffect, useState } from 'react'
import { getCurrentUserPlaylists, getCurrentUserSavedTracks } from '../../services/apiRequest/user'

export default function NavBar () 
{
    const [currentUserPlaylists, setCurrentUserPlaylists] = useState<any>()
    
    useEffect(()=>
    {
        getCurrentUserPlaylists()
        .then(data => setCurrentUserPlaylists(data))
        .catch(error => console.log(error))
    },[])
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
                <ul>
                    <li><Link to={`/collection`}>Liked Tracks</Link></li>
                </ul>
            </div>
        </nav>
    )
}