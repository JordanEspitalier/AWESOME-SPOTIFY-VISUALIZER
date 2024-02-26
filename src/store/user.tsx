import { create } from "zustand"
import { API_BASE_URI } from "../utils/constants"
import axios from "axios"

interface userState 
{
    userIsLogged : boolean
    setUserIsLogged : (isLogged : boolean) => void
    curentUserProfile : object
    getCurrentUserProfile : (e? : Event, token? : string | null) => void
}

export const useUserStore = create<userState>((set)=>
({
    userIsLogged : false,
    setUserIsLogged : (isLogged) =>set({userIsLogged : isLogged}),

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
        catch (error : any) 
        {
            if(error.response.data.error.status = 401 && error.response.data.error.message === 'The access token expired') set({userIsLogged : false})
            throw error    
        }
    }
}))