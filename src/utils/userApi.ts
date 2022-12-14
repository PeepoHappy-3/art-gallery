import axios from "axios";
import { signupData } from "../types/options";
import { pump } from "./api";
import { BASE_URL } from "./utils";


export const getUser = async(token:string)=>{
  return axios.get(`${BASE_URL}users/me`,{headers:{
    'Authorization': `Bearer ${token}`
  }})
}
export const signup = async ({login, email, password}:signupData)=>{
  return axios.post(`${BASE_URL}signup`, {name: login, password, email})  
}

export const signin = async ({login, password}:{login:string, password: string}) =>{
  return axios.post(`${BASE_URL}signin`, {name: login, password})
}

export const getAvatar = async (token: string)=>{
  return fetch(`${BASE_URL}users/me/avatar`, {headers: {
    'Authorization': `Bearer ${token}`
  }})
  .then(res=>{
    if(res.ok){
      const reader = res.body?.getReader();
      return new ReadableStream({
        start(controller) {          
          return pump(reader!, controller);     
        }
      })
    }
  })
  .then(stream => new Response(stream))
  // Create an object URL for the response
  .then(response => response.blob())
  .then(blob => URL.createObjectURL(blob))
  // Update image
  .then(url => {     
    return url})
}


export const updateUser = async (token:string, data : {name?:string, email?:string, twitter?:string, discord?: string})=>{
  return axios.put(`${BASE_URL}users/me/update`, data, {headers: {
    'Authorization': `Bearer ${token}`
  }})
}

export const updatePassword = async (token:string, password:string) =>{
  return axios.put(`${BASE_URL}users/me/password`, {password:password}, {headers:{
    'Authorization': `Bearer ${token}`
  }})
  .then(res=>{
    return res.data
  })
  .catch(e=>{
    throw new Error(e)
  })
}