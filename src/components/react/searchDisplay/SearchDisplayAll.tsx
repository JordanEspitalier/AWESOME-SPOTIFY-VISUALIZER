import { useParams } from 'react-router-dom'
import './searchDisplayAll.css'

function SearchDisplayAll() {
    const {query} = useParams()

  return (
    <div className='searchDisplayAll'>
       searchDisplayAll
    </div>
  )
}

export default SearchDisplayAll