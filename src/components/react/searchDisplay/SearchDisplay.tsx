import { useParams } from "react-router-dom"
import { SearchTypes } from "../../../models/SearchTypes"
import SearchDisplayArtists from "./SearchDisplayArtists";
import SearchDisplayTracks from "./SearchDisplayTracks";
import SearchDisplayPlaylists from "./SearchDisplayPlaylists";
import SearchDisplayAlbums from "./SearchDisplayAlbums";

function SearchDisplay() {
    const {type} = useParams()

    const display = (type?:String) =>
    {
        switch (type) {
            case SearchTypes.artists:
                return <SearchDisplayArtists />
            case SearchTypes.tracks:
                return <SearchDisplayTracks />
            case SearchTypes.playlists :
                return <SearchDisplayPlaylists />
            case SearchTypes.albums :
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