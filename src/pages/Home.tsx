import AudioPlayer from "../components/react/AudioPlayer";
import NavBar from "../components/react/NavBar";
import Experience from "../components/reactThreeFiber/Experience";
import './home.css'

export default function Home () 
{

    return (
        <div className="home">
            <div className="home-nav-experience-container">
                <NavBar />
                <Experience />
            </div>
            <div className="home-audioPlayer-container">
                <AudioPlayer />
            </div>
        </div>
    )
}