import axios from "axios"
import { currentToken, refreshToken } from "../auth"
import { API_BASE_URI } from "../../utils/constants"

export const getTrackAudioAnalysis = async (id : string) => 
{
    const headers = {Authorization : `Bearer ${currentToken.access_token}`}
    try {        
        const {data} = await axios.get<any>(`${API_BASE_URI}audio-analysis/${id}`, { headers })
        return data

    } catch (error : any) {
        if(error.response.data.error.status = 401 && error.response.data.error.message === 'The access token expired')
            {
                refreshToken()
                const {data} = await axios.get<any>(`${API_BASE_URI}audio-analysis/${id}`, { headers })
                return data
            } 
        throw new Error(error)  
    }
}