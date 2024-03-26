import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrentUserSavedTracks } from "../../services/apiRequest/user"
import TrackRow from "./table/TrackRow"
import './collectionDisplay.css'


function CollectionDisplay({type}:{type : string}) {
const {query} = useParams()

const [nextQuery, setNextQuery] = useState<string>()
const [totalItems, setTotalItems] = useState<number>()
const [items, setItems] = useState<any>()

useEffect(()=>
{
    if(type === 'likedTracks')
    {
        if(nextQuery)
        {
            getCurrentUserSavedTracks({limit : 50, next : nextQuery})
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
            getCurrentUserSavedTracks({limit : 50})
            .then(data =>{
                setItems(data.items)
                setTotalItems(data.total)
                if(data.next) setNextQuery(data.next)
            })
            .catch(error => console.log(error))
        }
    }
},[nextQuery])
  return (
    <div className="collectionDisplay">
    {items &&
      <>
        <header className="collectionDisplay-header">
        {type === 'likedTracks' &&
            <>
            <img className="collectionDisplay-header-image" src="https://misc.scdn.co/liked-songs/liked-songs-640.png"/>
            <div className="collectionDisplay-header-infos">
                <div className="collectionDisplay-header-infos-title">Liked tracks</div>
                <div className="collectionDisplay-header-infos-totalItems">{totalItems} tracks</div>
            </div>
            </>
        }
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
    
  )
}

export default CollectionDisplay