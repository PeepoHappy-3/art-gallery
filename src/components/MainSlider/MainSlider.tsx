import React from "react";
import { Navigation} from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';
import ImageSwitcher from "../ImageSwitcher";

import 'swiper/swiper.scss';
import './MainSlider.scss';
import { SliderOptions } from "../../types/options";
import { useDispatch } from "react-redux";
import {setIsFullScreensliderModalOpen } from "../../store/modal/modalSlice";




interface MainSliderProps{
  images: string[][],  
  title?:string,
  options: SliderOptions
}

export const MainSlider = ({images,title, options} : MainSliderProps)=>{
  const {slidesPerViewDef, slidesPerView700, slideWidth, nextArrow, prevArrow} = options;
  const dispatch = useDispatch();

  return (
    <div className="lg:max-w-[70%] lg:mx-auto">
      <h2 className="text-[30px] mb-[5px] sm:mb-[10px]">{title}</h2>
      <div className="relative">
        <Swiper
          modules={
            [Navigation,]      
          }
          spaceBetween={5}
          slidesPerView={slidesPerViewDef}
          breakpoints={
            {                
              768:{
                spaceBetween:10, 
                slidesPerView:slidesPerView700,            
              }
            }
          }
          navigation ={{
            prevEl: `.${prevArrow}`,
            nextEl: `.${nextArrow}`,
          }}    
          >
          {images.map((img, idx)=>
            <SwiperSlide className={`max-h-[${slideWidth}px}] lg:max-h-[500px]`} key={idx} onClick={()=>{  
             
            }}>
                <ImageSwitcher images = {img} delay={1500}/>
            </SwiperSlide>)}
        </Swiper>
        <div className={`${prevArrow} prev arrow`}></div>
        <div className={`${nextArrow} next arrow`}></div>    
      </div>   
    </div>
  
  )
}