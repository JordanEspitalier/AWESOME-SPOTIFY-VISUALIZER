import { useParams } from 'react-router-dom'
import './searchDisplayAll.css'
import { useEffect, useState } from 'react'
import { searchForItems } from '../../../services/apiRequest/search'
import TrackRow from '../table/TrackRow'
import Card from '../cards/Card'
import { SearchType } from '../../../models/SearchTypes'

function SearchDisplayAll() {
  const {query} = useParams()
  const [tracks, setTracks] = useState<any>()
  const [artists, setArtists] = useState<any>()
  const [albums, setAlbums] = useState<any>()
  const [playlists, setPlaylist] = useState<any>()

  useEffect(()=>
  {
    if(query)
    searchForItems(query, 'track,artist,album,playlist', 7)
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
      {tracks && 
      <>      
      <div className='searchDisplayAll-tracksPreview-title'>Tracks</div>
       <table className='searchDisplayAll-tracksPreview-table'>
        <thead className='searchDisplayAll-tracksPreview-table-header'>
          <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Album</th>
              <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody className='searchDisplayAll-tracksPreview-table-body'>
          {tracks.map((track : any, index:any) => <TrackRow key={index} track={track} tableIndex={index + 1}/>)}
        </tbody>
       </table>
      </>
      }
      {artists &&
      <>
       <div className='searchDisplayAll-artistsPreview'>
          <div className='searchDisplayAll-artistsPreview-title'>Artists</div>
          <div className='searchDisplayAll-artistsPreview-container'>
            {artists.map((artist:any) => <Card key={artist.id} item={artist} type={SearchType.artist}/>)}
          </div>
       </div>
      </>
      }
      {albums &&
      <>
       <div className='searchDisplayAll-albumsPreview'>
          <div className='searchDisplayAll-albumsPreview-title'>Albums</div>
          <div className='searchDisplayAll-albumsPreview-container'>
            {albums.map((album:any) => <Card key={album.id} item={album} type={SearchType.album}/>)}
          </div>
       </div>
      </>
      }
      {playlists && 
      <>
       <div className='searchDisplayAll-playlistsPreview'>
          <div className='searchDisplayAll-playlistsPreview-title'>Playlists</div>
          <div className='searchDisplayAll-playlistsPreview-container'>
            {playlists && playlists.map((playlist:any) => <Card key={playlist.id} item={playlist} type={SearchType.playlist}/>)}
          </div>
       </div>
      </>
      }
    </div>
  )
}

export default SearchDisplayAll