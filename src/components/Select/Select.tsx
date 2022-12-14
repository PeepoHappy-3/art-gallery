import React, { useCallback, useEffect, useState } from "react"
import {IOptions} from "../../types/options"

import './Select.scss'


interface SelectProps{
  placeholder: string,
  options: IOptions[],
  value:string|number,
  setValue: (arg0:any)=>void
}
export const Select = ({placeholder, options, value, setValue}:SelectProps)=>{
  const [focused, setFocused] = useState<boolean>(false);  
  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>)=>{    
    setFocused(true)
  }
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>)=>{
    setFocused(false)
  }
  const handleCommType = (e: React.ChangeEvent<HTMLSelectElement>)=>{   
    setValue(e.target.value);
  }  
  const checkValue =()=>{     
      return Number(value) === 0 ? false : true
  }
 
  return (    
      <label className="relative flex items-center  w-full mb-[20px]">
        <select className={`text-black h-[50px] rounded-[5px]  w-full px-[5px] z-[2]}
         ${(!checkValue()&&!focused)&&"text-[0px]"}`}
        onFocus={handleFocus}       
        onChange={handleCommType}
        onBlur={handleBlur}
        value={value}>  
          <option hidden></option>             
          {options.map((o,idx)=><option key={idx} value={o.value} className="text-[20px]">{o.name}</option>)}
        </select>
        <p className={`${focused||checkValue() ? "select-placeholder_active" : "select-placeholder_inactive"} select-placeholder`}>{placeholder}</p>
      </label>   
  )
}