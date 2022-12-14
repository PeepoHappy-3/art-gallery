import React, { useCallback, useEffect, useRef, useState } from "react";

import {ReactComponent as PlayButton} from '../../assets/icons/play.svg';
import {ReactComponent as PauseButton} from '../../assets/icons/pause.svg';
import { useDispatch, useSelector} from "react-redux";
import {setSrc, setIsModalWithImgOpened,setIsFullScreensliderModalOpen} from '../../store/modal/modalSlice'
import { RootState } from "../../store";

interface ImageSwitcherProps{
  images: string[],
  delay: number,
}
export function ImageSwitcher({images, delay}: ImageSwitcherProps){

 const dispatch = useDispatch()
  const src = useSelector<RootState, string>(state=>state.modal.src)
  
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isPlaying, setIsPLaying] = useState<boolean>(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const switchtImageCallback = useCallback(()=>{
      if(currentImage < images.length-1){
        setCurrentImage(prev=>prev+1);
      } else {
         setCurrentImage(0); 
      }         
  },[currentImage,images])

  const startCallback = useCallback(()=>{
    const interval = setInterval(switchtImageCallback, delay)
    intervalRef.current = interval;     
  },[switchtImageCallback, delay])

  useEffect(()=>{

    if(images.length > 1){
      startCallback();
      return ()=>{
        clearInterval(intervalRef.current)
      }
    }
  
  },[startCallback, images]);

  const toggleSwith = (e : React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    e.stopPropagation();    
    if(isPlaying){
      clearInterval(intervalRef.current)
      setIsPLaying(false);      
    } else {
      startCallback();
      setIsPLaying(true);
    }
  }

  const handleClick =(e: React.MouseEvent<HTMLImageElement>)=>{
    const img = e.target as Element;
    dispatch(setSrc(img.getAttribute('src')!))      
    dispatch(setIsFullScreensliderModalOpen(true))   
  }
  return (
    <div className="relative overflow-hidden">
     {images.length > 1 && <button className="absolute z-50 top-[15px] right-[15px] h-[30px] w-[30px] bg-none border-none
      hover:opacity-60"
      onClick={toggleSwith}>
        {((isPlaying && <PauseButton width="30px" className=""></PauseButton>) || <PlayButton width="30px"></PlayButton>)}
      </button>} 
      <img src={images[currentImage]} alt="" className="relative z-0 object-cover h-[400px] 
      w-full object-top hover:opacity-[.85] cursor-pointer transition-[opacity,.2s,ease-in] hover:scale-[1.1]"
       onClick={handleClick}/>         
    </div>
  )
}