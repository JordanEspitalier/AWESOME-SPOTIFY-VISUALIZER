import { create } from "zustand"
interface Nav 
{
    nav :'home' | 'search',
}
interface NavState extends Nav
{
    setNav : (nav : Nav) => void
}

export const useNavStore = create<NavState>((set)=>
({
    nav : 'home',
    setNav : ({nav}) => {set({nav : nav})}
}))