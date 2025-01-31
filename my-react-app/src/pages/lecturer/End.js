import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import React from "react";

import './styles/End.css';


const End = () => {
    return (
        <div>
            <p className="info-element" id="end-message">Great, your questions are all set up! Use the link below to share the question set with your students.</p>
            <Stack id="link-generation-site" direction="row" spacing={2}>
                <TextField></TextField>
                <Button className="button"
                size="small" variant="contained">Copy</Button>
            </Stack>
            <div>
                <Button variant="contained">Create new question set</Button>
            </div>
        </div>
    );
}

export default End;