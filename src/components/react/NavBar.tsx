
import { Link } from 'react-router-dom'
import './navBar.css'
import { useEffect, useState } from 'react'
import { getCurrentUserPlaylists } from '../../services/apiRequest/playlist'
import LibraryCard from './cards/LibraryCard'
import { useUserStore } from '../../store/user'
import { getCurrentUserSavedAlbums } from '../../services/apiRequest/albums'

export default function NavBar () 
{
    const [currentUserPlaylists, setCurrentUserPlaylists] = useState<any>()
    const [currentUserSavedAlbums, setCurrentUserSavedAlbums] = useState<any>()
    const curentUserProfile = useUserStore(state => state.curentUserProfile)
    useEffect(()=>
    {

            getCurrentUserPlaylists({})
            .then(data =>{
                setCurrentUserPlaylists(data.items)
            } 
            )
            .catch(error => console.log(error))

            getCurrentUserSavedAlbums({})
            .then(data =>{
                setCurrentUserSavedAlbums(data.items)
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
                <ul className='library-list'>
                    <li>
                        <Link className='libraryCard' to={`/collection`}>
                            <img className='libraryCard-image' src="https://misc.scdn.co/liked-songs/liked-songs-640.png"/>
                                <div className='libraryCard-content'>
                                <div className='libraryCard-content-name'>Liked Tracks</div>
                                <div className='libraryCard-content-type'>Playlist - {'id' in curentUserProfile ? curentUserProfile.id : ''}</div>
                            </div>
                        </Link>

                    </li>
                    {currentUserPlaylists && currentUserPlaylists.map((item : any, index: any) => <li key={item.id}><LibraryCard item={item}/></li>)}
                    {currentUserSavedAlbums && currentUserSavedAlbums.map((item : any, index: any) => <li key={item.album.id}><LibraryCard item={item.album}/></li>)}
                </ul>
            </div>
        </nav>
    )
}