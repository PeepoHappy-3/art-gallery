import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../Input/Input";
import '../../global.scss';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addUser, setErrorMessage, UserProps } from "../../store/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { setIsSuccessModalOpened, setSuccessText } from "../../store/modal/modalSlice";
import { setPasswordConfirm as dispatchPasswordConfirm } from "../../store/app/appSlice";
import { validateEmail, validateLogin, validatePassword } from "../../utils/validate";
import Submit from "../Submit";

export const Signup = ()=>{
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const user = useSelector<RootState, UserProps>(state=>state.user)
  const errorMessage = useSelector<RootState, string>(state=>state.user.errorMessage!)

  const [login, setLogin] = useState<string>('')//('shellvi2');
  const [email, setEmail] = useState<string>('')//('ya@ya.ru');
  const [password, setPassword] = useState<string>('')//('1qaz2wsx');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  //const passwordConfirm = useSelector<RootState,string>(state=>state.app.passwordConfirm!)

  const [error, setError] = useState<any>()

  const handleLoginChane = (value:string)=>{
    dispatch(setErrorMessage(''))
    setLogin(value)
  }
  const handleEmailChange = (value:string)=>{
    dispatch(setErrorMessage(''))
    setEmail(value)
  }
  const handlePasswordChange = (value:string)=>{
    dispatch(setErrorMessage(''))
    setPassword(value)
  } 

  const handlePasswordConfirmChange = (value:string)=>{
    dispatch(setErrorMessage(''))
    setPasswordConfirm(value)
  }

  const clearInput = ()=>{
    //setLogin('')
    //setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }
  const dispatchErrorMessage = useCallback((value: string)=>{
    dispatch(setErrorMessage(value))
  },[dispatch])

  const validateEmailCallback = useCallback(validateEmail,[])
  const validatePasswordCallback = useCallback(validatePassword,[])
  const validateLoginCallback = useCallback(validateLogin,[])
 
  useEffect(()=>{   
    if(!validateLoginCallback(login) 
    || !validatePasswordCallback(password, passwordConfirm)
    || !validateEmailCallback(email)){
      setError(true)
    } else {
      setError(false)
    }
  },[validateLoginCallback, validatePasswordCallback,validateEmailCallback,dispatchErrorMessage,
     login, password, passwordConfirm,email, errorMessage])

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
   try{
      await dispatch(addUser({login, email, password}))   
      .then(res=>{
        if(res.payload){
          navigate('/');
          dispatch(setSuccessText('Thank you for signing up!'))
          dispatch(setIsSuccessModalOpened(true))         
        }      
        //navigate('/');
       // dispatch(setSuccessText('Thank you for signing up!'))
        //dispatch(setIsSuccessModalOpened(true))
      })     
    } catch(e:any){        
      setError(e)
    } finally{
      clearInput();
    }
  }

  useEffect(()=>{
    
  }, [error])

  return (
    <div className="sm:w-[40%]">
      <h1 className="text-[40px] mb-[20px]">Sign up</h1>
      <form className="w-full">
        <Input placeholder={'login *'}
        value={login}
        setValue={handleLoginChane}      
        validate={validateLogin}/>    
        <Input placeholder={'email *'}
        value={email}
        setValue={handleEmailChange}
        validate={validateEmail}/>  
        <Input placeholder={'Password *'}
        value={password}
        setValue={handlePasswordChange}
        type={'password'} 
        validate={validatePassword}
        toCompare={passwordConfirm} />  
        <Input placeholder={'Password confirm *'} 
        value={passwordConfirm}
        setValue={handlePasswordConfirmChange} 
        type={'password'}
        validate={validatePassword}
        toCompare={password}/>  
        {/* <button type="submit" onClick={handleSubmit} className='submit' disabled={error}>signup</button> */}
        <Submit title={'Sign Up'} submit={handleSubmit} disabled={error}/>
        <p className="mt-[15px] text-red-700 text-[20px]">{errorMessage}</p>
      </form>
      <p>Already have an account? <Link to='/signin' className="underline text-blue-500">Sign in</Link></p>
    </div>
  )
}