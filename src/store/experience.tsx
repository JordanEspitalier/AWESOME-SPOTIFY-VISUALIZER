import { create } from "zustand"
import { UserProfile } from "../models/UserProfile"

interface ExperienceState 
{
    curentTrackTempo : number,
    currentTrackLoudness : number,
    setCurrentTrackData : (data : {curentTrackTempo : number, currentTrackLoudness : number}) => void
}
export const useExperienceStore = create<ExperienceState>((set)=>
({

    curentTrackTempo : 0,
    currentTrackLoudness : 0,
    setCurrentTrackData: (data) => { set({curentTrackTempo : data.curentTrackTempo, currentTrackLoudness : data.currentTrackLoudness}) }

}))