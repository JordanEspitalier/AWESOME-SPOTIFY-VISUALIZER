
import { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import { useUserStore } from './store/user'
import { currentToken, getToken } from './services/auth'
import { getCurrentUserProfile } from './services/apiRequest/user'

function App() {

  const setCurrentUserProfile = useUserStore(state => state.setCurrentUserProfile)

  useEffect(()=>
  {

    // If we have a token, we're logged in
    if(currentToken.access_token && currentToken.access_token!= 'undefined')
    {
      // Get user from api and store it
      getCurrentUserProfile().then(user => {
        setCurrentUserProfile(user)
      })
    }


  },[])
  return (
    <>
      <Home />
    </>
  )
}

export default App
