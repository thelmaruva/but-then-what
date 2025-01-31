import React from "react";
import Button from '@mui/material/Button';
import './styles/Landing.css';

const Landing = () => {
    return (
        <div>
            <h1 id="app-title">But Then What?</h1>
            <Button variant="contained">Begin Question Setup</Button>
            <p id="student-info">(If you are a student, you can access your question set through the link provided by your lecturer.)</p>
        </div>
    );
}

export default Landing;