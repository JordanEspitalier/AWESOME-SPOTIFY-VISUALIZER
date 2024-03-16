
import { useEffect } from "react"
import { currentToken, getToken, redirectToSpotifyAuthorize } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import { useUserStore } from "../store/user"
import { getCurrentUserProfile } from "../services/apiRequest/user"

export default function Login () 
{
    const loginWithSpotifyClick = async () => await redirectToSpotifyAuthorize()

    const userIsLogged = useAuthStore(state => state.userIsLogged)
    const setUserIsLogged = useAuthStore(state => state.setUserIsLogged)
    const setCurrentUserProfile = useUserStore(state => state.setCurrentUserProfile)
    const navigate = useNavigate()
  
    useEffect(()=>
    {
      // On page load, try to fetch auth code from current browser search URL
      const args = new URLSearchParams(window.location.search)
      const code = args.get('code')
  
      // If we find a code, we're in a callback, do a token exchange
      if(code)
      {
        getToken(code).then(()=>setUserIsLogged(true))
  
        // Remove code from URL so we can refresh correctly.
        const url = new URL(window.location.href)
        url.searchParams.delete('code')
        const updatedUrl = url.search ? url.href : url.href.replace('?', '');
        window.history.replaceState({}, document.title, updatedUrl);
  
      }
      // If we have a token, we're logged in
      if(currentToken.access_token && currentToken.access_token!= 'undefined')
      {
        setUserIsLogged(true)
        // Get user from api and store it
        getCurrentUserProfile().then(user => {
          //console.log('looged')
          setCurrentUserProfile(user)
          //navigate('/')
        })
  
      }
      // Otherwise we're not logged in
      if (!currentToken.access_token || currentToken.access_token === 'undefined') {
        console.log(currentToken.access_token)
        setUserIsLogged(false)
        //navigate('/login')
  
      }
  
    },[userIsLogged])

    return (
        <div className="login">
            <header className="login-header">
                <h1>Awesome Spotify Visualizer</h1>
            </header>
            <div className="login-body">
                <button onClick={loginWithSpotifyClick}>Login to Spotify</button>
            </div>
        </div>
    )
}