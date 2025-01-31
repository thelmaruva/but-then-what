import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import './styles/Landing.css';

const Landing = () => {
    return (
        <div>
            <div id="intro-message">
                <p id="student-welcome">Welcome to *Your lecturer*'s question set, *question set name*</p>
            </div>
            {/* <Stack id="name-form" spacing={-2}> */}
            <p className="info-element" id="name-instruction">Please enter your name:</p>
            <TextField
                id="name-input" 
                variant="outlined"
            />
            {/* </Stack> */}
            <div id="student-start">
                <Button variant="contained">Begin</Button>
            </div>
        </div>
    );
}

export default Landing;