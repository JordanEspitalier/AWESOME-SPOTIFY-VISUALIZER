import { useState } from 'react'
import './search.css'
import SearchDisplayAll from '../components/react/searchDisplay/SearchDisplayAll'
import SearchDisplayArtists from '../components/react/searchDisplay/SearchDisplayArtists'
import SearchDisplayTracks from '../components/react/searchDisplay/SearchDisplayTracks'
import SearchDisplayPlaylists from '../components/react/searchDisplay/SearchDisplayPlaylists'
import SearchDisplayAlbums from '../components/react/searchDisplay/SearchDisplayAlbums'
import SearchDisplayWaiting from '../components/react/searchDisplay/searchDisplayWaiting'

enum SearchTypes
{
    all = 'track,artist,album,playlist',
    artists = 'artist',
    tracks = 'track',
    albums = 'albums',
    playlists = 'playlist'
}

const searchDisplay = (type : SearchTypes, searchQuery : string) => 
{

    if(searchQuery.length === 0) return <SearchDisplayWaiting />
    switch (type) {
        case SearchTypes.all:
            return <SearchDisplayAll searchQuery = {searchQuery}/>
        case SearchTypes.artists:
            return <SearchDisplayArtists searchQuery = {searchQuery}/>
        case SearchTypes.tracks :
            return <SearchDisplayTracks searchQuery = {searchQuery}/>
        case SearchTypes.playlists : 
            return <SearchDisplayPlaylists searchQuery = {searchQuery}/>
        case SearchTypes.albums : 
            return <SearchDisplayAlbums searchQuery = {searchQuery}/>
        default:
            return <div>404</div>
    }
}

export function Search () 
{
    const [searchQuery, setSearchQuery] = useState('')
    const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.all)


/*     const renderTracks = () =>
    {
        return data.tracks.items.map((track: { name: string, id : string}) => (
            <div key={track.id}>
                {track.name}
            </div>
        ))
    } */

    /*     useEffect(()=>
    {

    },[searchQuery]) */


    return(
    <div className="search">
        <form className='search-form'>
            <input className='search-form-input' type='text' onChange={(e)=>setSearchQuery(e.target.value)}></input>
        </form>
        <div className='search-tags-container'>
            <ul className='search-tags'>
                <li className={`search-tag ${searchType === SearchTypes.all && 'active'}`} onClick={ ()=> setSearchType(SearchTypes.all)}>All</li>
                <li className={`search-tag ${searchType === SearchTypes.artists && 'active'}`} onClick={ ()=> setSearchType(SearchTypes.artists)}>Artists</li>
                <li className={`search-tag ${searchType === SearchTypes.tracks && 'active'}`} onClick={ ()=> setSearchType(SearchTypes.tracks)}>Tracks</li>
                <li className={`search-tag ${searchType === SearchTypes.playlists && 'active'}`} onClick={ ()=> setSearchType(SearchTypes.playlists)}>Playlists</li>
                <li className={`search-tag ${searchType === SearchTypes.albums && 'active'}`} onClick={ ()=> setSearchType(SearchTypes.albums)}>Albums</li>
            </ul>
        </div>
        {searchDisplay(searchType, searchQuery)}
    </div>
    ) 
}