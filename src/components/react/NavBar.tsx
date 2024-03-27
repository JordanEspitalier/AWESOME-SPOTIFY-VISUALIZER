
import { Link } from 'react-router-dom'
import './navBar.css'
import { useEffect, useState } from 'react'
import { getCurrentUserPlaylists } from '../../services/apiRequest/user'

export default function NavBar () 
{
    const [currentUserPlaylists, setCurrentUserPlaylists] = useState<any>()
    useEffect(()=>
    {

            getCurrentUserPlaylists({})
            .then(data =>{
                setCurrentUserPlaylists(data.items)
            } 
            )
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
                    <li key={'kdjsmlk'}><Link to={`/collection`}>Liked Tracks</Link></li>
                    {currentUserPlaylists && currentUserPlaylists.map((item : any, index: any) => <li key={item.id}><Link to={`/playlist/${item.id}`}>{item.name}</Link></li>)}
                </ul>
            </div>
        </nav>
    )
}