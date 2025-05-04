import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Typography } from '@mui/material';
import '../styles/history.css';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="history-page">
            <IconButton  onClick={() => routeTo("/home")}>
                <HomeIcon className="home-button" style={{fontSize: "2rem"}}/>
            </IconButton>

            <div className="history-container">
                {
                    meetings.length > 0 ? (
                        meetings.map((e, i) => (
                            <div className="history-card" key={i}>
                                <Typography className="history-title">
                                    Code: {e.meetingCode}
                                </Typography>
                                <Typography className="history-date">
                                    Date: {formatDate(e.date)}
                                </Typography>
                            </div>
                        ))
                    ) : (
                        <div className="no-history">
                            No meetings found in history.
                        </div>
                    )
                }
            </div>
        </div>
    );
}
