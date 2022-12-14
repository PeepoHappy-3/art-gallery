import React from "react";
import './Range.scss'

type Options = {
  min: number,
  max:number
}

interface RangeProps{
  placeholder: string,
  options: Options,
  value:string|number,
  setValue: (arg0:any)=>void
}

export const Range = ({placeholder, options, value, setValue} : RangeProps)=>{

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value)
  }
  return (
    <label className="sm:mb-[20px] sm:w-full">
      <p className="">{placeholder}</p>
      <div className={`flex gap-[5px] sm:gap-[20px] items-center`} >
        <input type="range" onChange={handleChange} value={value} min={options.min} max={options.max}
        className={`w-full range`}/>
        <span className="m-[0]">{value}</span>
      </div>   
    </label>
  )
}