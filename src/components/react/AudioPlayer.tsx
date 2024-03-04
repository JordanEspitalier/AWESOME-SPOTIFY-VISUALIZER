import { useEffect, useMemo, useState } from 'react'
import './audioPlayer.css'
//import { getPlaybackState } from '../../services/apiRequest/player'
import SpotifyWebPlayer from 'react-spotify-web-playback'
import { currentToken } from '../../services/auth'
import { usePlayerStore } from '../../store/player'

export default function AudioPlayer () 
{
    const trackUris = usePlayerStore(state => state.trackUris)
    console.log(trackUris)
    const [play, setPlay] = useState<boolean>(false)
    useEffect(()=>
    {
        setPlay(true)
    }, [trackUris])
    return (
        <div className='audioPlayer'>
            <SpotifyWebPlayer 
                token={currentToken.access_token ? currentToken.access_token  : ''} 
                uris={trackUris}
                showSaveIcon
                callback={state => {
                    if(!state.isPlaying) setPlay(false)
                }}
                play={play}
                styles={{
                    bgColor : 'transparent',
                    color : '#fff',
                    trackArtistColor: '#fff',
                    trackNameColor: '#fff',
                    sliderColor: '#ffff',
                    sliderHandleColor: '#ffff',
                    sliderTrackColor : '#4D4C4C'
                }}
            />
        </div>
    )
}