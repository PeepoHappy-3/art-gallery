import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import './Input.scss'

interface InputProps{
  placeholder: string,
  value: string,
  type?: string,
  mb?:string,
  h?:string,
  setValue: (arg0:string)=>void
  validate? : any,
  toCompare?: string
}

export const Input = ({placeholder, value, setValue, type = 'text', mb = '20px', h='50px', validate, toCompare} : InputProps)=>{
  const [focused, setFocused] = useState<boolean>(false);  
  const [error, setError] = useState<string>()

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>)=>{    
    setFocused(true)
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>)=>{
    setFocused(false)
  }
  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>)=>{    
    setValue(e.target.value);       
  }  

 useEffect(()=>{ 
  if(validate)  { 
    if(toCompare)          
      validate(value, toCompare, setError)   
    else 
      validate(value, setError)      
  }   
 },[validate, value, toCompare])

  return (  
      <label className={`relative w-full flex items-center mb-[${mb}] input`}>
        <input type={type}
        value={value} 
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInput}        
        className={`text-black w-full h-[${h}] rounded-[5px] px-[5px] outline-none input__field mb-[8px] ${error && 'input__field_error'}`}
        />
        <p className='input__error'>{error}</p>
        <p className={`${focused||value ? "placeholder_active" : "placeholder_inactive"} placeholder`}>{placeholder}</p>
      </label>        
  )
}