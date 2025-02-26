import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "../../SessionContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './styles/Landing.css';

const Landing = () => {
    const navigate = useNavigate();
    const questionPage = () => {
        navigate("/questions");
    }

    const { sessionId } = useParams();
    const { sessionData, fetchSession } = useSession();
    const [studentName, setStudentName] = useState(localStorage.getItem("studentName") || "");

    useEffect(() => {
        if (!sessionData) {
            fetchSession(sessionId);  // Fetch session data when student joins
        }
    }, [sessionId, sessionData, fetchSession]);

    const handleNameInput = (e) => {
        const name = e.target.value;
        setStudentName(name);
        localStorage.setItem("studentName", name);  // Store name locally
    };

    return (
        <div>
            <div id="intro-message">
                <p id="student-welcome">Welcome to {sessionData.lecturerName}'s question set, {sessionData.questionSetName}</p>
            </div>
            <p 
                className="info-element" 
                id="name-instruction"
            >Please enter your name:</p>
            <TextField
                id="name-input" 
                variant="outlined"
                value={studentName}
                onChange={handleNameInput}
            />
            <div id="student-start">
                <Button variant="contained" onClick={questionPage}>Begin</Button>
            </div>
        </div>
    );
}

export default Landing;