import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { clearUser, setIsLoggedIn } from "../../store/user/userSlice";

import './AccountHeader.scss';

export const AccountHeader = ()=>{
  const user = useSelector<RootState, any>(state=>state.user)
  const isLoggedIn = useSelector<RootState>(state=>state.user.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    dispatch(setIsLoggedIn(false))
    dispatch(clearUser()) 
    localStorage.removeItem('jwt')
    navigate('/')
  }

  useEffect(()=>{
    
  },[user])

  return (
    <div className="account-header">      
      <NavLink to='/account'>
        {isLoggedIn ? <div className="account-header__img-wrap">
          <img src={user.avatar} alt="" />
        </div> : ''}       
      </NavLink>    
      <div className="account-header__column">
        <NavLink to='/account' className="account-header__name">{user.name}</NavLink>
        {!isLoggedIn ?       
        <div className="account-header__row">
          <NavLink to='/signup' className="account-header__link">Sign up</NavLink>
          <NavLink to='/signin' className="account-header__link">Sign in</NavLink>
        </div> :
        <button onClick={handleLogout} className="account-header__link">[Logout]</button>
        }   
      </div>      
    </div>
  )
}