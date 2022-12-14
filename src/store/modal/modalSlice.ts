import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModalState {
  src: string,
  modalWithImg: boolean,
  modalWithForm: boolean,
  modalSuccess: boolean,
  modalFullScreenSlider: boolean,
  successText: string
}

const initialState = {
  src: '',
  modalWithImg: false,
  modalWithForm: false,
  modalSuccess:false,
  modalFullScreenSlider:false,
  successText: '',
}

export const modalSlice = createSlice({
  name:'modal',
  initialState,
  reducers: {
    setSrc: (state, action: PayloadAction<string>) => {
      state.src = action.payload
    },
    setSuccessText: (state, action: PayloadAction<string>)=>{
      state.successText = action.payload
    },
    setIsModalWithImgOpened: (state, action: PayloadAction<boolean>)=>{
      state.modalWithImg = action.payload
    },
    setIsModalWithFormOpened: (state, action: PayloadAction<boolean>)=>{
      state.modalWithForm = action.payload
    },
    setIsSuccessModalOpened: (state, action: PayloadAction<boolean>)=>{
      state.modalSuccess = action.payload
    },
    setIsFullScreensliderModalOpen: (state, action: PayloadAction<boolean>)=>{
      state.modalFullScreenSlider = action.payload
    },   
    setAllPopupsClosed: (state)=>{
      state.modalWithForm = false
      state.modalWithImg = false
    }
  }
})

export const {
  setSrc,
  setSuccessText,
  setIsModalWithImgOpened,
  setIsModalWithFormOpened,
  setAllPopupsClosed,
  setIsSuccessModalOpened,
  setIsFullScreensliderModalOpen, } = modalSlice.actions;
export default modalSlice.reducer