import { createContext, useContext, useState, useCallback } from "react";

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

    const [sessionId, setSessionId] = useState("");

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

    const createSession = useCallback(async (data) => {
        try {
            const response = await fetch("http://localhost:5000/create-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to create session");
            }

            const result = await response.json();
            setSessionId(result.sessionId);
            console.log(`SessionId is: ${result.sessionId}`)
            setSessionData(data);
            return result;
        } catch (error) {
            console.error("Error creating session:", error);
            throw error;
        }
    }, []);

    const updateSession = useCallback(async (data, sessionId) => {
        try {
            const response = await fetch(`http://localhost:5000/update-session/${sessionId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to update session");
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error updating session:", error);
            throw error;
        }
    }, []);

    const fetchSession = useCallback(async (sessionId) => {
        try {
            const response = await fetch(`http://localhost:5000/session/${sessionId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch session");
            }
            const data = await response.json();
            setSessionData(data);
        } catch (error) {
            console.error("Error fetching session:", error);
        }
    }, []);

    return (
        <SessionContext.Provider value={{ sessionData, setLecturerName, setQuestionSetName, setQuestions, setKeywords, createSession, updateSession, fetchSession, sessionId }}>
            {children}
        </SessionContext.Provider>
    );
};
