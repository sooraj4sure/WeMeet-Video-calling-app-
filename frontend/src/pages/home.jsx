import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/authContext';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <>
            <style>
                {`
                :root {
                    --bg-dark: #0f172a;
                    --text-light: #f8fafc;
                    --primary: #3b82f6;
                    --accent: #38bdf8;
                }

                body {
                    margin: 0;
                    font-family: 'Segoe UI', sans-serif;
                }

                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 20px;
                    background-color: var(--bg-dark);
                    color: var(--text-light);
                    height: 56px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
                    flex-wrap: wrap;
                }

                .navbar-title {
                    font-size: 20px;
                    font-weight: 600;
                    margin: 0;
                    flex-grow: 1;
                }

                .navbar-actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .navbar-history {
                    font-size: 14px;
                    color: var(--text-light);
                }

                .meet-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 20px;
                    flex-wrap: wrap;
                    background: linear-gradient(to right, #1e293b, #0f172a);
                    min-height: calc(100vh - 56px);
                    color: white;
                }

                .left-panel {
                    flex: 1 1 350px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    max-width: 500px;
                }

                .headline {
                    font-size: 24px;
                    margin-bottom: 24px;
                    font-weight: 500;
                }

                .join-section {
                    display: flex;
                    flex-direction: row;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .join-btn {
                    background-color: var(--primary);
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }

                .join-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 10px var(--accent);
                }

                .join-btn:active {
                    transform: scale(0.98);
                    box-shadow: 0 0 6px var(--accent);
                }

                .right-panel {
                    display: none;
                }

                @media (max-width: 768px) {
                    .navbar {
                        flex-wrap: nowrap;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .navbar-title {
                        font-size: 18px;
                        flex-grow: 1;
                    }

                    .navbar-actions {
                        flex-wrap: nowrap;
                        gap: 8px;
                    }

                    .meet-container {
                        flex-direction: column;
                        text-align: center;
                        padding: 30px 16px;
                    }

                    .headline {
                        font-size: 20px;
                        text-align: center;
                    }

                    .join-section {
                        flex-direction: column;
                        align-items: stretch;
                    }
                }
                `}
            </style>

            <div className="navbar">
                <h2 className="navbar-title">WeMeet</h2>
                <div className="navbar-actions">
                    <IconButton onClick={() => navigate('/history')} style={{ color: 'white' }}>
                        <RestoreIcon />
                    </IconButton>
                    <p className="navbar-history"></p>
                    <Button
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/auth');
                        }}
                        style={{
                            color: 'white',
                            border: '1px solid white',
                            textTransform: 'none',
                            fontSize: '14px',
                            padding: '4px 12px'
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meet-container">
                <div className="left-panel">
                    <h2 className="headline">Providing Perfect Video Call As Perfect As You Are</h2>
                    <div className="join-section">
                        <TextField
                            onChange={e => setMeetingCode(e.target.value)}
                            label="Meeting Code"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: {
                                    backgroundColor: 'white',
                                    borderRadius: 4
                                }
                            }}
                        />
                        <button className="join-btn" onClick={handleJoinVideoCall}>
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
