import { useParams } from 'react-router-dom'
import './searchDisplayAll.css'
import { useEffect, useState } from 'react'
import { searchForItems } from '../../../services/apiRequest/search'

function SearchDisplayAll() {
  const {query} = useParams()
  const [tracks, setTracks] = useState<any>()
  const [artists, setArtists] = useState<any>()
  const [albums, setAlbums] = useState<any>()
  const [playlists, setPlaylist] = useState<any>()

  useEffect(()=>
  {
    if(query)
    searchForItems(query, 'track,artist,album,playlist', 6)
    .then(data =>{
        setTracks(data.tracks.items)
        setArtists(data.artists.items)
        setAlbums(data.albums.items)
        setPlaylist(data.playlists.items)
    })
    .catch(error => console.log(error))
  },[query])

  return (
    <div className='searchDisplayAll'>
       <div className='searchDisplayAll-tracksPreview'>
          
       </div>
       <div className='searchDisplayAll-artistsPreview'>

       </div>
       <div className='searchDisplayAll-albumsPreview'>

       </div>
       <div className='searchDisplayAll-playlistPreview'>

       </div>
    </div>
  )
}

export default SearchDisplayAll