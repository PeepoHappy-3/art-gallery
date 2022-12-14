import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './Navigation.scss';

export const Navigation: React.FC = ()=>{
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const handleBurgerClick =()=>{
    setIsOpened(prev=>!prev)
  }

  const handleLinkClick = ()=>{
    setIsOpened(false)
  }
  useEffect(()=>{
    if(isOpened){
      document.body.classList.add('body-blocked')
    }
    return ()=>{
      document.body.classList.remove('body-blocked')
    }
  })
  return (
    <nav className="text-3xl flex relative">
      <div className={`navigation__burger visible sm:invisible ${isOpened && "navigation__burger_active"}`}
        onClick={handleBurgerClick}>
        <span className="navigation__burger-line"></span>
        <span className="navigation__burger-line"></span>
        <span className="navigation__burger-line"></span>
      </div>
      <ul className={`flex gap-[10px] navigation__list ${isOpened && "navigation__list_opened"}`}>
        <li className="navigation__item">
            <NavLink to ="/" className="navigation__link text-[20px] leading-[1]" 
            onClick={(e)=>{
              e.stopPropagation() 
              handleLinkClick()            
            }}>Home</NavLink>
          </li>
        <li className="navigation__item">
          <NavLink to ="/gallery" className="navigation__link text-[20px] leading-[1]" 
          onClick={(e)=>{
            e.stopPropagation()
            handleLinkClick()
          }}>Artworks</NavLink>
        </li>         
        <li className="navigation__item">
          <NavLink to ="/info" className="navigation__link text-[20px] leading-[1]"
           onClick={(e)=>{
            e.stopPropagation()
            handleLinkClick()
          }}>Information</NavLink>
        </li>       
        <li className="navigation__item">
          <NavLink to ="/commission" className="navigation__link text-[20px] leading-[1]"
           onClick={(e)=>{
            e.stopPropagation()
            handleLinkClick()
          }}>Make commission</NavLink>
        </li>   
      </ul>     
    </nav>
  )
}