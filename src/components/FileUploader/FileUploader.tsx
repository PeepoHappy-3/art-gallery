import React, {useRef, useState } from "react";

interface FileUploaderProps{
  handleFiles: (arg0: FileList | File[])=>void
  deleteFile:(arg0:string)=>void
  files: File[]
}
export const FileUploader = ({handleFiles, files, deleteFile}: FileUploaderProps)=>{
  const ref = useRef(null);  
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>)=>{
    e.preventDefault()
    e.stopPropagation()  
    setDragActive(true)    
  } 
  const handleDrop = (e:React.DragEvent<HTMLLabelElement>)=>{
    e.preventDefault()
    e.stopPropagation()
    let filteredFiles;
    if(e.dataTransfer.files&&e.dataTransfer.files[0]){ 
     filteredFiles = Array.from(e.dataTransfer.files).filter((f)=>{      
      const reg = /image/;
      return f.type.match(reg);
     })     
    handleFiles(filteredFiles)
    }
  }
  const handleLeave = (e:React.DragEvent<HTMLLabelElement>)=>{
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }
  const handleDragOver =(e:React.DragEvent<HTMLLabelElement>)=>{
    e.preventDefault()
    e.stopPropagation()
  }
  const handleChange = (files: FileList)=>{
   if(files&&files[0]){   
    handleFiles(files)
   }
  } 
  const handleDeleteFile = (name:string)=>{
    deleteFile(name)    
  }

  return (
    <>
     <label className={`flex items-center border-[3px] border-dashed rounded-[5px] px-[5px] pl-[5%] py-[5px] border-white min-h-[150px] cursor-pointer hover:opacity-[.65] w-[50%] 
      ${dragActive && "opacity-[.45] border-red"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
       <input ref={ref} type="file"
        accept=".png, .jpg, .jpeg"     
        onChange={(e)=> handleChange(e.target.files!)}
        className="invisible opacity-0 absolute left-[-1000%]" 
        multiple={true}/>      
        <p>Drop your references here or click to upload files</p>           
      </label> 
      <ul>
      {files.map((f:File,idx)=><li key = {Math.random()*idx} className="flex">
        <p className="mr-[5px]">{f.name}</p>
        <button className="text-red-800" onClick={(e : React.MouseEvent<HTMLButtonElement>)=>{
          e.preventDefault();
          handleDeleteFile(f.name)
        }}>delete</button>
      </li>)}
      </ul> 
    </>  
  )
}