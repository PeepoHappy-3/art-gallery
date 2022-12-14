import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {Commission} from '../../types/commission'
import {getCommissions as fetchCommissions} from '../../utils/commissionsApi'


interface CommissionsState {
  commissions: Array<Commission>,
  errorMessage: string
}
const initialState : CommissionsState = {
  commissions:[],
  errorMessage: ''
}
export const getCommissions = createAsyncThunk('commissions/get',
async (token:string)=>{
  return await fetchCommissions(token)
  .then(res=>{   
    return res.data.data
  })
  .catch(e=>{
    return new Error(e.response.data.message)
  })
})
const commissionSlice = createSlice({
    name:'commissions',
    initialState,
    reducers:{

    },
    extraReducers:{
      [String(getCommissions.fulfilled)]: (state, action : PayloadAction<[Commission]>)=>{
        state.commissions = action.payload
      },
      [String(getCommissions.rejected)]:(state, action)=>{
        state.errorMessage = action.payload.error.message
      }
    }
  }
)

export const {} = commissionSlice.actions;
export default commissionSlice.reducer;