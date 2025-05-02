import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

import { IconButton } from '@mui/material';

export default function History() {

    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                console.log("History response:", history);
                setMeetings(history);
            } catch (err) {
                console.error("Failed to fetch history:", err);
                //Implement snakbar   
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <div>

            <IconButton onClick={() => {
                routeTo("/home")
            }} style={{color: "white"}}>
                <HomeIcon />
            </IconButton >

            {
                (meetings.length !== 0) ? meetings.map((e, i) => {
                    return (
                        <>
                            <Card key={i} variant="outlined">

                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Code: {e.meetingCode}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Date: {formatDate(e.date)}
                                    </Typography>

                                </CardContent>

                            </Card>
                        </>
                    )
                }) : <></>
            }
            
        </div>
    )
}