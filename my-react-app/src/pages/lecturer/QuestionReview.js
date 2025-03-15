import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "../../SessionContext.js";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Stack
}
    from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import './styles/QuestionReview.css';

const QuestionReview = () => {
    const { sessionData, fetchSession, sessionId } = useSession();

    const navigate = useNavigate();
    const endPage = () => {
        navigate(`/end/${sessionId}`);
    }

    const setupPage = () => {
        navigate("/setup");
    }

    useEffect(() => {
        if (!sessionData) {
            fetchSession(sessionId);  // Fetch session data
        }
    }, [sessionId, sessionData, fetchSession]);

    return (
        <div>
            <h1 className="info-element" id="review-page-title">Review Questions</h1>
            {sessionData.questions.map((q, i) => (
            <Accordion key={i} id={`question-${i}-accordion`}>
                <AccordionSummary
                    className="panel-header"
                    expandIcon={<ArrowDropDown />}
                    aria-controls={`panel${i}-content`}
                    id={`panel${i}-header`}
                >
                    <Typography component="span">Question {i + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{q}</Typography>
                </AccordionDetails>
            </Accordion>
            ))}
            <Stack id="nav-buttons" direction="row" spacing={2}>
                <Button variant="outlined"onClick={setupPage}>Return to question setup</Button>
                <Button variant="contained" onClick={endPage}>Generate link for question set</Button>
            </Stack>
        </div>
    );
}

export default QuestionReview;