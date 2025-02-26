import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [sessionData, setSessionData] = useState({
        lecturerName: "",
        questionSetName: "",
        questions: [],
        keywords: []
    }
    );

    // Function to update session details
    const setLecturerName = (name) => {
        setSessionData((prev) => ({ ...prev, lecturerName: name }));
    };

    const setQuestionSetName = (name) => {
        setSessionData((prev) => ({ ...prev, questionSetName: name }));
    };

    const setQuestions = (questions) => {
        setSessionData((prev) => ({ ...prev, questions }));
    };

    const setKeywords = (keywords) => {
        setSessionData((prev) => ({ ...prev, keywords }))
    }

    const fetchSession = async (sessionId) => {
        const response = await fetch(`http://localhost:5000/session/${sessionId}`);
        const data = await response.json();
        setSessionData(data);
    };

    return (
        <SessionContext.Provider value={{ sessionData, setLecturerName, setQuestionSetName, setQuestions, setKeywords, fetchSession }}>
            {children}
        </SessionContext.Provider>
    );
};
