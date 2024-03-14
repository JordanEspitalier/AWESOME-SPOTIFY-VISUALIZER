import { create } from "zustand"
import { UserProfile } from "../models/UserProfile"

interface ExperienceState 
{
    currentTrackTempo : number,
    currentTrackLoudness : number,
    currentTrackDuration : number,
    currentTrackSegments : [][],
    triggerResetLoopIndex  : number,
    setCurrentTrackData : (data : {
        currentTrackDuration : number,
        currentTrackSegments : [][],
        currentTrackTempo : number,
    }) => void,
    resetLoopIndex : () => void
}
export const useExperienceStore = create<ExperienceState>((set)=>
({

    currentTrackTempo : 0,
    currentTrackLoudness : 0,
    currentTrackDuration : 0,
    currentTrackSegments : [],
    triggerResetLoopIndex : 0,
    setCurrentTrackData: (data) => { set({
        currentTrackDuration : data.currentTrackDuration,
        currentTrackSegments: data.currentTrackSegments,
        currentTrackTempo : data.currentTrackTempo,
    }) },
    resetLoopIndex : () => {set(state =>({triggerResetLoopIndex : state.triggerResetLoopIndex + 1}))}

}))