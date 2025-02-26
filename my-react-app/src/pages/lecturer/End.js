import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import copy from "copy-to-clipboard";

import './styles/End.css';

const End = () => {
    const navigate = useNavigate();
    const landingPage = () => {
        navigate("/");
    }

    const { sessionId } = useParams();

    const copyLink = `http://localhost:3000/student/${sessionId}`;

    const copyToClipboard = () => {
        copy(copyLink);
        alert(`You have copied "${copyLink}"`);
    };

    return (
        <div>
            <p className="info-element" id="end-message">Great, your questions are all set up! Use the link below to share the question set with your students.</p>
            <Stack id="link-generation-site" direction="row" spacing={2}>
                <TextField
                    value={copyLink}
                    aria-readonly
                ></TextField>
                <Button 
                    className="button"
                    size="small" 
                    variant="contained"
                    onClick={copyToClipboard}
                >
                    Copy
                </Button>
            </Stack>
            <div>
                <Button variant="contained" onClick={landingPage}>Create new question set</Button>
            </div>
        </div>
    );
}

export default End;