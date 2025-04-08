import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/landing' 
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';


function App() {
  return(
    <>
    <Router>

      <Routes>
        {/* <Route path ='/home' element ></Route> */}
        <Route path = '/'  element={<LandingPage/>}/>

      </Routes>

    </Router>
    </>
  )
}

export default App
