import { useEffect, useMemo, useState } from 'react'
import './audioPlayer.css'
//import { getPlaybackState } from '../../services/apiRequest/player'
import SpotifyWebPlayer from 'react-spotify-web-playback'
import { currentToken, refreshToken } from '../../services/auth'
import { usePlayerStore } from '../../store/player'
import { useExperienceStore } from '../../store/experience'
import { getTrackAudioAnalysis } from '../../services/apiRequest/track'



export default function AudioPlayer () 
{
    const trackUris = usePlayerStore(state => state.trackUris)
    const [play, setPlay] = useState<boolean>(false)
    const setCurrentTrackData = useExperienceStore(state => state.setCurrentTrackData)
    
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
                hideAttribution = {true}
                callback={state => {
                    if(!state.isPlaying){
                        setPlay(false)
                        setCurrentTrackData({currentTrackDuration : 0, currentTrackSegments : []})
                    }else{
                        if(state.track.id)
                            getTrackAudioAnalysis(state.track.id).then(data => setCurrentTrackData({currentTrackDuration : data.track.duration, currentTrackSegments : data.segments}))
                    }
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