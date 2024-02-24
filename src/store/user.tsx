import { create } from "zustand"
import { API_BASE_URI } from "../utils/constants"
import axios from "axios"

interface userState 
{
    curentUserProfile : object
    getCurrentUserProfile : (e? : Event, token? : string | null) => void
}

export const useUserStore = create<userState>((set)=>
({
    curentUserProfile : {},

    getCurrentUserProfile : async (e, token) =>
    {
        try 
        {
            if(e) e.preventDefault()
    
            if(!token)
            {
                token = window.localStorage.getItem('token')
                if(!token) throw 'There is no token'
            }
    
            const {data} = await axios.get(`${API_BASE_URI}me`,
            {
                headers : 
                {
                    Authorization : `Bearer ${token}`
                }
            })
    
            set({curentUserProfile : data})
            
        } 
        catch (error) 
        {
            throw error    
        }
    }
}))