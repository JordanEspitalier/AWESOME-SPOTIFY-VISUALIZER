import { create } from "zustand"
import { API_BASE_URI } from "../utils/constants"
import axios from "axios"
import { currentToken } from "../services/auth"
import { UserProfile } from "../models/UserProfile"

interface UserState 
{
    curentUserProfile : UserProfile | {}
    getCurrentUserProfile : (e? : Event) => void
}

export const useUserStore = create<UserState>((set)=>
({

    curentUserProfile : {},
    getCurrentUserProfile : async (e) =>
    {
        try 
        {
            if(e) e.preventDefault()
    
            const {data} = await axios.get(`${API_BASE_URI}me`,
            {
                headers : 
                {
                    Authorization : `Bearer ${currentToken.access_token}`
                }
            })
            console.log(data)
            set({curentUserProfile : data})
        } 
        catch (error : any) 
        {
    
            throw error    
        }
    }
}))