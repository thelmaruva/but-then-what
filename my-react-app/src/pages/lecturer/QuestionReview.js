import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import './styles/QuestionReview.css';

const QuestionReview = () => {
    return (
        <div>
            <h1 className="info-element" id="review-page-title">Review Questions</h1>
            <Accordion id="questions-accordion">
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Question 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>First question.</Typography>
                </AccordionDetails>
            </Accordion>
            <Stack id="nav-buttons" direction="row" spacing={2}>
                <Button variant="outlined">Return to question setup</Button>
                <Button variant="contained">Generate link for question set</Button>
            </Stack>
        </div>
    );
}

export default QuestionReview;