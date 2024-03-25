import { useState } from 'react'
import './trackRow.css'
import { usePlayerStore } from '../../../store/player'

export default function TrackRow ({track, tableIndex} : any) 
{
    console.log(track)
    const displayArtists = () =>
    {
        let artists: any[] = []
        track.artists.map((artist : any) => artists.push(artist.name))
        return <div>{artists.join(', ')}</div>
    } 
    const displayDuration = () =>
    {
        const time = (Math.round(track.duration_ms / 60000 * 100)).toString()
        return time.slice(0, 1) + ':' + time.slice(1, 3)
    }

    const setCurrentTrackUri = usePlayerStore(state => state.setCurrentTrackUri)

    const [playButtonHovered, setPlayButtonHovered] = useState(false)

    return(
        <tr className="trackRow">
            <th 
                scope="row"
                className="trackRow-playIndex"
                onMouseEnter={()=>setPlayButtonHovered(!playButtonHovered)}
                onMouseLeave={()=>setPlayButtonHovered(!playButtonHovered)}
            >
                {playButtonHovered ?
                <div onClick={()=>setCurrentTrackUri([track.uri])}>P</div> :
                tableIndex}
            </th>
            <td className="trackRow-main">
                {track.album.images ?  <img src={track.album.images[track.album.images.length - 1].url} className="trackRow-main-img"/>  : <div></div>}
                <div>
                    <div>{track.name}</div>
                    {displayArtists()}
                </div>
            </td>
            <td>{track.album.name}</td>
            <td>{displayDuration()}</td>
        </tr>
    )
}