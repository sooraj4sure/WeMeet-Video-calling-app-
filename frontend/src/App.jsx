// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import LandingPage from "./pages/landing";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Authentication from "./pages/authentication";
// import { AuthProvider } from "./contexts/AuthContext";

// function App() {
//   return (
//     <>
//       <Router>
//         <AuthProvider>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/auth" element={<Authentication />} />
//           </Routes>
//         </AuthProvider>
//       </Router>
//     </>
//   );
// }

// export default App;



import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/authContext';
// import VideoMeetComponent from './pages/VideoMeet';
// import HomeComponent from './pages/home';
// import History from './pages/history';

function App() {
  return (
    <div className="App">

      <Router>

        <AuthProvider>


          <Routes>

            <Route path='/' element={<LandingPage />} />

            <Route path='/auth' element={<Authentication />} />

            {/* <Route path='/home's element={<HomeComponent />} />
            <Route path='/history' element={<History />} />
            <Route path='/:url' element={<VideoMeetComponent />} /> */}
          </Routes>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;
