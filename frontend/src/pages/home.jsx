import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router";
import "../App.css";
import { IconButton, TextField } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from "../contexts/AuthContext";


function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);

    let handelJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }

    return (
        <>

            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center", fontSize: "1.5rem"}}>
                    <h3>Apna Video Call</h3>

                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem"}}>
                    <div onClick={() => {navigate("/history")}} style={{display: "flex", alignItems: "center", fontSize: "1rem", cursor: "pointer"}}>
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
                            <h2 style={{marginBottom: "10px"}}>Providing Quality Video Call Just Like Quality Education</h2>

                            <div style={{display: "flex", gap: "10px"}}>
                                <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined"/>
                                <button onClick={handelJoinVideoCall} variant="contained">Join</button>
                            </div>
                        </div>
                    </div>

                    <div className="rightPanel">
                        <img src="/logo3.svg" alt="" />
                    </div>
            </div>

        </>
    )
}

export default withAuth(HomeComponent);