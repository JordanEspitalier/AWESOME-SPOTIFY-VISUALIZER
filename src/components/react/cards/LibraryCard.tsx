import { Link } from 'react-router-dom'
import './libraryCard.css'
import { substringTool } from '../../../utils/substringTool'

function LibraryCard({item} : {item : any}) {
  return (
    <Link className='libraryCard' to={`/playlist/${item.id}`}>
      <img className='libraryCard-image' src={item.images[0].url}/>
      <div className='libraryCard-content'>
        <div className='libraryCard-content-name'>{substringTool(item.name, 31)}</div>
        <div className='libraryCard-content-type'>{item.type} - {item.owner.display_name}</div>
      </div>
    </Link>
  )
}

export default LibraryCard