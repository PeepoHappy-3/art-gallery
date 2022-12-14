import React, { useState } from "react";

import './Textarea.scss';

interface InputProps{
  placeholder: string,
  value: string,
  setValue: (arg0:React.KeyboardEvent<HTMLTextAreaElement>)=>void
}

export const Textarea = ({placeholder, value, setValue} : InputProps)=>{
  
  const [focused, setFocused] = useState<boolean>(false);  
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>)=>{    
    setFocused(true)
  }
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>)=>{
    setFocused(false)
  }
  const handleInput = (e: React.KeyboardEvent<HTMLTextAreaElement>)=>{
    //setContact(e.target.value);
    setValue(e);
  }  

  return (
    <label className="relative w-full flex items-center mb-[10px]">
      <textarea  value={value} 
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInput}        
        className="text-black w-[100%] h-[200px] rounded-[5px] px-[5px] outline-none resize-none"></textarea>
        <p className={`${focused||value ? "textarea-placeholder_active" : "textarea-placeholder_inactive"} textarea-placeholder`}>{placeholder}</p>
    </label>
  )
}