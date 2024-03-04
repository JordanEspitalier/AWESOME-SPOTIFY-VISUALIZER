import {create} from 'zustand'

interface PlayerState 
{
    trackUris : string[],
    setCurrentTrackUri : (data : string[]) => void
}

export const usePlayerStore = create <PlayerState>((set) =>
({
    trackUris : [],
    setCurrentTrackUri : (data)=> {set({trackUris : data})}

}))