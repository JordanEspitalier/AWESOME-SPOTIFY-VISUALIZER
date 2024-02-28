import { useState } from 'react'
import './search.css'
import SearchDisplayAll from '../components/react/searchDisplay/SearchDisplayAll'
import SearchDisplayArtists from '../components/react/searchDisplay/SearchDisplayArtists'
import SearchDisplayTracks from '../components/react/searchDisplay/SearchDisplayTracks'
import SearchDisplayPlaylists from '../components/react/searchDisplay/SearchDisplayPlaylists'
import SearchDisplayAlbums from '../components/react/searchDisplay/SearchDisplayAlbums'
import SearchDisplayWaiting from '../components/react/searchDisplay/searchDisplayWaiting'
import { SearchTypes } from '../models/SearchTypes'



const searchDisplay = (type : SearchTypes, searchQuery : string) => 
{

    if(searchQuery.length === 0) return <SearchDisplayWaiting />
    switch (type) {
        case SearchTypes.all:
            return <SearchDisplayAll searchQuery = {searchQuery} searchType={type}/>
        case SearchTypes.artists:
            return <SearchDisplayArtists searchQuery = {searchQuery} searchType={type}/>
        case SearchTypes.tracks :
            return <SearchDisplayTracks searchQuery = {searchQuery} searchType={type}/>
        case SearchTypes.playlists : 
            return <SearchDisplayPlaylists searchQuery = {searchQuery} searchType={type}/>
        case SearchTypes.albums : 
            return <SearchDisplayAlbums searchQuery = {searchQuery} searchType={type}/>
        default:
            return <div>404</div>
    }
}

export function Search () 
{
    const [searchQuery, setSearchQuery] = useState('')
    const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.all)


    return(
    <div className={`search ${searchQuery.length === 0 && 'animate'}`}>
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
        <div className='search-results'>
            {searchDisplay(searchType, searchQuery)}
        </div>
    </div>
    ) 
}