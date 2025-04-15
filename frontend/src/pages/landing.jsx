import React from "react";
import "../App.css"
import { Link } from "react-router";

export default function landing() {
    return (
        <div className="landingPageContainer">
            <nav>
                <div className="navHeader">
                    <h2>Apna Video Call</h2>
                </div>
                <div className="navList">
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <div role="button">Login</div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div className="landingMainLeftContainer">
                    <h1><span style={{ color: "orange" }}>Connect</span> with your Loved Onces</h1>
                    <p>Cover a distance by apna video call</p>
                    <div role="button">
                        <Link to={"/home"}>Get Started</Link>
                    </div>
                </div>
                <div className="landingMainRightContainer">
                    <img src="/public/mobile.png" alt="" />
                </div>
            </div>
        </div>
    )
}