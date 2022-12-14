import React from "react";
import Socials from "../Socials";

export const Footer: React.FC= ()=>{
  return (
    <footer className="justify-self-end mt-auto container mx-auto bg-[#28313e] h-[75px] flex items-center justify-between shrink-0">
      <div>
        <p>
          &copy; Privet
        </p>
      </div>
      <Socials/>
    </footer>
  )
}