import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams} from "react-router-dom";
import { useSession } from "../../SessionContext.js";
import { Button } from '@mui/material';

import './styles/Landing.css';

const Landing = () => {
    const { sessionId } = useParams();
    const { sessionData, fetchSession } = useSession();
    // const [studentName, setStudentName] = useState(localStorage.getItem("studentName") || "");

    const navigate = useNavigate();
    const questionPage = () => {
        navigate(`/student/questions/${sessionId}`);
    }

    useEffect(() => {
            fetchSession(sessionId);
    }, [sessionId, fetchSession]);

    // const handleNameInput = (e) => {
    //     const name = e.target.value;
    //     setStudentName(name);
    //     localStorage.setItem("studentName", name);
    // };

    return (
        <div>
            <div id="intro-message">
                <p id="student-welcome">Welcome to {sessionData.lecturerName}'s question set, {sessionData.questionSetName}</p>
            </div>
            {/* <p 
                className="info-element" 
                id="name-instruction"
            >Please enter your name:</p>
            <TextField
                id="name-input" 
                variant="outlined"
                value={studentName}
                onChange={handleNameInput}
            /> */}
            <div id="student-start">
                <Button variant="contained" onClick={questionPage}>Begin</Button>
            </div>
        </div>
    );
}

export default Landing;