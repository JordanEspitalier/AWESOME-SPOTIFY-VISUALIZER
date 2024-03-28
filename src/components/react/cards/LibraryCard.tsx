import { Link, useParams } from 'react-router-dom'
import './libraryCard.css'
import { substringTool } from '../../../utils/substringTool'

function LibraryCard({item} : {item : any}) {
  const {id} = useParams()
  return (
    <Link className={item.id === id ? 'libraryCard active' : 'libraryCard'} to={`/${item.type}/${item.id}`}>
      <img className='libraryCard-image' src={item.images[0].url}/>
      <div className='libraryCard-content'>
        <div className='libraryCard-content-name'>{substringTool(item.name, 31)}</div>
        <div className='libraryCard-content-type'>{item.type} - 
        {item.type === 'album' ?
        item.artists.map((artist:any, index:any) => <span key={index}>{artist.name}</span>) 
        : item.owner.display_name}</div>
      </div>
    </Link>
  )
}

export default LibraryCard