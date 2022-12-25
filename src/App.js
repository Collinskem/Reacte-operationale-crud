import React,{useState} from 'react'
import logo from './logo.svg';
import './App.css';
import Create from './components/Create'
import Read from './components/Read'
import Update from './components/Update'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'


import {Button,Modal} from 'react-bootstrap'
import FormValidation from './components/FormValidation';

function App() {
  
  return (
    
    <Router>
      
    <div className='main'>
    <h2 className='main-header'>React Crud Operations</h2> 
   
    {/* <FormValidation/> */}
     <Routes>

    <Route exact path='/create' element={<Create/>} />
    <Route exact path='/' element={<Read/>} />
    <Route exact path='/update' element={<Update/>} />
    </Routes>
  </div>
  <ToastContainer/>
  </Router>
  );
}

export default App;
