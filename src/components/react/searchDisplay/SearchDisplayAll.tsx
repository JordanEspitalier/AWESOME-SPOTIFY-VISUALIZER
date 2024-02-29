import { useParams } from 'react-router-dom'
import { SearchProps } from './interfaceSearchDisplayProps'
import './searchDisplayAll.css'

function SearchDisplayAll() {
    const params = useParams()
    const query = params['query']
  return (
    <div className='searchDisplayAll'>SearchDisplayAll</div>
  )
}

export default SearchDisplayAll