import { Link } from "react-router-dom"
import './ForbidenPage.scss';

export const ForbidenPage = ()=>{
  return (
    <main className="main">
      <div className="forbiden">
        <h1 className="forbiden__title">
          To continue you need to  <Link to='/signin' className="forbiden__link">sign in</Link>.  
        </h1>
      </div>
    
    </main>
  )
}