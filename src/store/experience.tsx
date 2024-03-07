import { create } from "zustand"
import { UserProfile } from "../models/UserProfile"

interface ExperienceState 
{
    currentTrackTempo : number,
    currentTrackLoudness : number,
    currentTrackDuration : number,
    currentTrackSegments : [][]
    setCurrentTrackData : (data : {currentTrackDuration : number, currentTrackSegments : [][]}) => void
}
export const useExperienceStore = create<ExperienceState>((set)=>
({

    currentTrackTempo : 0,
    currentTrackLoudness : 0,
    currentTrackDuration : 0,
    currentTrackSegments : [],
    setCurrentTrackData: (data) => { set({currentTrackDuration : data.currentTrackDuration, currentTrackSegments: data.currentTrackSegments}) }

}))