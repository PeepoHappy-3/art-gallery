import React from "react";

import patreon from '../../assets/icons/patreon.svg';
import twitter from '../../assets/icons/twitter.svg';
export const Socials = ()=>{
  const iconsStyle = 'w-[30px] h-[30px] hover:opacity-60'  
  return (
    <div>
      <ul className="flex flex-row justify-between items-center max-w-[200px] gap-[20px]">
        <li>
          <a href="#" target="blank" className=''>
              <img src={patreon} alt="" className={iconsStyle}/>
          </a>
        </li>
        <li>
          <a href="#" target="blank" className=''>
              <img src={twitter} alt="" className={iconsStyle}/>
          </a>
        </li>
      </ul>
    </div>
  )
}