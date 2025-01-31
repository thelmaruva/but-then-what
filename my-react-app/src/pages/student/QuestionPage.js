import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles/QuestionPage.css';
import Container from "@mui/material/Container";


const QuestionPage = () => {
    return (
        <div>
            <h1>*Question Set Name*</h1>
            <p>When you need help with this question, put your code in the box below and ask me a question. If you don’t know what to do, click the button below and I will give you a step in the right direction.</p>
            <Container>
                <p>Question</p>
                <TextField
                    id="code-input" 
                    label="Enter your code:"
                    variant="outlined">
                </TextField>
            </Container>
            <div>
                <TextField
                    id="chatbot-dialog-box" 
                    label="Ask me questions here:"
                    variant="outlined">
                </TextField>
                <Button>I need help.</Button>
            </div>
        </div>
    );
}

export default QuestionPage;