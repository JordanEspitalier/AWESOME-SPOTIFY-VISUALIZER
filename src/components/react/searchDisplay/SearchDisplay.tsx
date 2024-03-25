import { useParams } from "react-router-dom"
import SearchDisplayArtists from "./SearchDisplayArtists";
import SearchDisplayTracks from "./SearchDisplayTracks";
import SearchDisplayPlaylists from "./SearchDisplayPlaylists";
import SearchDisplayAlbums from "./SearchDisplayAlbums";

function SearchDisplay() {
    const {type} = useParams()

    const display = (type?:String) =>
    {
        switch (type) {
            case 'artists':
                return <SearchDisplayArtists />
            case 'tracks':
                return <SearchDisplayTracks />
            case 'playlists' :
                return <SearchDisplayPlaylists />
            case 'albums' :
                return <SearchDisplayAlbums />
            default:
                break;
        }
    }

  return (
    <>{display(type)}</>
  )
}

export default SearchDisplay