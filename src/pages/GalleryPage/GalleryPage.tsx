import React, { useEffect } from "react";

import { portraitImgs } from "../../data/gallery";
import './GalleryPage.scss'

import {ReactComponent as ArrowUpIcon} from '../../assets/icons/arrow_up.svg';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setIsModalWithImgOpened, setSrc } from "../../store/modal/modalSlice";



export const GalleryPage = ()=>{
  const offset = useSelector<RootState, number>(state=>state.app.headerOffset)
  const dispatch = useDispatch()

  const handleClick = (e : React.MouseEvent<HTMLImageElement>)=>{
    const img = e.target as Element
    dispatch(setSrc(img.getAttribute('src')!))
    dispatch(setIsModalWithImgOpened(true))
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  return (
  <div className="main">    
    <h1 className="text-[32px] sm:text-[40px] leading-[1] mb-[10px]">My artworks</h1>
    <div className="gallery ">
      {offset < 0 && <button className={`fixed bottom-[30px] right-[30px] bg-[#66c2c5] z-[95] hover:opacity-[1]
      w-[69px] h-[69px] flex justify-center items-center rounded-[50%] opacity-[.85] opacity-[.65]
      transition-[opacity,.2s,ease-in-out]`}
       onClick={()=>window.scrollTo(0, 0)}>
        <ArrowUpIcon width={50} height={50} fill={'#ffffff'}></ArrowUpIcon>
      </button>}
      {portraitImgs.map((p, idx)=><img src={p} key={idx}
      alt={`img ${idx}`} className="h-[650px] object-cover object-top flex-grow cursor-pointer hover:opacity-[.85] transition-[opacity,.2s,ease-in-out]" loading="lazy"
      onClick={handleClick}/>)}
    </div>
  </div>)
}