
import './searchDisplayPlaylists.css'
import { Key, useEffect, useState } from 'react'
import { searchForItems } from '../../../services/apiRequest/search'
import Card from '../cards/Card'
import { useParams } from 'react-router-dom'

function SearchDisplayPlaylists() {
    const [playlists, setPlaylists] = useState<any>()
    console.log(playlists)
    const {query} = useParams()
    useEffect(()=>
    {
        if(query)
        searchForItems(query, 'playlist', 25)
        .then(data =>{
            setPlaylists(data.playlists.items)
        })
        .catch(error => console.log(error))
        
    },[query])

  return (
    <div className='searchDisplayPlaylists'>
    {playlists && playlists.map((playlist: { id: Key | null | undefined }) => <Card key={playlist.id} artist={playlist}/> )}
    </div>
  )
}

export default SearchDisplayPlaylists