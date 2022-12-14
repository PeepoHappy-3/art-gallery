
import React from "react";
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import './Submit.scss'

interface ISubmit {
  title: string,
  disabled: boolean,
  submit: (agr0: React.MouseEvent<HTMLButtonElement>)=>void
}

export const Submit = ({title, disabled, submit,}: ISubmit)=>{

  const isLoading = useSelector<RootState, boolean>(state=>state.user.isPending!);


  return (
    <button 
    className={`submit ${isLoading && 'submit_pending'}`} 
    onClick={submit}
    disabled={disabled}>
      {!isLoading ? title : ''}
    </button>
  )
}