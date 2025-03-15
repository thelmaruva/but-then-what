import React from "react";
import { useEffect } from "react";
import { Button } from '@mui/material';
import './styles/Landing.css';
import { useNavigate } from "react-router-dom";
import { useSession } from "../../SessionContext.js";

const SessionInitializer = () => {
  const { createSession } = useSession();

  useEffect(() => {
      const initializeSession = async () => {
          try {
              const sessionData = {
                  lecturerName: "",
                  questionSetName: "",
                  questions: [],
                  keywords: [],
              };
              await createSession(sessionData);
              console.log("Session created automatically!");
          } catch (error) {
              console.error("Failed to create session:", error);
          }
      };

      initializeSession();
  }, [createSession]);

  return null;
};

const Landing = () => {
    const navigate = useNavigate();
    const infoPage = () => {
        navigate("/info");
    }
    
    return (
        <div>
            <SessionInitializer />
            <h1 id="app-title">But Then What?</h1>
            <Button variant="contained" onClick={infoPage}>Begin Question Setup</Button>
            <p id="student-info">(If you are a student, you can access your question set through the link provided by your lecturer.)</p>
        </div>
    );
}

export default Landing;