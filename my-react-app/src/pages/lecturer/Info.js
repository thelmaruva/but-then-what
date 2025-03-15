import React from "react";
import { useSession } from "../../SessionContext.js";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack } from '@mui/material';

import './styles/Info.css';

const Info = () => {

    const { setLecturerName, setQuestionSetName } = useSession();

    const navigate = useNavigate();
    const setupPage = () => {
        navigate("/setup");
    }

    // const [sessionLink, setSessionLink] = useState("");


    // const createSession = async () => {
    //     const response = await fetch("http://localhost:5000/create-session", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ lecturerName, questionSetName }),
    //     });
    //     const data = await response.json();
    //     setSessionLink(data.link);
    // };

    return (
        <div>
            <h1 id="page-title">Question Setup</h1>
            <Stack id="text-fields" spacing={4}>
                <TextField
                    fullWidth
                    id="name-input" 
                    label="Your Name"
                    variant="outlined"
                    onChange={(e) => setLecturerName(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="question-set-name-input" 
                    label="Question Set Title"
                    variant="outlined"
                    onChange={(e) => setQuestionSetName(e.target.value)} 
                />
            </Stack>
            <div>
                <Button 
                    id="setup-start-button" 
                    variant="contained"
                    onClick={setupPage}>Begin</Button> 
            </div>
        </div>
    );
}

export default Info;