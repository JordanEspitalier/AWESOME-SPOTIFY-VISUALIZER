import { Key, useEffect, useState } from 'react'
import { SearchProps } from './interfaceSearchDisplayProps'
import './searchDisplayArtists.css'
import { searchForItems } from '../../../services/apiRequest/search'
import Card from '../cards/Card'


function SearchDisplayArtists({searchQuery, searchType} : SearchProps) {

    const [artists, setArtists] = useState<any>()
    useEffect(()=>
    {
        searchForItems(searchQuery, searchType, 20)
        .then(data =>{
            setArtists(data.artists.items)
        })
        .catch(error => console.log(error))
        
    },[])

  return (
    <div className='searchDisplayArtists'>
    {artists && artists.map((artist: { id: Key | null | undefined }) => <Card key={artist.id} artist={artist}/> )}
    </div>
  )
}

export default SearchDisplayArtists