import axios from "axios"
import { currentToken, refreshToken } from "../auth"
import { API_BASE_URI } from "../../utils/constants"


export const getCurrentUserSavedAlbums = async ({limit, next} : {limit?:number, next?:string}) =>
{
    const headers = {Authorization : `Bearer ${currentToken.access_token}`}
    try {        
        let response
        if(next) response = await axios.get<any>(`${next}`, { headers })
        else response = await axios.get<any>(`${API_BASE_URI}me/albums?${limit ? 'limit=' + limit : ''}`, { headers })
        return response.data

    } catch (error : any) {
        if(error.response.data.error.status = 401 && error.response.data.error.message === 'The access token expired')
            {
                await refreshToken()
                let response
                if(next) response = await axios.get<any>(`${next}`, { headers })
                else response = await axios.get<any>(`${API_BASE_URI}me/albums?${limit ? '?limit=' + limit : ''}`, { headers })
                return response.data
            } 
        throw new Error(error)  
    }
}