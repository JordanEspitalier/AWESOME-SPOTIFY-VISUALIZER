import axios from "axios"
import { API_BASE_URI } from "../../../utils/constants"
import { currentToken, refreshToken } from "../../auth"
import { UserProfile } from "../../../models/UserProfile"


export const getCurrentUserProfile = async () => 
{
    const headers = {Authorization : `Bearer ${currentToken.access_token}`}
    try {        
        const {data} = await axios.get<UserProfile>(`${API_BASE_URI}me`, { headers })
        return data

    } catch (error : any) {
        if(error.response.data.error.status = 401 && error.response.data.error.message === 'The access token expired')
            {
                refreshToken()
                const {data} = await axios.get<UserProfile>(`${API_BASE_URI}me`, { headers })
                return data
            } 
            throw new Error(error)  
    }
}