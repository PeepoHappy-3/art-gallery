import React, {useEffect, useState } from "react";
import About from "../../components/About";
import MainSlider from "../../components/MainSlider";



import { sliderImages } from "../../data/gallery";
import { albumImages } from "../../data/gallery";
import { SliderOptions } from "../../types/options";

const mainSliderOptions :SliderOptions = {
  slidesPerViewDef: 1.5,
  slidesPerView700: 3.5,
  slideWidth: 400,
  nextArrow: 'main-next',
  prevArrow:'main-prev'
}

const additionalSliderOptions: SliderOptions = {
  slidesPerViewDef: 1.2,
  slidesPerView700: 2.5,
  slideWidth: 700,
  nextArrow: 'add-next',
  prevArrow:'add-prev'
}
export const MainPage:React.FC = ()=>{
  const [images, setImages] = useState<string[][]>([]);
  const [moreImages, setMoreImages] = useState<string[][]>([]);

  
  useEffect(()=>{
    setImages(sliderImages);
    setMoreImages(albumImages);
    window.scrollTo(0,0);    
  }, [])

  return (
    <main className="main">
      <About/>
      <MainSlider images = {images}  options={mainSliderOptions} title={'Artworks'}/>
      <MainSlider images={moreImages} options={additionalSliderOptions}/>
    </main>
  )
}