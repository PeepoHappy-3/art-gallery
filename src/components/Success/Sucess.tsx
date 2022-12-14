
import './Success.scss';

import successIcon  from '../../assets/icons/success.svg';

interface SuccessProps{
  children: React.ReactNode
}
export const Success = ({children}:SuccessProps)=>{
  return (    
    <div className="w-[400px] h-[150px] py-1 px-5 flex items-center success ">
       <img src={successIcon} alt="Success(?)" className="w-[100px] mr-[30px]"/> 
      <p className='text-[#ffffff] text-[30px] leading-[1.1]'>{children}</p>
    </div>    
  )
}