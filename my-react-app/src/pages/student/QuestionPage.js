import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../SessionContext";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles/QuestionPage.css';
import Stack from "@mui/material/Stack";

const QuestionPage = () => {
    // either navigate to next question or end if no more questions
    const navigate = useNavigate();

    const endPage = () => {
        navigate.push("/");
    }

    const { sessionData } = useSession();
    const [currentIndex, setCurrentIndex] = useState(0);

    const movePage = () => {
        if (currentIndex + 1 > sessionData.questions.length) {
            endPage();
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    };

    return (
        <div>
            <h1 id="question_set_name">{sessionData.questionSetName} - Question {currentIndex + 1}</h1>
            <p>When you need help with this question, put your code in the box below and ask me a question. If you don’t know what to do, click the button below and I will give you a step in the right direction.</p>
            <Stack spacing={2}>
                <Stack direction="row" spacing={6}>
                    <p id="question">value={sessionData.questions[currentIndex]}</p>
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
                <Button onClick={movePage}>
                    Next
                </Button>
                <Button id="next-button" variant="outlined">Next</Button>
            </Stack>
        </div>
    );
}

export default QuestionPage;