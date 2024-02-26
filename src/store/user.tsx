import { create } from "zustand"
import { UserProfile } from "../models/UserProfile"

interface UserState 
{
    curentUserProfile : UserProfile | {}
    setCurrentUserProfile : (data : UserProfile) => void
}
export const useUserStore = create<UserState>((set)=>
({

    curentUserProfile : {},
    setCurrentUserProfile : (data) => { set({curentUserProfile : data}) }

}))