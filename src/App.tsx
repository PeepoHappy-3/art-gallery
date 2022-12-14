import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Routes, Route} from 'react-router-dom'

import './App.scss';

import Footer from './components/Footer';
import Form from './components/Form';
import Header from './components/Header';
import Modal from './components/Modal';

import InfoPage from './pages/InfoPage';
import MainPage from './pages/MainPage';
import { AppDispatch, RootState } from './store';

import {setAllPopupsClosed, setIsFullScreensliderModalOpen, setIsModalWithFormOpened, setIsModalWithImgOpened, setIsSuccessModalOpened } from './store/modal/modalSlice';
import { resetForm as resetCommissionForm } from './store/form/formSlice';
import Success from './components/Success';
import GalleryPage from './pages/GalleryPage';
import { fetchAvatar, setHeaderOffset, setScreenWidth } from './store/app/appSlice';
import FullscreenSlider from './components/FullscreenSlider';

import { sliderImages, albumImages } from './data/gallery';
import { spreadArray } from './utils/utils';
import FormPage from './pages/FormPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import { getAvatar, getUser } from './store/user/userSlice';
import ForbidenPage from './pages/ForbidenPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';
import HistoryPage from './pages/HistoryPage';
import { getCommissions } from './store/commissions/commissionsSlice';



export const App : React.FC = () => {
  const src = useSelector<RootState, string>(state=>state.modal.src);
  const successText = useSelector<RootState, string>(state=>state.modal.successText)
  const isLoggedIn = useSelector<RootState, boolean | undefined>(state=>state.user.isLoggedIn)
  const modalWithImg = useSelector<RootState, boolean>(state=>state.modal.modalWithImg)
  const modalWithForm = useSelector<RootState,boolean>(state=>state.modal.modalWithForm)
  const modalSuccess = useSelector<RootState, boolean>(state=>state.modal.modalSuccess)
  const modalFullscreenSlider =useSelector<RootState, boolean>(state=>state.modal.modalFullScreenSlider)

  const headerOffset = useSelector<RootState, number>(state=>state.app.headerOffset)

  const width = useSelector<RootState,number>(state=>state.app.screenWidth)

  const dispatch = useDispatch<AppDispatch>()

  const bigChungusArray = [...sliderImages, ...albumImages]



  const closeModalWithImg = ()=>{   
    dispatch(setIsModalWithImgOpened(false))
  }
  const closeModalWithForm = ()=>{
    dispatch(setIsModalWithFormOpened(false))
  }
  const closeModalSuccess = ()=>{
    dispatch(setIsSuccessModalOpened(false))
  }
  const closeModalWithSlider = ()=>{
    dispatch(setIsFullScreensliderModalOpen(false))
  }
  const resetForm = ()=>{
    dispatch(resetCommissionForm())
  }

  const setHeaderOffsetValue = useCallback(()=>{
    dispatch(setHeaderOffset(document.getElementById('header')!.getBoundingClientRect().y))
  },[dispatch])

  const handleResize = useCallback(()=>{
    dispatch(setScreenWidth(document.querySelector('.app')!.clientWidth))
  },[dispatch])

  useEffect(()=>{
    handleResize();
    window.addEventListener('scroll', setHeaderOffsetValue) 
    window.addEventListener('resize',handleResize)         
    return ()=>{
      window.removeEventListener('scroll', setHeaderOffsetValue)
      window.removeEventListener('resize',handleResize)
    }
  },[setHeaderOffsetValue,handleResize,headerOffset,width])

  useEffect(()=>{
    dispatch(fetchAvatar())
    const token = localStorage.getItem('jwt');    
    (async function(){    
      if(token){
        try{
          await dispatch(getUser(token)).then(async user=>{       
            if(user.payload.avatar){          
              await dispatch(getAvatar(token))             
            }
           })    
           await dispatch(getCommissions(token))    
          }catch(e){
            console.log(e)
          }   
        }   
    })() 
  },[dispatch,isLoggedIn])

  return (
    <div className="app flex flex-col relative">
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/info' element={<InfoPage/>}/>
        <Route path='/gallery' element={<GalleryPage/>}/>
        <Route path='/commission' element={isLoggedIn ? <FormPage/> : <ForbidenPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/signin' element={<SigninPage/>}/>
        <Route path='/account' element={isLoggedIn ? <AccountPage/> : <ForbidenPage/>}>
         
        </Route>
        <Route path='/account/history' element={<HistoryPage/>}></Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      <Footer/> 
      <Modal isOpen={modalWithImg} onClose={closeModalWithImg}>
        <img src={src} alt="" className='max-h-[100vh] h-full w-full  pointer-events-none z-[101]'/>
      </Modal>
      <Modal isOpen={modalWithForm} onClose={()=>{
          closeModalWithForm()
          resetForm()
        }}>
        <Form height='min-h-[500px] h-[100vh] sm:h-[800px]'></Form>
      </Modal> 
      <Modal isOpen={modalSuccess} onClose={closeModalSuccess}>
        <Success>{successText}</Success>    
      </Modal>
      <Modal isOpen={modalFullscreenSlider} onClose={closeModalWithSlider} light={false}>
        <FullscreenSlider array={spreadArray(bigChungusArray)}></FullscreenSlider>
      </Modal>
    </div>
  );
}

export default App;
