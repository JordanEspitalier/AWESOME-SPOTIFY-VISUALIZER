import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TrackRow from "../table/TrackRow"
import './collectionDisplay.css'
import { getPlaylistItems } from "../../../services/apiRequest/playlist"


export default function CollectionDisplayAlbum() {
const {id} = useParams()

const [nextQuery, setNextQuery] = useState<string>()
const [totalItems, setTotalItems] = useState<number>()
const [items, setItems] = useState<any>()

useEffect(()=>
{
    // The items limit of the api is 50 so we call them the number of time needed to get all the liked tracks
        if(id)
        {
            if(nextQuery)
            {
                getPlaylistItems({limit : 50, next : nextQuery, playlistId : id})
                .then(data =>{
                    const newItems = [...items]
                    data.items.map((item : any) => newItems.push(item))
                    setItems(newItems)
                    setTotalItems(data.total)
                    if(data.next) setNextQuery(data.next)
                })
                .catch(error => console.log(error))
            }
            else
            {
                getPlaylistItems({limit : 50, playlistId : id})
                .then(data =>{
                    setItems(data.items)
                    setTotalItems(data.total)
                    if(data.next) setNextQuery(data.next)
                })
                .catch(error => console.log(error))
            }
        }
    
},[nextQuery, id])
  return (
    <div className="collectionDisplay">
    {items &&
      <>
        <header className="collectionDisplay-header">
            <>
            <img className="collectionDisplay-header-image" src="https://misc.scdn.co/liked-songs/liked-songs-640.png"/>
            <div className="collectionDisplay-header-infos">
                <div className="collectionDisplay-header-infos-title">Liked tracks</div>
                <div className="collectionDisplay-header-infos-totalItems">{totalItems} tracks</div>
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
            {items.map((item : any, index:any) => <TrackRow key={index} track={item.track} tableIndex={index + 1}/>)}
            </tbody>
        </table>
      </>
      }
    </div>
  )}
