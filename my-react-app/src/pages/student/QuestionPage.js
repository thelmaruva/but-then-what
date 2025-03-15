import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../../SessionContext.js";
import { useState, useEffect } from "react";
import { TextField, Button, Stack } from '@mui/material';
import './styles/QuestionPage.css';

const QuestionPage = () => {
    const { sessionId } = useParams();
    const { sessionData, fetchSession } = useSession();
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    const endPage = () => {
        navigate(`/student/end/${sessionId}`);
    }

    const movePage = () => {
        if (currentIndex + 2 > sessionData.questions.length) {
            endPage();
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    };

    useEffect(() => {
        fetchSession(sessionId);  // Fetch session data when student joins
    }, [sessionId, fetchSession]);

    return (
        <div>
            <h1 id="question_set_name">{sessionData.questionSetName} - Question {currentIndex + 1}</h1>
            <p>When you need help with this question, put your code in the box below and ask me a question. If you don’t know what to do, click the button below and I will give you a step in the right direction.</p>
            <Stack spacing={2}>
                <Stack direction="row" spacing={6}>
                    <p id="question">{sessionData.questions[currentIndex]}</p>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        id="code-input" 
                        label="Enter your code:"
                        variant="outlined">
                    </TextField>
                </Stack>
                <div>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        id="chatbot-dialog-box" 
                        label="Ask me questions here:"
                        variant="outlined">
                    </TextField>
                </div>
            </Stack>
            <Stack direction="row" spacing={40}>
                {currentIndex < 0 ? (
                <Button onClick={() => setCurrentIndex(currentIndex - 1)}>
                    Previous
                </Button> ) : ("")
                }
                <Button id="help-button" variant="contained">I need help.</Button>
                <Button id="next-button" variant="outlined" onClick={movePage}>
                    Next
                </Button>
            </Stack>
        </div>
    );
}

export default QuestionPage;