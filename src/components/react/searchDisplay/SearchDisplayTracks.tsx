
import './searchDisplayTracks.css'
import { Key, useEffect, useState } from 'react'
import { searchForItems } from '../../../services/apiRequest/search'
import { useParams } from 'react-router-dom'
import TrackRow from '../table/TrackRow'

function SearchDisplayTracks() {

    const [tracks, setTracks] = useState<any>()
    const {query} = useParams()
    useEffect(()=>
    {
        if(query)
        searchForItems(query, 'track', 50)
        .then(data =>{
            setTracks(data.tracks.items)
        })
        .catch(error => console.log(error))
        
    },[query])
  return (
    <table className="searchDisplayTracks">
    { tracks && <thead className= "searchDisplayTracks-header">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Album</th>
                <th scope="col">Time</th>
            </tr>
        </thead>}
            <tbody className='searchDisplayTracks-body'>
                {tracks && tracks.map((track : any, index : any)=><TrackRow key={index} track={track} tableIndex={index + 1}/>)}
            </tbody>
    </table>
  )
}

export default SearchDisplayTracks