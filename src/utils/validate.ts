import { useSelector } from "react-redux"
import { RootState } from "../store"


export const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const loginRegExp = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/

export const validateEmail = (email:string, dispatch?: (arg0:string)=>void)=>{
  if(String(email).toLowerCase().match(emailRegExp)){   
    if(dispatch)  
      dispatch('') 
    return true     
  } else {   
    if(dispatch)  
    dispatch('Incorrect email')
    return false     
  }
}
export const validateLogin = (login:string, dispatch?: (arg0: string)=>void)=>{   
  if(!String(login).toLowerCase().match(loginRegExp)){
    if(dispatch){
      dispatch('Login should consist only of letters and digits')      
    } 
    return false
  }
  if(login.length < 3) {
    if(dispatch)
      dispatch('Login should be at least 3 characters long')
    return false
  }    
  if(dispatch)
    dispatch('')
  return true  
  }  

export const validatePasswordLength = (password: string, dispatch?:(arg0:string)=>void)=>{
  if(password.length >= 8){
    if(dispatch)     
      dispatch('')
    return true;
  } else {
    if(dispatch)
      dispatch('Password need to be at least 8 characters long')
    return false
  }
}

export const validatePassword =(password: string,  passwordConfirm?:string ,  dispatch?:(arg0:string)=>void)=>{  
  if(passwordConfirm){
    if(password !== passwordConfirm){    
      if(dispatch){
        dispatch('Passwords doesn\'t match')
      }
      return false
    } else {
      if(dispatch)
        dispatch('')
      if(password.length >= 8){
        if(dispatch)
          dispatch('')          
        return true
      } else {
        if(dispatch)
         dispatch('Password need to be at least 8 characters long')
        return false
      }       
    }
  }
}

