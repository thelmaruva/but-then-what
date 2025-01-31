import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./styles/QuestionSetup.css"

const QuestionSetup = () => {
    return (
        <div id="question_nav_row">
            <Stack direction="row" spacing={60}>
                <h1 className="info-element" id="question_num">Question *no.*:</h1>
                <Stack direction="row" spacing={2}>
                    <Button>Delete question</Button>
                    <Button>Add new question</Button>
                </Stack>
            </Stack>
            <Stack id="question_keyword_input" direction="row" spacing={6}>
                <TextField
                    id="question-input" 
                    label="Enter question:"
                    variant="outlined"
                    helperText="This will be what the students see"
                    multiline
                    rows={10}>
                </TextField>
                <TextField
                    id="keyword-input" 
                    label="Enter keywords related to the question:"
                    variant="outlined"
                    helperText="We use this to give the chatbot pointers as to what the important things to remember for this question are."
                    multiline
                    rows={10}>
                </TextField>
            </Stack>
            <Pagination count={10} />
            <Button>Finish question setup</Button>
        </div>
    );
}

export default QuestionSetup;