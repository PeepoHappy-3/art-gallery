import axios from "axios";
import { BASE_URL } from "./utils";

export const getCommissions = async (token: string)=>{
  return axios.get(`${BASE_URL}commissions/me`, {headers: {
    'Authorization': `Bearer ${token}`
  }})  
}
