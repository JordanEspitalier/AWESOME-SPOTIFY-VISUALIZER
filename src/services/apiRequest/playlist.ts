import axios from "axios"
import { currentToken, refreshToken } from "../auth"
import { API_BASE_URI } from "../../utils/constants"

export const getPlaylist = async ({playlistId, next} : {playlistId : string, next? : any}) =>
{
    const headers = {Authorization : `Bearer ${currentToken.access_token}`}
    try {
        let response
        if(next) response = await axios.get<any>(`${next}`, { headers })
        else response = await axios.get<any>(`${API_BASE_URI}playlists/${playlistId}`, { headers })
        return response?.data

    } catch (error : any) {
        if(error.response.data.error.status = 401 && error.response.data.error.message === 'The access token expired')
            {
                const success = await refreshToken()
                if(success)
                {
                    let response
                    if(next) response = await axios.get<any>(`${next}`, { headers })
                    else response = await axios.get<any>(`${API_BASE_URI}playlists/${playlistId}`, { headers })
                    return response?.data
                }
            } 
        throw new Error(error)  
    }
}

export const getPlaylistItems = async ({limit, next, playlistId} : {limit: number, next? : any, playlistId : string}) =>
{
    const headers = {Authorization : `Bearer ${currentToken.access_token}`}
    try {
        let response
        if(next) response = await axios.get<any>(`${next}`, { headers })
        else response = await axios.get<any>(`${API_BASE_URI}playlists/${playlistId}/tracks?limit=${limit}`, { headers })
        return response?.data

    } catch (error : any) {
        if(error.response.data.error.status = 401 && error.response.data.error.message === 'The access token expired')
            {
                refreshToken()
                let response
                if(next) response = await axios.get<any>(`${next}`, { headers })
                else response = await axios.get<any>(`${API_BASE_URI}playlists/${playlistId}/tracks?limit=${limit}`, { headers })
                return response?.data
            } 
        throw new Error(error)  
    }
}

export const getUserPlaylists = async ({userId, limit, next} : {userId:string, limit:number, next?:string}) =>
{
    const headers = {Authorization : `Bearer ${currentToken.access_token}`}
    try {
        let response
        if(next) response = await axios.get<any>(`${next}`, { headers })
        else response = await axios.get<any>(`${API_BASE_URI}users/${userId}/playlists${limit ? '?limit=' + limit : ''}`, { headers })
        return response?.data

    } catch (error : any) {
        if(error.response.data.error.status = 401 && error.response.data.error.message === 'The access token expired')
            {
                refreshToken()
                let response
                if(next) response = await axios.get<any>(`${next}`, { headers })
                else response = await axios.get<any>(`${API_BASE_URI}users/${userId}/playlists${limit ? '?limit=' + limit : ''}`, { headers })
                return response?.data
            } 
        throw new Error(error)  
    }
}