import './trackRow.css'

export default function TrackRow ({track, tableIndex} : any) 
{

    return(
        <tr className="trackRow">
            <th scope="row">{tableIndex}</th>
            <td>{track.name}</td>
            <td>{track.album.name}</td>
            <td>{(Math.round(track.duration_ms / 60000 * 100) / 100).toString().replace('.', ':')}</td>
        </tr>
    )
}