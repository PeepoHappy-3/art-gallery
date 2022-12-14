import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import AccountHeader from '../AccountHeader'
import Navigation from '../Navigation'

export const Header: React.FC = () => {
  const offset = useSelector<RootState,number>(state=>state.app.headerOffset)
  const ref = useRef<HTMLHeadElement>(null)

  return (
    <header id="header" className={`top-0 container mx-auto bg-[#28313e] h-[75px] flex justify-between items-center shrink-0
     ${offset < 0 && "sticky top-[-1px] w-[100vw] my-auto h-[60px] z-[49]"}`}
     onScroll={()=>{
      console.log(ref.current?.offsetTop)
     }} ref = {ref}>
      <Link to ="/" onClick={()=>{ window.scrollTo(0,0); }}>Header Logo</Link>
      <Navigation/>
      <AccountHeader/>
    </header>
  )
}
