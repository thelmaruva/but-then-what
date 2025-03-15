import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../SessionContext.js";
import { Button , TextField, Stack} from "@mui/material";
import copy from "copy-to-clipboard";

import './styles/End.css';

const End = () => {
    const navigate = useNavigate();
    const { sessionData, sessionId, updateSession} = useSession();
    
    const landingPage = () => {
        navigate("/");
    }

    const copyLink = `http://localhost:3000/student/${sessionId}`;

    const copyToClipboard = () => {
        copy(copyLink);
    };

    useEffect(() => {
        const storeSessionData = async () => {
            try {
                const data = {
                    lecturerName: sessionData.lecturerName,
                    questionSetName: sessionData.questionSetName,
                    questions: sessionData.questions,
                    keywords: sessionData.keywords
                };
                await updateSession(data, sessionId);
                console.log("Session updated!");
            } catch (error) {
                console.error("Failed to update session:", error);
            }
        };
  
        storeSessionData();
    }, [sessionData.keywords, sessionData.lecturerName, sessionData.questionSetName, sessionData.questions, sessionId, updateSession]);

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