import React from "react";
import { useState } from "react"
import { useSession } from "../../SessionContext.js";
import { useNavigate } from "react-router-dom";
import { TextField , Button, Stack } from '@mui/material';
import "./styles/QuestionSetup.css"

const QuestionSetup = () => {

    const { sessionData, setQuestions , setKeywords } = useSession();
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();
    const reviewPage = () => {
        navigate("/review");
    }

    const addQuestion = () => {
        const updatedQuestions = [...sessionData.questions, ""];
        setQuestions(updatedQuestions);
        setCurrentIndex(updatedQuestions.length - 1);
    };

    const updateQuestion = (value) => {
        const updatedQuestions = [...sessionData.questions];
        updatedQuestions[currentIndex] = value;
        setQuestions(updatedQuestions);
    };

    const addKeywords = () => {
        const updatedKeywords = [...sessionData.keywords, ""];
        setKeywords(updatedKeywords);
        setCurrentIndex(updatedKeywords.length - 1);
    };

    const updateKeywords = (value) => {
        const updatedKeywords = [...sessionData.keywords];
        updatedKeywords[currentIndex] = value;
        setKeywords(updatedKeywords);
    };
    
    return (
        <div id="question_nav_row">
            <Stack direction="row" 
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <h1 className="info-element" id="question_num">Question {currentIndex + 1}:</h1>
                <Button variant="contained" onClick={addQuestion && addKeywords} disabled={sessionData.questions[currentIndex] === ""}>Add new question</Button>
            </Stack>
            <Stack id="question_keyword_input" direction="row" spacing={6}>
                <TextField
                    fullWidth
                    id="question-input" 
                    label="Enter question:"
                    variant="outlined"
                    helperText="This will be what the students see"
                    multiline
                    rows={10}
                    value={sessionData.questions[currentIndex] === "" ? ("") : sessionData.questions[currentIndex]}
                    onChange={(e) => updateQuestion(e.target.value)}
                    >
                </TextField>
                <TextField
                    fullWidth
                    id="keyword-input" 
                    label="Enter keywords related to the question:"
                    variant="outlined"
                    helperText="We use this to give the chatbot pointers as to what the important things to remember for this question are."
                    multiline
                    rows={10}
                    value={sessionData.keywords[currentIndex]}
                    onChange={(e) => updateKeywords(e.target.value)}
                    >
                </TextField>
            </Stack>
            <Stack id="pagination" direction="row" spacing={3}>
                <Button variant="contained" onClick={() => setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0}>
                    Previous
                </Button>
                <Button variant="contained" onClick={() => setCurrentIndex(currentIndex + 1) && console.log(currentIndex)} disabled={currentIndex === sessionData.questions.length - 1 || sessionData.questions[currentIndex + 1] === ""}>
                    Next
                </Button>
            </Stack>
            <Stack direction="row" sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}>
                <Button  id="finish-setup-button" variant="contained" onClick={reviewPage}> Finish question setup</Button>
            </Stack>
        </div>
    );
}

export default QuestionSetup;