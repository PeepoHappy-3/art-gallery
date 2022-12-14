import React, { useEffect } from "react";

export const InfoPage: React.FC = ()=> {

  const informationTextStyle = "text-[20px] text-[#708090]";

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <main className="main">
       <div className="">
          <h2 className="text-[30px]">
             Commission info
          </h2>          
          <ul className={`${informationTextStyle} mb-[20px]`}>
            <li className="">
              <p>1. Commission type (headshot/ waist/ knees/ fullbody)</p>
            </li>
            <li className="">
              <p>2. Number of characters</p>
            </li>
            <li className="">
            <p>3. Additional versions of art</p>
            </li>
            <li className="">
              <p>4. Character info</p>
              <ul className="">
                <li className="">
                <p>- Name/age</p>
                </li>
                <li className="">
                <p>- Personality</p>
                </li>
                <li className="">
                <p>- Reference pictures (or at least good description and color scheme, but note that I cannot read your mind)</p>
                </li>
                <li className="">
                <p>- Everything else that is important and can help. Try to give me as much info as possible that will help convey the character of your OC in the art.</p>
                </li>
              </ul>
             </li>
             <li className="">
              <p>5. References of pose/action/emotion. You may leave it to me, but if you want a specified one, fill this.</p>
            </li>
            <li className="">
            <p>6. Background description (if detailed background is chosen) with references. </p>
            </li>
            <li className="">
            <p>7. Extra information, important details (if you have something else to tell about your order)</p>
            </li>           
          </ul>
          <div className="">
            <h2 className="text-[25px]">
              Important note
            </h2> 
            <p className={informationTextStyle}>
                There should be some important info.
              </p>          
          </div>
        </div>      
    </main>
  )
}