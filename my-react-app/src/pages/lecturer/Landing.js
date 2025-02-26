import React from "react";
import Button from '@mui/material/Button';
import './styles/Landing.css';
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    const infoPage = () => {
        navigate("/info");
    }
    
    return (
        <div>
            <h1 id="app-title">But Then What?</h1>
            <Button variant="contained" onClick={infoPage}>Begin Question Setup</Button>
            <p id="student-info">(If you are a student, you can access your question set through the link provided by your lecturer.)</p>
        </div>
    );
}

export default Landing;