import { Key, useEffect, useState } from 'react'
import './searchDisplayArtists.css'
import { searchForItems } from '../../../services/apiRequest/search'
import Card from '../cards/Card'
import { useParams } from 'react-router-dom'
import { SearchType } from '../../../models/SearchTypes'


function SearchDisplayArtists() {

    const [artists, setArtists] = useState<any>()
    const {query} = useParams()
    useEffect(()=>
    {
        if(query)
        searchForItems(query, 'artist', 25)
        .then(data =>{
            setArtists(data.artists.items)
        })
        .catch(error => console.log(error))
        
    },[query])

  return (
    <div className='searchDisplayArtists'>
    {artists && artists.map((artist: { id: Key | null | undefined }) => <Card key={artist.id} item={artist} type={SearchType.artist}/> )}
    </div>
  )
}

export default SearchDisplayArtists