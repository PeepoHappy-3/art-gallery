
import { NavLink } from "react-router-dom"

import './AccountNavigation.scss'

export const AccountNavigation = ()=>{

  return (
    <nav className='account-navigation'>
      <NavLink end to='/account' className='account-navigation__link'>Info</NavLink>
      <NavLink to='/account/history' className='account-navigation__link'>Commissions history</NavLink>
   </nav>
  )
}