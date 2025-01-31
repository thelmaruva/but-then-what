import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import './styles/Info.css';

const Info = () => {
    return (
        <div>
            <h1 id="page-title">Question Setup</h1>
            <Stack id="text-fields" spacing={4}>
                <TextField
                    fullWidth
                    id="name-input" 
                    label="Your Name"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    id="question-set-name-input" 
                    label="Question Set Title"
                    variant="outlined"
                />
            </Stack>
            <div>
                <Button id="setup-start-button" variant="contained">Begin</Button> 
            </div>
        </div>
    );
}

export default Info;