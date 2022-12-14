export const BASE_URL = 'http://localhost:3020/'

export const spreadArray = (array : any[])=>{
  return ([] as string[]).concat(...array)
}

export const getOffsetIndex = (array:any[], name : string)=>{  
  return array.findIndex(a=>a===name) 
}
export const dateFormat = (date: Date)=>{  
  const _date = new Date(date) 
  const offset = _date.getTimezoneOffset()
  const newDate = new Date(_date.getTime() - (offset*60*1000))   
  return newDate.toISOString().split('T')[0]
}

