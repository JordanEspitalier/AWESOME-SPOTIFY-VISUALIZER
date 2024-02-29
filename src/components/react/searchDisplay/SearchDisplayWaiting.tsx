import { refreshToken } from '../../../services/auth'

function SearchDisplayWaiting() {
  return (
    <div className='searchDisplayWaiting'>
         <button onClick={refreshToken}>RefrechToken</button>
    </div>
  )
}

export default SearchDisplayWaiting