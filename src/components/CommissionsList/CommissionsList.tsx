import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Commission } from '../../types/commission'
import { dateFormat } from '../../utils/utils';
import './CommissionsList.scss';


export const CommissionsList = ()=>{
  const commissions = useSelector<RootState,Array<Commission>>(state=>state.commissions.commissions)

  const handleStatus = (status:String)=>{
    switch(status){
      case 'new':
        return 'commissions__status_new'
      case 'done':
        return 'commissions__status_done' 
      default:
        return ''   
    }
  }
  useEffect(()=>{
    
  },[commissions])

  return (
    <div className='commissions'>
      <h1 className='commissions__title'>Your commissions</h1>
      <ul className='commissions__list'>
        {commissions.map((c,idx)=>{
          return (<li key={idx} className='commissions__item'>
            <div className='commissions__item-header'>
              <p className={`commissions__status ${handleStatus(c.status)}`}>{c.status}</p>
              <p className='commissions__name'>Commission №{idx+1}</p> 
              <p className='commissions__name'>Name: {c.characterName}</p>          
              <p className='commissions__date'>{dateFormat(c.date)}</p>
            </div>   
            <div className='commissions__item-body'>
              <p className=''>Commission type: {c.commType}</p>       
              <p className=''>Number of characters: {c.charactersCount}</p>  
              <p className=''>Number of additional versions: {c.versionsCount}</p>
              <p className=''>Cost: {c.fullPrice} USD</p>
            </div>           
          </li>)
        })}
      </ul>
    </div>
  )
}