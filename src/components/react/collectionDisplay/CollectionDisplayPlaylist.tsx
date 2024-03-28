import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TrackRow from "../table/TrackRow"
import './collectionDisplay.css'
import { getPlaylist } from "../../../services/apiRequest/playlist"


export default function CollectionDisplayPlaylist() {
const {id} = useParams()

const [nextQuery, setNextQuery] = useState<string>()
const [playlist, setPlaylist] = useState<any>()
const [previousId, setPreviousId] = useState<any>()

useEffect(()=>
{
    // If previousId != id playlist change so reset playlist state and change previous id
    if(previousId != id)
    {
        setPlaylist(null)
        setPreviousId(id)
    }
    
    // if we have an id we can fetch data
    if(id)
    {
        // If we don't have playlist fetch the first part of the playlist data
        if(!playlist)
        {
            getPlaylist({playlistId : id})
            .then(data =>
                {
                    setPlaylist(data)
                    // if there is a next query the playlist is not complete so change the state nextQuery to be relauch the useEffect
                    if(data.tracks.next) setNextQuery(data.tracks.next)
                })
            .catch(error => console.log(error))
        }
        // If we have a nextQuery that's means we need to fetch more data to complete the playlist
        if(nextQuery)
        {
            getPlaylist({playlistId : id, next : nextQuery})
            .then(data =>
                {
                    // Create an array with a copy of the actual playlist.tracks.items array how contains the first tracks of the playlist
                    const newItems = [...playlist.tracks.items]
                    // Map data.items and push items into the new arrray
                    data.items.map((item : any) => newItems.push(item))
                    // Then we can set the state with new array of items, we copy all the playlist and change only playlist.tracks.items
                    setPlaylist({...playlist, tracks : {...playlist.tracks, items : newItems}})
                    // if there is a next query the playlist is not complete so change the state nextQuery to be relauch the useEffect
                    if(data.next) setNextQuery(data.next)
                    // Else we reset the value of nextQuery, the useEffect will relauch but it will do nothing from this change
                    else setNextQuery(undefined)
                })
            .catch(error => console.log(error))
        }

/*         if(nextQuery)
        {
            getPlaylistItems({limit : 50, next : nextQuery, playlistId : id})
            .then(data =>{
                const newItems = [...playlist.items]
                data.items.map((item : any) => newItems.push(item))
                setPlaylist({...playlist, items : newItems})
                setTotalItems(data.total)
                if(data.next) setNextQuery(data.next)
            })
            .catch(error => console.log(error))
        }
        else
        {
            getPlaylistItems({limit : 50, playlistId : id})
            .then(data =>{
                setPlaylist(data)
                setTotalItems(data.total)
                if(data.next) setNextQuery(data.next)
            })
            .catch(error => console.log(error))
        } */
    }
    
},[nextQuery,id, playlist])

  return (
    <div className="collectionDisplay">
    {playlist &&
      <>
        <header className="collectionDisplay-header">
            <>
            <img className="collectionDisplay-header-image" src={playlist.images ? playlist.images[0].url : "https://misc.scdn.co/liked-songs/liked-songs-640.png"}/>
            <div className="collectionDisplay-header-infos">
                <div className="collectionDisplay-header-infos-title">{playlist ? playlist.name : '...'}</div>
                {playlist.description && <div className="collectionDisplay-header-infos-description">{playlist.description}</div>}
                <div className="collectionDisplay-header-infos-totalItems">{playlist ? playlist.tracks.total : '...'} tracks</div>
            </div>
            </>
        </header> 
        <table className='collectionDisplay-table'>
            <thead className='collectionDisplay-table-header'>
                <tr className='collectionDisplay-table-header-tr'>
                    <th scope="col" className='collectionDisplay-table-header-tr-hash'>#</th>
                    <th scope="col" className='collectionDisplay-table-header-tr-title'>Title</th>
                    <th scope="col" className='collectionDisplay-table-header-tr-album'>Album</th>
                    <th scope="col" className='collectionDisplay-table-header-tr-time'>Time</th>
                </tr>
            </thead>
            <tbody className='collectionDisplay-table-body'>
            {playlist.tracks.items.map((item : any, index:any) => <TrackRow key={index} track={item.track} tableIndex={index + 1}/>)}
            </tbody>
        </table>
      </>
      }
    </div>
  )}
