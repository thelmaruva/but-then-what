import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

let sessions = {}; // Temporary storage

const port = process.env.PORT || 5000;

app.post("/create-session", (req, res) => {
    const { lecturerName, questionSetName, questions, keywords} = req.body;
    const sessionId = uuidv4(); // Generate unique link ID
    sessions[sessionId] = { lecturerName, questionSetName, questions, keywords };
    
    res.json({ sessionId });
});

app.post("/update-session/:sessionId", (req, res) => {
    const { sessionId } = req.params;
    const { lecturerName, questionSetName, questions, keywords} = req.body;

    if (!sessions[sessionId]) {
        return res.status(404).json({ message: "Session not found" });
    } else {
        sessions[sessionId] = { lecturerName, questionSetName, questions, keywords };
        res.json("Session updated");
    }
});

app.get("/session/:sessionId", (req, res) => {
    const session = sessions[req.params.sessionId];
    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
});

app.listen(port, () => console.log("Server running on port 5000"));