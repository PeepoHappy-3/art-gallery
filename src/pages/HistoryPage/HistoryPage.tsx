import { useEffect } from "react"
import AccountNavigation from "../../components/AccountNavigation"
import CommissionsList from "../../components/CommissionsList"


export const HistoryPage = ()=>{
  useEffect(()=>{
    const token = localStorage.getItem('jwt')
    if(token){
     
    }   
  },[])

  return (
    <main className="main">
      <AccountNavigation/>
      <CommissionsList/>
    </main>
  )
}