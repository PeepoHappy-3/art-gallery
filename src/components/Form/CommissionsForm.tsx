import React, {useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCharacterName, setCommType, setCharactersCount,setVersionsCount, setInformation} from "../../store/form/formSlice";
import { Input } from "../Input/Input";
import Select from "../Select";

import './CommissionsForm.scss';
import { UploadData, IOptions } from "../../types/options";
import FileUploader from "../FileUploader";
import Checkbox from "../Checkbox";
import Textarea from "../Textarea";
import Range from "../Range";
import axios from "axios";
import { setIsModalWithFormOpened, setIsSuccessModalOpened, setSuccessText } from "../../store/modal/modalSlice";
import { validateLogin } from "../../utils/validate";



 const commTypesOptions:IOptions[] = [
  {name: 'Portrait (125 USD)', value:'head',},
  {name: 'Half (150 USD)', value:'half',},
  {name: 'Knees (175 USD)', value:'knees',},
  {name: 'Full body (200 USD)', value: 'full', }
]
interface FormProps{
  height?: string
}
const VERSION_PRICE:number = 25

export const Form = ({height} : FormProps)=>{

  const characterName = useSelector<RootState, string>(state=>state.form.characterName);
  const commType = useSelector<RootState, string>(state=>state.form.commType);
  const charactersCount = useSelector<RootState, number>(state=>state.form.charactersCount);
  const versionsCount = useSelector<RootState, number>(state=>state.form.versionsCount);
  const [background, setBackground] = useState<boolean>(false)
  const information = useSelector<RootState, string>(state=>state.form.information);
  const [files, setFiles] = useState<File[]>([]); 
  const [bodyPrice, setBodyPrice] = useState<number>(0);
  const [backgroundPrice, setBackgroundPrice] = useState<number>(0)
  const [fullPrice, setFullPrice] = useState<number>(0);
  const [form, setForm] = useState<UploadData>()
  const [isFieldsEmpty, setIsFieldsEmpty] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [oldPrice, setOldPrice] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const dispatch = useDispatch();

  const setCharacterNameValue = (value: string)=>{
    dispatch(setCharacterName(value))
  }

  const setCommTypeValue = (option : string)=>{
    dispatch(setCommType(option))
  }
  const setCharactersValue = (option: number)=>{
    dispatch(setCharactersCount(option))
  }
  const setVerionsValue = (option:number)=>{
    dispatch(setVersionsCount(option));
  }
  const setInformationValue = (e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
    dispatch(setInformation(e.target.value));
  }
  const checkFields = useCallback((form:UploadData)=>{
    if (!form?.commType || !form?.characterName){
      setError('All fields with * must be filled')
      setIsFieldsEmpty(true)
    } else {
      setError('')
      setIsFieldsEmpty(false)
    }   
  },[])

  const setFilesValue = (data : FileList | File[])=>{ 
    Array.from(data).forEach(f=>{
      if(f.size > 10e6){
        setError('One of your files is larger than 10MB')
      }
    })  
    setFiles(prev =>[...prev!,...data]);   
  }
  const deleteFile = (i:string)=>{
    setFiles(prev=>prev.filter((p)=>{
      return p.name !== i;
    }))
  } 

  const createFormData = (form : UploadData, files: File[])=>{
    const formData = new FormData()  
    let key : keyof typeof form 
    for(key in form){
      formData.append(key, String(form[key]))
    }
    files?.forEach((f)=>{
      formData.append('images', f)
    })
    return formData
  }

  /***                                move api to separated component                                     */
    
   const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()    
    // const formData = new FormData()
    // formData.append('characterName', characterName)
    // formData.append('commType', commType)
    // formData.append('charsCount', String(charactersCount))
    // formData.append('versionsCount', String(versionsCount))
    // formData.append('price', String(fullPrice))    
    // files?.forEach((f)=>{
    //   formData.append('images', f)
    // }) 

    const data = createFormData(form!, files)
    try{
     const token = localStorage.getItem('jwt')
     await axios.post('http://localhost:3020/commissions',(data),{headers:{
      'Authorization': `Bearer ${token}`
     }}).then((res)=>{
      dispatch(setIsModalWithFormOpened(false))    
      dispatch(setSuccessText('Thank you! I\'ll contact you soon!'))
      setTimeout(()=>{      
      dispatch(setIsSuccessModalOpened(true))
      }, 500)
    })
    } catch(e){
       
    }   
   
  }

  const updatePriceCallback = useCallback((n: number)=>{
   const interval = setInterval(()=>{
    if(fullPrice > oldPrice){
      setOldPrice(prev=>prev+n)    
    } 
    if(fullPrice < oldPrice){
      setOldPrice(prev=>prev-n)
    }
    if(fullPrice === oldPrice){
      clearInterval(intervalRef.current)
    }
    intervalRef.current=interval;
   }, 0)
  },[oldPrice, fullPrice])

  /*************************************************************************************************************************/
  useEffect(()=>{
    switch(commType){
      case 'full':
        setBodyPrice(200);
        break;
      case 'knees':  
        setBodyPrice(175);
        break;
      case 'half':  
        setBodyPrice(150);
        break;   
      case 'head':  
        setBodyPrice(125);
        break;    
      default: 
        setBodyPrice(0);
        break; 
    }
    if(background) {
      setBackgroundPrice(50)
    } else {
      setBackgroundPrice(0)
    }

    setForm(prev=>{return {characterName, commType, charactersCount, versionsCount,information, background, fullPrice}})

    setFullPrice((bodyPrice*charactersCount) + (VERSION_PRICE*versionsCount) + backgroundPrice); 
    updatePriceCallback(1); 
    return ()=>{
      clearInterval(intervalRef.current)
    }  
  },[commType,bodyPrice,fullPrice,oldPrice,charactersCount,versionsCount,characterName,
    files,background,backgroundPrice,information,updatePriceCallback])


  useEffect(()=>{
    checkFields(form!)
  },[form,checkFields,isFieldsEmpty])

  return (
    <form className={`bg-[#181f2a] w-full sm:w-[50%] flex flex-col p-[10px] relative form ${height}`} >
      <h2 className="text-[32px] mb-[15px]">Commission</h2>     
      <Input placeholder="Character name *" setValue={setCharacterNameValue} value={characterName} validate={validateLogin}></Input>   
      <Select options={commTypesOptions} placeholder={'Commission type*'} setValue={setCommTypeValue} value={commType}></Select>  
      <Range placeholder={'Characters count'}
      setValue={setCharactersValue}
      value={charactersCount}
      options={{min:1, max: 2}}></Range>
      <Range placeholder={'Versions count (10-25 USD each)'}
      setValue={setVerionsValue}
      value={versionsCount}
      options={{min:1, max: 5}}></Range>
      {/* <Select options={charactersCountOptions} 
      placeholder={'Additional characters count*'}
      setValue={setCharactersValue}
      value={charactersCount}></Select> */}
      {/* <Select options={versionsCountOptions}
       placeholder={'Versions count (10-25 USD each)*'}
       setValue={setVerionsValue}
       value = {versionsCount}></Select> */}
      <Checkbox label={'Background (50 USD)'} checked={background} onChange={()=>setBackground(!background)}/>
      <Textarea placeholder="Tell me about your character, background or other extra info" 
      setValue={setInformationValue}
      value={information}/>
      <FileUploader handleFiles={setFilesValue} files={files} deleteFile={deleteFile}></FileUploader> 
      <p className="text-[24px] leading-none my-[15px]">Price: {oldPrice} USD</p>
      <button type="submit"
       onClick={handleSubmit}
       className="form__submit max-w-[50%] min-h-[50px] text-[20px] hover:opacity-[.85]"
       disabled={isFieldsEmpty}>Submit</button>
      {error && <p className="text-[red]">{error}</p>}      
    </form>
  )
}