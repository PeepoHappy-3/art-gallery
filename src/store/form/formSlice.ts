import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormState{
  characterName: string,
  commType: string,
  charactersCount: number,
  versionsCount: number, 
  information:string,
}

const initialState: FormState = {
  characterName:'',
  commType: 'head',
  charactersCount:1,
  versionsCount: 0, 
  information: '' 
}

export const formSlice = createSlice({
  name:'form',
  initialState,
  reducers:{
    setCharacterName: (state, action: PayloadAction<string>)=>{
      state.characterName = action.payload;
    },
    setCommType:(state, action: PayloadAction<string>)=>{
      state.commType = action.payload;
    },
    setCharactersCount:(state, action: PayloadAction<number>)=>{
      state.charactersCount = action.payload;
    },
    setVersionsCount :(state, action: PayloadAction<number>)=>{
      state.versionsCount = action.payload;
    },    
    setInformation: (state, action:PayloadAction<string>)=>{
      state.information = action.payload;
    },
    resetForm: (state)=>{
      state.commType = ''
      state.characterName = ''
      state.charactersCount = 0
      state.versionsCount = 0
      state.information = ''
    }
  }
})

export const {setCharacterName, setCommType, setCharactersCount, resetForm, setVersionsCount,setInformation} = formSlice.actions;
export default formSlice.reducer;