
import { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { useUserStore } from './store/user'
import { useAuthStore } from './store/auth'
import { currentToken, getToken } from './services/auth'
import { getCurrentUserProfile } from './services/apiRequest/user/user'

function App() {

  const userIsLogged = useAuthStore(state => state.userIsLogged)
  const setUserIsLogged = useAuthStore(state => state.setUserIsLogged)
  const setCurrentUserProfile = useUserStore(state => state.setCurrentUserProfile)


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
      getCurrentUserProfile().then(user => setCurrentUserProfile(user))
    }

    // Otherwise we're not logged in
    if (!currentToken.access_token) {
      setUserIsLogged(false)
    }
  },[userIsLogged])

  return (
    <>
      {userIsLogged ?
      <Home />
      :
      <Login />
      }
    </>
  )
}

export default App
