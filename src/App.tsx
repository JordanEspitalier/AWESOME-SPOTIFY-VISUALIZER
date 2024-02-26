
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { useUserStore } from './store/user'

function App() {

  const userIsLogged : boolean = useUserStore(store => store.userIsLogged)
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
