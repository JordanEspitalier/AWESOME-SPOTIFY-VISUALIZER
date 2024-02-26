import { create } from "zustand"

interface authState 
{
    userIsLogged : boolean
    setUserIsLogged : (isLogged : boolean) => void
}

export const useAuthStore = create<authState>((set)=>
({
    userIsLogged : false,
    setUserIsLogged : (isLogged) =>set({userIsLogged : isLogged}),
}))