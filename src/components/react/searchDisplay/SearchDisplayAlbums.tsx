import './searchDisplayAlbums.css'
import { Key, useEffect, useState } from 'react'
import { searchForItems } from '../../../services/apiRequest/search'
import Card from '../cards/Card'
import { useParams } from 'react-router-dom'
import { SearchType } from '../../../models/SearchTypes'

function SearchDisplayAlbums (){
    const [albums, setAlbums] = useState<any>()
    const {query} = useParams()
    useEffect(()=>
    {
        if(query)
        searchForItems(query, 'album', 25)
        .then(data =>{
            setAlbums(data.albums.items)
        })
        .catch(error => console.log(error))
        
    },[query])

  return (
    <div className='searchDisplayAlbums'>
    {albums && albums.map((album: { id: Key | null | undefined }) => <Card key={album.id} item={album} type={SearchType.album}/> )}
    </div>
  )
}

export default SearchDisplayAlbums