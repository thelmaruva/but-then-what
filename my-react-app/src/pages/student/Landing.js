import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams} from "react-router-dom";
import { useSession } from "../../SessionContext.js";
import { Button, TextField } from '@mui/material';

import './styles/Landing.css';

const Landing = () => {
    const { sessionId } = useParams();
    const { sessionData, fetchSession } = useSession();

    const navigate = useNavigate();
    const questionPage = () => {
        navigate(`/student/questions/${sessionId}`);
    }

    useEffect(() => {
            fetchSession(sessionId);
    }, [sessionId, fetchSession]);

    const informationSheet = `You are invited to participate in a research study that aims to explore how AI can assist students in learning to code without directly providing solutions. This study investigates how an AI-driven interactive web tool can enhance students' learning by providing hints and probing questions rather than direct solutions. The tool allows lecturers to input coding questions and relevant contextual information, enabling a chatbot to guide students effectively. If you choose to participate, you will:\n
    \t - Use the AI-assisted coding tool to complete coding exercises. 
    \t - Interact with the chatbot to receive guidance on your coding attempts. 
    \t - Provide feedback on your experience using the tool.
`

    return (
        <div>
            <div id="intro-message">
                <p id="student-welcome">Welcome to {sessionData.lecturerName}'s question set, {sessionData.questionSetName}</p>
            </div>
            <p 
                className="info-element" 
                id="information-sheet-label"
            >Information Sheet:</p>
            <TextField
                id="info-sheet" 
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={informationSheet}
                slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
            />
            <div className="info-element" id="consent-label">
            By pressing “Begin ”below, you confirm that:
            <ul>
                <li>You have read and understood the Participant Information Sheet.</li>
                <li>You understand that participation is voluntary and you can withdraw at any time without consequence.</li>
                <li>You agree to your anonymized data being used for research purposes.</li>
                <li>You understand that your responses to the questionnaire will be kept confidential and securely stored.</li>
                <li>You consent to participate in this study.</li>
            </ul>
            </div>
            <div id="student-start">
                <Button variant="contained" onClick={questionPage}>Begin</Button>
            </div>
        </div>
    );
}

export default Landing;