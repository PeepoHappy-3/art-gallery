import {configureStore} from '@reduxjs/toolkit';
import modalReducer from './modal/modalSlice';
import formReducer from './form/formSlice';
import appReducer from './app/appSlice';
import userReducer from './user/userSlice';
import commissionsReducer from './commissions/commissionsSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
    app: appReducer,
    user: userReducer,
    commissions:commissionsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch