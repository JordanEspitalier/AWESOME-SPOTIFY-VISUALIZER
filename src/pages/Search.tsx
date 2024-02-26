import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import './search.css'
import { searchForItems } from '../services/apiRequest/search'

export function Search () 
{
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState<any>()

    const renderTracks = () =>
    {
        return data.tracks.items.map((track: { name: string, id : string})=> (
            <div key={track.id}>
                {track.name}
            </div>
        ))
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
                <li className='search-tag'>All</li>
                <li className='search-tag'>Artists</li>
                <li className='search-tag'>Tracks</li>
                <li className='search-tag'>Playlists</li>
                <li className='search-tag'>Albums</li>
            </ul>
        </div>
        <div className='search-results'>
            {data && renderTracks()}
        </div>
    </div>
    ) 
}