import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchAvatar as getAvatar } from "../../utils/api";

export interface App{
  headerOffset: number,
  screenWidth: number,
  avatar: string,
  passwordConfirm?: string
}

const initialState: App = {
  headerOffset: 0,
  screenWidth: 0,
  avatar: '',
  passwordConfirm:''
}

export const fetchAvatar = createAsyncThunk('app/fetchAvatar', 
async ()=>{
  return await getAvatar()
  .then(res=>{
    return res;
  })
})

export const appSlice = createSlice({
  name:'app',
  initialState,
  reducers:{
    setHeaderOffset: (state, action: PayloadAction<number>) =>{
      state.headerOffset = action.payload
    },
    setScreenWidth: (state, action: PayloadAction<number>)=>{
      state.screenWidth = action.payload
    },
    setPasswordConfirm: (state, action:PayloadAction<string>)=>{
      state.passwordConfirm = action.payload
    }
  },
  extraReducers:{
    [String(fetchAvatar.fulfilled)]:(state: App, action:PayloadAction<string>)=>{
        state.avatar = action.payload
    }
  }
})

export const {setHeaderOffset, setScreenWidth,setPasswordConfirm} = appSlice.actions
export default appSlice.reducer;