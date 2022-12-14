import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signupData } from "../../types/options";
import { getUser as fetchUser, signin, signup, getAvatar as fetchAvatar, updateUser as updateUserCallback } from "../../utils/userApi";
import DefaultAvatar from '../../assets/images/default_avatar.webp';
import { User } from "../../types/user";


export interface UserProps{
  name: string,
  email: string,
  errorMessage?: string,
  token:string,
  twitter?: string,
  discord?:string,
  isLoggedIn?: boolean,
  avatar?:string,
  isPending?:boolean
}

const initialState : UserProps = {
  name: '',
  email: '',
  errorMessage: '', 
  token: '',
  isLoggedIn: false,
  avatar: DefaultAvatar,
  discord:'',
  twitter:'',
  isPending: false
}


const handleError = (e:any)=>{
  if(e.response.data)
    throw new Error(e.response.data.message)
  else
    throw new Error('Server is unavailable')
}
export const getAvatar = createAsyncThunk('user/getAvatar',
async (token:string)=>{
  return await fetchAvatar(token)
  .then(res=>{
    return res
  })
})

export const addUser = createAsyncThunk('user/addUser',
async (data: signupData)=>{
  const {login,password,email} = data;
  return await signup({login, password, email})  
  .then(res=>{       
    //if(res.status === 201) 
      return res.data.data       
  }) 
  .catch(e=>{  
    //console.log(e.response.data.message)
    handleError(e)
  })
})

export const getUser = createAsyncThunk('user/getUser',
async (token:string)=>{
  return await fetchUser(token)
  .then(res=>{   
    return res.data.data
  })
})
export const updateUser = createAsyncThunk('user/update',
async (data : {
  token: string,
  uploadData: User
  })=>{
  return await updateUserCallback(data.token, data.uploadData)
  .then(res=>{
    return res.data.data
  })
  .catch(e=>{
    handleError(e)
  })
})
export const login = createAsyncThunk('user/login',
  async (data : {login: string, password:string})=>{
    const {login, password} = data;
    return await signin({login, password})
    .then(res=>{
      if(res.data.token){
        localStorage.setItem('jwt', res.data.token)
        return res.data.token
      }     
    }).then(async res=> {   
      return await fetchUser(res)
      .then(res=>{ 
        return res.data.data
      })
    })
    .catch(e=>{
      handleError(e)
    })
})

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    setIsLoggedIn: (state, action: PayloadAction<boolean>)=>{
      state.isLoggedIn = action.payload
    },
    clearUser : (state)=>{
      state.name = ''
      state.email = ''
      state.token = ''  
      state.avatar = DefaultAvatar   
    },
    setErrorMessage :(state, action:PayloadAction<string>)=>{
      state.errorMessage = action.payload
    }
  },
  extraReducers:{
    [String(addUser.fulfilled)]: (state, action: PayloadAction<UserProps>)=>{     
      //state.name = action.payload.name
      //state.email = action.payload.email
      state.isPending = false
    },    
    [String(addUser.rejected)] : (state, action) =>{  
      state.errorMessage = action.error.message
      state.isPending = false
    },
    [String(addUser.pending)]:(state, action)=>{     
      state.isPending = true
    },
    [String(login.fulfilled)] : (state, action: PayloadAction<UserProps>)=>{
      //state.name = action.payload.name 
      state.isPending = false        
    },
    [String(login.rejected)] : (state, action) =>{     
      state.errorMessage = action.error.message
      state.isPending = false
    },
    [String(login.pending)]:(state, action)=>{     
      state.isPending = true
    },
    [String(getUser.fulfilled)]:(state, action)=>{
      state.name = action.payload.name
      state.email = action.payload.email
      state.twitter = action.payload.twitter
      state.discord = action.payload.discord  
      state.isLoggedIn = true;
    },    
    [String(getAvatar.fulfilled)] : (state, action)=>{      
      state.avatar = action.payload !=='' ? action.payload : initialState.avatar
    },
    [String(getAvatar.rejected)]:(state)=>{
      state.avatar = DefaultAvatar
    },
    [String(updateUser.fulfilled)] : (state, action)=>{
      state.name = action.payload.name
      state.email = action.payload.email
      state.twitter = action.payload.twitter
      state.discord = action.payload.discord
      state.errorMessage = ''
    },
    [String(updateUser.rejected)]:(state, action)=>{
      state.errorMessage = action.error.message
    }
  }
})

export const {setIsLoggedIn, clearUser, setErrorMessage} = userSlice.actions;
export default userSlice.reducer;