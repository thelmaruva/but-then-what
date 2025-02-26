import React from "react";
import './styles/End.css';

const End = () => {
    const studentName = localStorage.getItem("studentName");
    
    return (
        <div class="info-element" id="end-message-student">
            You have completed the exercise {studentName}, great job! Feel free to close the window when you're done. 
        </div>
    );
}

export default End;