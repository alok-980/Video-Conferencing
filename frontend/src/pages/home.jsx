import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router";
// import "../App.css";
import "../styles/home.css"
import { IconButton, TextField } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from "../contexts/AuthContext";


function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {

        if (!meetingCode.trim()) {
            alert("Please enter a meeting code");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("No token found. Please login first.");
            navigate("/auth");
            return;
        }

        try {
            console.log("Token found:", token);

            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        } catch (err) {
            console.error("Failed to join call:", err);
            alert("Something went wrong while joining the meeting.");
        }
    }

    return (
        <>

            <div className="home-background">
                <div className="navBar">
                    <div style={{ display: "flex", alignItems: "center", fontSize: "1.5rem" }}>
                        <h3>Apna Video Call</h3>

                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div onClick={() => { navigate("/history") }} style={{ display: "flex", alignItems: "center", fontSize: "1rem", cursor: "pointer" }}>
                            <IconButton style={{ border: "none", paddingInline: "0.5px", color: "white" }}>
                                <RestoreIcon />
                            </IconButton>
                            <b><p>History</p></b>
                        </div>
                        <button onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="meetContainer">
                    <div className="leftPanel">
                        <div>
                            <h2 style={{ marginBottom: "10px" }}>Providing Quality Video Call Just Like Quality Education</h2>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <TextField onChange={e => setMeetingCode(e.target.value)} value={meetingCode} id="outlined-basic" label="Meeting Code" variant="outlined" style={{backgroundColor: "white", color: "white", borderRadius: "3px"}}/>
                                <button onClick={handleJoinVideoCall} variant="contained">Join</button>
                            </div>
                        </div>
                    </div>

                    <div className="rightPanel">
                        <img src="/logo3.svg" alt="" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default withAuth(HomeComponent);