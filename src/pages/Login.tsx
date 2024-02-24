import { useEffect, useState } from "react"
import { useUserStore } from "../store/user"
import { HREF_LOGIN } from "../utils/constants"

export default function Login () 
{
    const getCurrentUserProfile = useUserStore(store => store.getCurrentUserProfile)
    const currentUserProfile = useUserStore(store => store.curentUserProfile)
    console.log(currentUserProfile)

    useEffect(()=>
    {
        const hash : string  = window.location.hash
        let token : string | null | undefined = window.localStorage.getItem('token')

        if(!token && hash)
        {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1]
            window.location.hash = ''
            typeof(token) === 'string' && window.localStorage.setItem('token', token)
        }

        getCurrentUserProfile()

    },[])
    return (
        <div className="login">
            <header className="login-header">
                <h1>Awesome Spotify Visualizer</h1>
            </header>
            <div className="login-body">
                <a href={HREF_LOGIN}>Login to Spotify</a>
            </div>
        </div>
    )
}