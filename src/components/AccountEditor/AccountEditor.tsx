import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setErrorMessage } from "../../store/user/userSlice";
import { updateUser } from "../../utils/userApi";
import { validateEmail, validateLogin, validatePassword } from "../../utils/validate";
import { Input } from "../Input/Input";

import './AccountEditor.scss';

interface AccountEditorProps{
  value?: string,
  title:string,
  submit: (arg0: string | undefined )=>Promise<any>,
  type?: string
}
export const AccountEditor = ({value, title, submit, type='none'}: AccountEditorProps)=>{ 
  const [isEditorOpened, setIsEditorOpened] = useState<boolean>(false); 
  const [editorValue, setEditorValue] = useState<string | undefined>('');  
  const [passwordConfirm, setPasswordConfirm] = useState<string|undefined>('');
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const errorMessage = useSelector<RootState>(state=>state.user.errorMessage!)

  const setValue = (e : React.KeyboardEvent<HTMLInputElement>)=>{
    setEditorValue(e.target.value)
  }
  const setEditorPasswordConfirm = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    setPasswordConfirm(e.target.value)
  }
  const editorSubmit = async ()=>{   
    submit(editorValue)             
    setIsEditorOpened(false)  
    
  }
  const validatePasswordCallback = useCallback(validatePassword,[])

  useEffect(()=>{
    if(type!=='password')
      setEditorValue(value);
    if(type==='password' || type ==='login'){
      setError(' ')
    }  
    dispatch(setErrorMessage(''))
  },[])
  
  useEffect(()=>{
    if(type==='password'){      
      validatePasswordCallback(editorValue!, passwordConfirm, setError);
    } 
    if(type==='login') {
      validateLogin(editorValue!,setError)
    }    
    if(type==='email'){
      validateEmail(editorValue!, setError)
    }
        
  },[editorValue,passwordConfirm,validatePasswordCallback,type])

  return (
    <div className={`editor`}>
      {!isEditorOpened? <p className="editor__title">{title}: <span className="editor__value">{value ? value : type==='password' ? '' : 'none'}</span></p> :
        <form className="editor__form">
          <div className="editor__column">
            <input 
            placeholder={title}
            value={editorValue!} 
            onChange={setValue}         
            className="editor__input"
            autoFocus={isEditorOpened}></input>
            {type==='password' && 
              <input 
              placeholder={'Confirm password'}
              value={passwordConfirm!} 
              onChange={setEditorPasswordConfirm}         
              className="editor__input"></input>
            }
            <p className="editor__error">{error}</p>
          </div>         
          <button 
          type="submit"
          className="editor__button editor__button_save"
          onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
            e.preventDefault();
            editorSubmit();
          }} 
          disabled={error!==''}         
          >[Save]</button>
          <button            
            className="editor__button editor__button_cancel"
            onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
            e.preventDefault();
            setEditorValue(value)
            setIsEditorOpened(false)
          }}>[Cancel]</button>
        </form>             
      }       
      {!isEditorOpened && <button className="editor__button editor__button_edit" 
      onClick={()=>{

        setIsEditorOpened(true)
      }}>{type==='password' ? '[change password]' : '[edit]'}
        </button>}
    </div> 
  )
}