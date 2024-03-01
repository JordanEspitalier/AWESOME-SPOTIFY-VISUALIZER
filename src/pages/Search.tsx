import SearchDisplayWaiting from '../components/react/searchDisplay/SearchDisplayWaiting'
import './search.css'
import { Link, Outlet, useMatch, useNavigate, useParams } from 'react-router-dom'


export default function Search () 
{
    const {query, type} = useParams()
    const navigate = useNavigate()          

    return(
    <div className={`search ${query?.length ? '' : 'animate'}`}>
        <form className='search-form' method='get'>
            <input value={query ? query : ''} className='search-form-input' type='text' onChange={(e)=>navigate(`/search${e.target.value ? '/' + e.target.value : ''}${type === undefined ? '' : `/${type}`}`, {replace : true})} />
        </form>
        <div className='search-tags-container' style={query?.length ? {visibility : 'visible'} :  {visibility : 'hidden'}}>
            <ul className='search-tags'>
                <li className={`search-tag ${useMatch('/search/:query') && 'active'}`}>
                    <Link to={`/search/${query}`} replace>All</Link>
                </li>
                <li className={`search-tag ${useMatch('/search/:query/artists') && 'active'}`}>
                    <Link to={`/search/${query}/artists`} replace>Artists</Link>
                </li>
                <li className={`search-tag ${useMatch('/search/:query/tracks') && 'active'}`}>
                    <Link to={`/search/${query}/tracks`} replace>Tracks</Link>
                </li>
                <li className={`search-tag ${useMatch('/search/:query/playlists') && 'active'}`}>
                    <Link to={`/search/${query}/playlists`} replace>Playlists</Link>
                </li>
                <li className={`search-tag ${useMatch('/search/:query/albums') && 'active'}`}>
                    <Link to={`/search/${query}/albums`} replace>Albums</Link>
                </li>
            </ul>
        </div>
        <div className='search-results'>
            {query?.length ? <Outlet /> : <SearchDisplayWaiting />}
        </div>
    </div>
    ) 
}