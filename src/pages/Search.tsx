import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import './search.css'
import { searchForItems } from '../services/apiRequest/search'
import SearchDisplayAll from '../components/react/searchDisplay/SearchDisplayAll'
import SearchDisplayArtists from '../components/react/searchDisplay/SearchDisplayArtists'
import SearchDisplayTracks from '../components/react/searchDisplay/SearchDisplayTracks'
import SearchDisplayPlaylists from '../components/react/searchDisplay/SearchDisplayPlaylists'
import SearchDisplayAlbums from '../components/react/searchDisplay/SearchDisplayAlbums'

enum SearchTypes
{
    all = 'track,artist,album,playlist',
    artists = 'artist',
    tracks = 'track',
    albums = 'albums',
    playlists = 'playlist'
}

export function Search () 
{
    const [data, setData] = useState<any>()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.all)
    const [albums, setAlbums] = useState<any>()
    const [artists, setArtists] = useState<any>()
    const [tracks, setTracks] = useState<any>()
    const [playlists, setPlaylist] = useState<any>()

    const renderTracks = () =>
    {
        return data.tracks.items.map((track: { name: string, id : string}) => (
            <div key={track.id}>
                {track.name}
            </div>
        ))
    }
    const searchDisplay = (type : SearchTypes) => 
    {
        switch (type) {
            case SearchTypes.all:
                return <SearchDisplayAll />
            case SearchTypes.artists:
                return <SearchDisplayArtists />
            case SearchTypes.tracks :
                return <SearchDisplayTracks />
            case SearchTypes.playlists : 
                return <SearchDisplayPlaylists />
            case SearchTypes.albums : 
                return <SearchDisplayAlbums/>
            default:
                return <div>Nothing to display</div>
        }
    }

    useEffect(()=>
    {
        if(searchQuery != '')
        {
            searchForItems(searchQuery).then(data => setData(data))
            console.log(data)
        }
    },[searchQuery])

    return(
    <div className="search">
        <form className='search-form'>
            <input className='search-form-input' type='text' onChange={(e)=>setSearchQuery(e.target.value)}></input>
        </form>
        <div className='search-tags-container'>
            <ul className='search-tags'>
                <li className='search-tag' onClick={ ()=> setSearchType(SearchTypes.all)}>All</li>
                <li className='search-tag' onClick={ ()=> setSearchType(SearchTypes.artists)}>Artists</li>
                <li className='search-tag' onClick={ ()=> setSearchType(SearchTypes.tracks)}>Tracks</li>
                <li className='search-tag' onClick={ ()=> setSearchType(SearchTypes.playlists)}>Playlists</li>
                <li className='search-tag' onClick={ ()=> setSearchType(SearchTypes.albums)}>Albums</li>
            </ul>
        </div>
        {searchDisplay(searchType)}
        <div className='search-results'>
            {data && renderTracks()}
        </div>
    </div>
    ) 
}