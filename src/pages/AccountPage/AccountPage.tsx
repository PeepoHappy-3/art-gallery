import AccountInfo from '../../components/AccountInfo'
import AccountNavigation from '../../components/AccountNavigation'
import './AccountPage.scss'

export const AccountPage = ()=>{
  return (
    <main className='main'>
      <AccountNavigation/>
      <AccountInfo/>
    </main>
  )
}