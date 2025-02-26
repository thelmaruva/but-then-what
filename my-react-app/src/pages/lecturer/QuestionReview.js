import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "../../SessionContext";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import './styles/QuestionReview.css';

const QuestionReview = () => {

    const navigate = useNavigate();
    const endPage = () => {
        navigate("/end");
    }
    const setupPage = () => {
        navigate("/setup");
    }

    const { sessionId } = useParams();
    const { sessionData, fetchSession } = useSession();

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
                    expandIcon={<ArrowDropDownIcon />}
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