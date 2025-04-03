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

    const port = Number(process.env.PORT) || 8080;


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
            const response = await fetch(`http://localhost:${port}/create-session`, {
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
    }, [port]);

    const updateSession = useCallback(async (data, sessionId) => {
        try {
            const response = await fetch(`http://localhost:${port}/update-session/${sessionId}`, {
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
    }, [port]);

    const fetchSession = useCallback(async (sessionId) => {
        try {
            const response = await fetch(`http://localhost:${port}/session/${sessionId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch session");
            }
            const data = await response.json();
            setSessionData(data);
        } catch (error) {
            console.error("Error fetching session:", error);
        }
    }, [port]);

    return (
        <SessionContext.Provider value={{ sessionData, setLecturerName, setQuestionSetName, setQuestions, setKeywords, createSession, updateSession, fetchSession, sessionId }}>
            {children}
        </SessionContext.Provider>
    );
};
