import React from "react";
import { useSelector } from "react-redux";
import { Navigation} from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/swiper.scss';
import { RootState } from "../../store";
import { getOffsetIndex } from "../../utils/utils";
import './FullscreenSlider.scss'

interface FullscreenSliderProps {
  array: string[],
}
export const FullscreenSlider = ({array}:FullscreenSliderProps)=>{ 
  const src = useSelector<RootState, string>(state=>state.modal.src)
  return (
    <div className="fullscreen-slider">
      <Swiper
        modules={
          [Navigation,]      
        }     
        slidesPerView={1}  
        loop    
        initialSlide={getOffsetIndex(array, src)}
        navigation ={{
          prevEl: `.full-prev`,
          nextEl: `.full-next`,
        }}  
        className=""
        >  
        {array.map(a=>{
          return <SwiperSlide className="relative self-center flex justify-center items-center" key={a}>
            <img src={a} alt={a} className="relative max-h-[100vh] h-full max-w-[70%] object-contain"/>
          </SwiperSlide>
        })}  
      </Swiper>
      <div className={`full-prev prev arrow`}></div>
      <div className={`full-next next arrow`}></div>    
    </div> 
  )
}