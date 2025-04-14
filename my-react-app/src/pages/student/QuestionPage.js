import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../../SessionContext.js";
import { useState, useEffect } from "react";
import { TextField, Button, Stack } from '@mui/material';
import { db } from "../../Firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import './styles/QuestionPage.css';

const QuestionPage = () => {
    const { sessionId } = useParams();
    const { sessionData, fetchSession } = useSession();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentCode, setCurrentCode] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [studentId, setStudentId] = useState(null);

    useEffect(() => {
        let id = localStorage.getItem('studentId');
        if (!id) {
          id = 'student_' + Math.random()
          localStorage.setItem('studentId', id);
        }
        setStudentId(id);
      }, []);

    const API_BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8080' 
    : 'https://but-then-what.onrender.com';

    const navigate = useNavigate();

    const endPage = () => {
        navigate(`/student/end/${sessionId}`);
    }

    const movePage = () => {
        if (currentIndex + 1 >= sessionData.questions.length) {
            endPage();
        } else {
            setCurrentIndex(currentIndex + 1)
        }
        setMessages([]);
        setCurrentCode("");
    };

    const askClaude = async() => {
        setIsLoading(true);
        const currentQuery = currentQuestion === "" ? "I don't know how to move forward with this question. Could you help?\n" : currentQuestion + "\n";

        try {
            const questionData = {
                question: sessionData.questions[currentIndex],
                keywords: sessionData.keywords[currentIndex],
                code: currentCode,
                query: currentQuery
            };
            const response = await fetch(`${API_BASE_URL}/ask-claude`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questionData }),
            });

            const data = await response.json();

            if (data.error) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: "assistant", content: `Error: ${data.error}` },
                  ]);
            } else {
                const responseText = data.response.content.map((item) => item.text).join("\n");

                const noLeakCheck = await validateQuestion(responseText, questionData.question);

                displayAnswer(noLeakCheck, currentQuery, responseText);

            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
        setCurrentQuestion("");
    }

    const validateQuestion = async(aiResponse, currentQuestion) => {
        const response = await fetch(`${API_BASE_URL}/ask-claude-validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ aiResponse, currentQuestion }),
            });

            const data = await response.json();
            const answer = data.response.content.map((item) => item.text).join("\n");
            return answer;
    }

    const displayAnswer = async (isAnswerLeakingInfo, currentQuery, currentAnswer) => {
        currentAnswer = currentAnswer + "\n";
    
        let updatedMessages = [...messages];
    
        if (isAnswerLeakingInfo === "NO") {
            updatedMessages = [
                ...updatedMessages,
                { role: "user", content: currentQuery },
                { role: "assistant", content: currentAnswer },
            ];
            setMessages(updatedMessages);
        } else {
            askClaude();
        }

        if (studentId) {
            try {
                await addDoc(collection(db, "conversations"), {
                    sessionId,
                    studentId,
                    question: sessionData.questions[currentIndex],
                    messages: updatedMessages,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.error("Error saving conversation:", error);
            }
        }
    };

    useEffect(() => {
        fetchSession(sessionId);
    }, [sessionId, fetchSession]);

    return (
        <div>
            <h1 id="question_set_name">{sessionData.questionSetName} - Question {currentIndex + 1}</h1>
            <p>Start the question in your IDE. When you need help with this question, put your code in the box below and ask me a question. If you don't know what to do, click the button below and I will give you a step in the right direction.</p>
            <Stack direction="row" spacing={6}>
                <Stack spacing={2}>
                    <p id="question">{sessionData.questions[currentIndex]}</p>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        id="code-input" 
                        label="Enter your code:"
                        variant="outlined"
                        onChange={(e) => setCurrentCode(e.target.value)}
                    >
                    </TextField>
                </Stack>
                    <TextField
                        fullWidth
                        multiline
                        rows={9}
                        id="chatbot-dialog-box" 
                        label="View conversation here:"
                        variant="outlined"
                        slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        value={messages
                            .map((msg) => `${msg.role === "user" ? "You: " : "Tutor: "}${msg.content}`)
                            .join("\n")}
                    >
                    </TextField>
            </Stack>
            <br/>
            <TextField
                fullWidth
                id="question-input"
                label="Ask a question: (hit Enter key to submit)"
                variant="outlined"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    askClaude();
                    }
                }}
            />
            <Stack direction="row"  sx={{
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Button variant="outlined" onClick={() => setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0}>
                    Previous
                </Button>

                <Button id="help-button" variant="contained" onClick={askClaude} >I need help.</Button>
                <Button id="next-button" variant="outlined" onClick={movePage}>
                    Next
                </Button>
            </Stack>

            {isLoading && (
                <div style={{ marginTop: "5px", textAlign: "center" }}>
                    <p>Loading answer...</p>
                </div>
            )}
        </div>
    );
}

export default QuestionPage;