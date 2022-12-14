import React, { useEffect } from "react";


import './About.scss';

import avatar from '../../assets/images/avatar.png';
import { useDispatch, useSelector } from "react-redux";
import { setIsModalWithFormOpened } from "../../store/modal/modalSlice";
import { resetForm } from "../../store/form/formSlice";
import { fetchAvatar } from "../../store/app/appSlice";
import { AppDispatch, RootState } from "../../store";


export const About:React.FC = ()=>{
    const dispatch = useDispatch<AppDispatch>()
    //const avatar = useSelector<RootState, string>(state=>state.app.avatar)
    const handleOpen = ()=>{
      dispatch(resetForm());
      dispatch(setIsModalWithFormOpened(true))
    } 
  

    return (
    <div className="flex flex-col-reverse justify-center items-center  mb-[30px] lg:flex-row lg:max-w-[70%] lg:mx-auto">
      <div className="lg:mr-[40px] flex flex-col 2xl:basis-2/4">
        <h1 className="text-[30px] mb-[20px] lg:text-[35px] text-center">
          Hi!
        </h1>
        <p className="text-[#708090] text-[18px] leading-none mb-[20px] ">
         This is a web site for an artist, who makes commissions, with examples of their works.
        </p>
       {/*<button  className="about__button">
          Push me
         </button>*/}
      </div>
      <div className="lg:basis-2/4 flex justify-center items-center mb-[20px] lg:mb-0">
        <div className="rounded-[50%] w-[200px] h-[200px] overflow-hidden">
          <img src={avatar} alt="" className=""/>
        </div>
      </div>
    
    </div>
  )
}