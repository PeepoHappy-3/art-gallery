import React, { useCallback, useEffect, useState} from "react";

import './Modal.scss';
import {ReactComponent as CloseIcon} from '../../assets/icons/close.svg';

interface ModalProps{
  isOpen: boolean,
  children: React.ReactNode, 
  onClose: ()=>void
  light?:boolean, 
}

export const Modal = ({children, onClose, isOpen, light = true}:ModalProps )=>{ 

  const closeOnEscape = useCallback((e: KeyboardEvent)=>{        
    if(e.key==='Escape')
      onClose();
  },[onClose])

  const closeButtonHandler = ()=>{
    onClose()
  }
  useEffect(()=>{   
       document.addEventListener('keyup', closeOnEscape)  
       if(isOpen){
        document.body.classList.add('body-blocked');       
       }    
       return ()=>{
        document.removeEventListener('keyup', closeOnEscape)  
        document.body.classList.remove('body-blocked');
       }
  },[closeOnEscape,isOpen])


  return (
    <>    
    {<div className={`fixed top-0 left-0  right-0 bottom-0 z-[98]
     transition-[all,.5s,ease-in-out]    
     ${isOpen ? "visible opacity-[1] w-[100%]" : "invisible opacity-[0] w-[0]"}`} > 
          <div className={`fixed ${light ? 'bg-black/50' : 'bg-black'} top-0 right-0 left-0 bottom-0 z-[99]
            modal__overlay`}
            onClick={onClose}  tabIndex={0}>           
          </div>  
          <button onClick={closeButtonHandler} className={`absolute top-[0] right-[0] z-[102] text-[30px]
           hover:opacity-[.65] transition-[opacity,.2s,ease-in,.2s] bg-black rounded-[50%] w-[50px] h-[50px]
           flex justify-center items-center
           modal__button`}>
            <CloseIcon width={40} height={40} fill={'#ffffff'}/>
          </button>                          
          <div className={`absolute z-[101] rounded-[10px]  
          sm:top-[50%] sm:translate-y-[-50%] sm:translate-x-[-50%] z-[101] sm:max-w-[70%] sm:w-[unset] sm:h-[unset] sm:left-[50%] modal
          max-w-[100vw] w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] `}>
          {/* <div className="absolute top-0 left-0 w-full h-[45px] bg-black/50 z-[101]"></div> */}
          
            {isOpen &&  children}
          </div>         
         </div>
      }
    </>    
  )
}