import React from 'react'
import "../App.css"


export default function LandingPage() {
  return (
    <div className='landingPageContainer'>
        <nav>
            <div className='navHeadeer'>
                <h2>WeMeet</h2>
            </div>
            <div className='navList'>
                <p>Join as Guest</p>
                <p>Register</p>
                <div role='button'><p>Login</p></div>
            </div>
        </nav>

        <div className="landingMainContainer">
            <div>
                <h1><span style={{color: "#ff9839"}}>Connect</span> with your <br />Loved Ones</h1>
                <p>Cover a distance by WeMeet</p>

                  <div role='button'>
                     <a href="/auth">Get Started</a>
                  </div>
            </div>
            <div className='img'>
                <img src="/smartphn.png" alt="" />
            </div>
        </div>

    </div>
  )
}
