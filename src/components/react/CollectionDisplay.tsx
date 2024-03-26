import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrentUserSavedTracks } from "../../services/apiRequest/user"
import TrackRow from "./table/TrackRow"
import './collectionDisplay.css'


function CollectionDisplay({type}:{type : string}) {
const {query} = useParams()
console.log(query)

const [items, setItems] = useState<any>()
console.log(items)

useEffect(()=>
{
    if(type === 'likedTracks')
    {
        getCurrentUserSavedTracks({limit : 50})
        .then(data => setItems(data.items))
        .catch(error => console.log(error))
    }
},[])
  return (
    <div className="collectionDisplay">
    {items &&
      <>
        <header className="collectionDisplay-header">
        </header> 
       <table className='collectionDisplay-table'>
        <thead className='collectionDisplay-table-header'>
          <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Album</th>
              <th scope="col">Time</th>
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