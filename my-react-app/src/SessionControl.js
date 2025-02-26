const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let sessions = {}; // Temporary storage

app.post("/create-session", (req, res) => {
    const { lecturerName, questionSetName, questions, keywords} = req.body;
    const sessionId = uuidv4(); // Generate unique link ID
    sessions[sessionId] = { lecturerName, questionSetName, questions, keywords };
    
    res.json({ sessionId, link: `http://localhost:3000/student/${sessionId}` });
});

app.post("/join-session/:sessionId", (req, res) => {
    // const { studentName } = req.body;
    const { sessionId } = req.params;

    if (!sessions[sessionId]) {
        return res.status(404).json({ message: "Session not found" });
    }

    // sessions[sessionId].students.push(studentName);
    res.json({ message: "Student added" });
});

app.get("/session/:sessionId", (req, res) => {
    const session = sessions[req.params.sessionId];
    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
});

app.listen(5000, () => console.log("Server running on port 5000"));