import React from "react";
import './Checkbox.scss'

interface ICheckboxProps{
  label:string,
  checked: boolean,
  onChange: ()=>void
}
export const Checkbox = ({label, checked, onChange}: ICheckboxProps)=>{ 
  return (
    <label className="flex items-center mb-[25px] cursor-pointer">
      <input type={'checkbox'}
        checked={checked}
        onChange={onChange}
        className="absolute left-[-1000%] invisible opacity-0"/>
      <div className={`relative rounded-[5px] w-[30px] h-[30px] mr-[5px] checkbox
         after:block before:block 
       ${checked ? "bg-[#66c2c5]" : "border-[#ffffff] border-[2px] border-solid"}
       ${checked && "after:content-[''] after:rounded-[5px] after:left-[35%] after:absolute after:top-[60%] after:w-[15px] after:h-[5px] after:bg-white after:translate-y-[-100%] after:rotate-[45deg] after:translate-x-[-50%]"}
       ${checked && "before:content-[''] before:rounded-[5px] before:left-[65%]  before:absolute before:top-[27%] before:w-[15px] before:h-[5px] before:bg-white before:translate-y-[50%] before:rotate-[-45deg] before:translate-x-[-50%]"}`}></div>  
      <p className="select-none">{label}</p>
    </label>
   
  )
}