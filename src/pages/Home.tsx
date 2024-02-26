import AudioPlayer from "../components/react/AudioPlayer";
import NavBar from "../components/react/NavBar";
import Experience from "../components/reactThreeFiber/Experience";
import { useNavStore } from "../store/nav";
import { Search } from "./Search";
import './home.css'

export default function Home () 
{
    const nav = useNavStore(state => state.nav)

    return (
        <div className="home">
            <div className="home-nav-experience-container">
                <NavBar />
                {nav === 'home' && <Experience />}
                {nav === 'search' && <Search />}
            </div>
            <div className="home-audioPlayer-container">
                <AudioPlayer />
            </div>
        </div>
    )
}