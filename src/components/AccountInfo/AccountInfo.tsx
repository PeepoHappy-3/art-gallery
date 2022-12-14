import React, { useState } from "react"
import { AppDispatch, RootState } from "../../store"
import { setErrorMessage, updateUser, UserProps } from "../../store/user/userSlice"
import { useDispatch, useSelector } from "react-redux"

import './AccountInfo.scss';
import AccountEditor from "../AccountEditor";
import axios from "axios";
import { updatePassword } from "../../utils/userApi";
import { setIsSuccessModalOpened, setSuccessText } from "../../store/modal/modalSlice";

export const AccountInfo : React.FC = ()=>{
  const user = useSelector<RootState, UserProps>(state=>state.user)
  const dispatch = useDispatch<AppDispatch>()
  const errorMessage = useSelector<RootState, string>(state=>state.user.errorMessage!)

  const submitName = async (name :string | undefined)=>{
    const token = localStorage.getItem('jwt')    
    if(token){       
      const data = {token, uploadData: {name:name}}
      return dispatch(updateUser(data))      
    } 
  }
  const submitEmail = async (email: string | undefined)=>{
    const token = localStorage.getItem('jwt')    
    if(token){       
      const data = {token, uploadData: {email:email}}
      dispatch(updateUser(data))
      .then(res=>{

      })
    } 
  }
  const submitTwitter = async (twitter: string | undefined)=>{
    const token = localStorage.getItem('jwt')    
    if(token){       
      const data = {token, uploadData: {twitter:twitter}}
      dispatch(updateUser(data))
      .then(res=>{

      })
    } 
  }
  const submitDiscord = async (discord: string | undefined)=>{
    const token = localStorage.getItem('jwt')    
    if(token){       
      const data = {token, uploadData: {discord:discord}}
      dispatch(updateUser(data))
      .then(res=>{

      })
    } 
  }
  const submitPassword = async (password: string|undefined)=>{
    const token = localStorage.getItem('jwt')
    if(token){
        updatePassword(token,password!)
        .then(res=>{
          dispatch(setSuccessText('New password applied'))
          dispatch(setIsSuccessModalOpened(true))
          setTimeout(()=>{
            dispatch(setIsSuccessModalOpened(false))
          }, 1500)
        })
        .catch((e:Error)=>{
          dispatch(setErrorMessage(e.message as string))
        })
        .finally(()=>{
          
        })
    }
  }
  return (
    <section className="account">
      <h1 className="account__title">Your profile</h1>
      <div className="account__inner">      
        <div className="account__img-wrap">
          <img src={user.avatar} alt="" />
        </div>
        <div className="account__body">  
          <div className="account__column">
            <h2 className="account__subtitle">Contact info:</h2>
            <AccountEditor title= {'User name'} value={user.name} submit={submitName} type={'login'}/>
            <AccountEditor title = {'Email'} value={user.email} submit={submitEmail} type={'email'}/>      
            <AccountEditor title = {'Discord tag'} value={user.discord} submit={submitDiscord}/>
            <AccountEditor title = {'Twitter'} value={user.twitter} submit={submitTwitter}/>
          </div>
          <div className="account__column">
            <AccountEditor title={'Password'} value={''} submit={submitPassword} type={'password'}/>
          </div>          
        </div>
        <p>{errorMessage}</p>            
      </div>
    </section>
  )
}