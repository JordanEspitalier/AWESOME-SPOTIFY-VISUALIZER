import { Key, useEffect, useState } from 'react'
import { SearchProps } from './interfaceSearchDisplayProps'
import './searchDisplayArtists.css'
import { searchForItems } from '../../../services/apiRequest/search'
import Card from '../cards/Card'
import { useParams } from 'react-router-dom'
import { SearchTypes } from '../../../models/SearchTypes'


function SearchDisplayArtists() {

    const [artists, setArtists] = useState<any>()
    const {query} = useParams()
    useEffect(()=>
    {
        if(query)
        searchForItems(query, SearchTypes.artists, 20)
        .then(data =>{
            setArtists(data.artists.items)
        })
        .catch(error => console.log(error))
        
    },[query])

  return (
    <div className='searchDisplayArtists'>
    {artists && artists.map((artist: { id: Key | null | undefined }) => <Card key={artist.id} artist={artist}/> )}
    </div>
  )
}

export default SearchDisplayArtists