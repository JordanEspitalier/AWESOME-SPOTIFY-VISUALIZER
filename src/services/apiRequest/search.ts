import { API_BASE_URI } from "../../utils/constants"
import axios from "axios"
import { currentToken, refreshToken } from "../auth"


export const searchForItems = async (query:string, type:string = 'track,artist,album,playlist', limit : number = 6) =>
{
    const headers = {Authorization : `Bearer ${currentToken.access_token}`}
    const params = {q : query, type, limit}

    try {
        const {data} = await axios.get(`${API_BASE_URI}search`, { headers, params })
        return data

    } catch (error : any) {
         if(error.response.data.error.status = 401 && error.response.data.error.message === 'The access token expired')
            {
                await refreshToken()
                const {data} = await axios.get(`${API_BASE_URI}search`, { headers, params })
                return data
            } 
        throw new Error(error) 
    }
}