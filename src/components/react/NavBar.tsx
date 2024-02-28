import { useNavStore } from '../../store/nav'
import { Link } from 'react-router-dom'
import './navBar.css'

export default function NavBar () 
{

    const setNav = useNavStore(state => state.setNav)

    return (
        <nav className="nav-bar">
            <ul className='menu'>
                <li onClick={()=>setNav({nav :'home'})}>Home</li>
                <li onClick={()=>setNav({nav :'search'})}>Search</li>
            </ul>
            <div className='library'>
                <div className='library-header'>
                    Library
                </div>

            </div>
        </nav>
    )
}