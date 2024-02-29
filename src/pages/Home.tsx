import { Outlet, useMatches } from "react-router-dom";
import AudioPlayer from "../components/react/AudioPlayer";
import NavBar from "../components/react/NavBar";
import Experience from "../components/reactThreeFiber/Experience";
import './home.css'

export default function Home () 
{

    const matches = useMatches()

    return (
        <div className="home">
            <div className="home-nav-experience-container">
                <NavBar />
{/*                 {nav === 'home' && <Experience />}
                {nav === 'search' && <Search />} */}
                {matches.length === 1 ?
                <Experience /> :
                <Outlet />
                }
            </div>
            <div className="home-audioPlayer-container">
                <AudioPlayer />
            </div>
        </div>
    )
}