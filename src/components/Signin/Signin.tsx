import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { setIsSuccessModalOpened, setSuccessText } from "../../store/modal/modalSlice";
import { getAvatar, login as signin, setIsLoggedIn} from "../../store/user/userSlice";
import { validateLogin, validatePassword, validatePasswordLength } from "../../utils/validate";
import { Input } from "../Input/Input"
import Submit from "../Submit";

export const Signin = ()=>{
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

 
  const errorMessage = useSelector<RootState, string>(state=>state.user.errorMessage!)
  const isLoading = useSelector<RootState, boolean>(state=>state.user.isPending!)

  const [login, setLogin] = useState<string>('')//('shellvi'); 
  const [password, setPassword] = useState<string>('')//('1qaz2wsx');
  const [error, setError] = useState<any>(false);

  const handleLoginChange = (value:string)=>{
    setLogin(value)
  }
  const handlePasswordChange = (value:string)=>{
    setPassword(value)
  }
  const clearInput = ()=>{
    setLogin('')   
    setPassword('')  
  }

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    try{
      await dispatch(signin({login, password})) 
      .then(async (res)=>{       
        if(res.payload){
          navigate('/') 
          dispatch(setIsLoggedIn(true)) 
        }       
      })   
      // const token = localStorage.getItem('jwt');
      // if(token){
      //   dispatch(getAvatar(token!))  
      // }
    }
    catch(e){
      console.log(e)
    }
    finally{
      clearInput()
    }
  } 
  const validatePasswordCallback = useCallback(validatePasswordLength,[])
  const validateLoginCallback = useCallback(validateLogin,[])
 
  useEffect(()=>{   
    if(!validateLoginCallback(login) 
    || !validatePasswordCallback(password)){
      setError(true)
    } else {
      setError(false)
    }
  },[validateLoginCallback, validatePasswordCallback, login, password, errorMessage])

  return (   
    <div className="sm:w-[40%]">
      <h1 className="text-[40px] mb-[20px]">Sign in</h1>
      <form className="w-full">
        <Input placeholder={'login *'} value={login} setValue={handleLoginChange} validate={validateLogin}/>          
        <Input placeholder={'Password *'} 
        value={password} 
        setValue={handlePasswordChange} 
        type={'password'} 
        validate={validatePasswordLength}/>         
        {/* <button type="submit" 
        onClick={handleSubmit} 
        className='submit'>Sign in </button> */}
        <Submit submit={handleSubmit} title={'Sign in'} disabled={error}/>
        <p className="mt-[15px] text-red-700 text-[20px]">{errorMessage}</p>
      </form>
      <p>Dont't have an account? <Link to='/signup' className="underline text-blue-500">Sign up</Link></p>
    </div>    
  )
}