import { API_BASE_URI } from "../../utils/constants"
import axios from "axios"
import { currentToken, refreshToken } from "../auth"

const baseParams = 
{
    type : 'track,artist,album,playlist',
    limit : 20,

}

export const searchForItems = async (query:string) =>
{
    const headers = {Authorization : `Bearer ${currentToken.access_token}`}
    const params = {...baseParams, q : query}
    try {
        const {data} = await axios.get(`${API_BASE_URI}search`, { headers, params })
        return data

    } catch (error : any) {
         if(error.response.data.error.status = 401 && error.response.data.error.message === 'The access token expired')
            {
                refreshToken()
                const {data} = await axios.get(`${API_BASE_URI}search`, { headers, params })
                return data
            } 
        throw new Error(error) 
    }
}