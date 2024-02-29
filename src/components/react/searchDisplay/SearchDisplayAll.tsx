import { useParams } from 'react-router-dom'
import './searchDisplayAll.css'
import { refreshToken } from '../../../services/auth'

function SearchDisplayAll() {
    const {query} = useParams()

  return (
    <div className='searchDisplayAll'>
        <button onClick={refreshToken}>RefrechToken</button>
    </div>
  )
}

export default SearchDisplayAll