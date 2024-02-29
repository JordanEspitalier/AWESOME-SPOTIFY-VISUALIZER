import { useActionData, useParams } from 'react-router-dom'
import './searchDisplayAll.css'

function SearchDisplayAll() {
    const {query} = useParams()
    const data = useActionData()
    console.log(data)
  return (
    <div className='searchDisplayAll'>SearchDisplayAll</div>
  )
}

export default SearchDisplayAll