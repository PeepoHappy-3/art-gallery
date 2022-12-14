import {render, screen} from '@testing-library/react'

import { Provider } from 'react-redux'
import {store} from './store/'
import { BrowserRouter } from 'react-router-dom';

import App from './App'

test('renders app component', ()=>{
  render(
    <BrowserRouter>
      <Provider store={store}>       
          <App />     
      </Provider>           
    </BrowserRouter> 
  )
  expect(screen.getByText(/Konichiwa/i)).toBeInTheDocument();
})