// LandingPage.js
import React, { useState } from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const router = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>WeMeet</h2>
                </div>

                {/* Hamburger Icon */}
                <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                {/* Navigation Items */}
                <div className={`navlist ${isMenuOpen ? 'open' : ''}`}>
                    <p onClick={() => router("/aljk23")}>Join as Guest</p>
                    <p onClick={() => router("/auth")}>Register</p>
                    <div onClick={() => router("/auth")} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>
                    <p>Cover a distance by WeMeet</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src="/smartphn.png" alt="smartphone visual" />
                </div>
            </div>
        </div>
    );
}
