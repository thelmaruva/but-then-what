import express from 'express';
import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
import cors from 'cors';
import { v4 as uuidv4 } from "uuid";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8080; // Single port for all routes

// Middleware (shared for all routes)
app.use(cors());
app.use(express.json());

// Temporary storage for sessions
let sessions = {};

const anthropic = new Anthropic({
  apiKey: process.env.REACT_APP_FYP_KEY
});

if (!anthropic.apiKey) {
  throw new Error("Missing Anthropic API key");
}

// --- Routes from your first app ---
app.post('/ask-claude-validate', async (req, res) => {
    const { responseToCheck, questionToCheck } = req.body;

    try{
      const msg = await anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 1000,
      temperature: 1,
      system: "Respond only with a YES or NO, no explanation is needed.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Does the text contain the solution to this question?: " + questionToCheck + "This is the text: " + responseToCheck
            }
          ]
        }
      ]
      });
      res.json({ response: msg });
    } catch (error) {
        console.error("Error calling Claude API:", error);
        res.status(500).json({ error: "Failed to get response from Claude API" });
    }
});

// --- Routes from your second app ---
app.post('/ask-claude', async (req, res) => {
    const { questionData } = req.body;
    const { question, keywords, code, query } = questionData;
  
    try {
      const msg = await anthropic.messages.create({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1000,
        temperature: 1,
        system: "Respond like a tutor speaking to a student. Help the student to reason out the question they've been given by responding with probing questions or hints to help move the student closer to the desired output. You can guide them in the right direction but you cannot tell them the answer. Give a very brief response, maximum 3 sentences and keep it conversational. Only ask one question at a time. Don't give hints to improve the code, just to help the student figure out what is wrong. These keywords were given to help you understand the domain of this problem: " + keywords,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: ". I was given this question, and I am having trouble trying to solve it: " + question + 
                "This is the code I have so far: " + code + "\n" + query
              }
            ]
          }
        ]
      });
      res.json({ response: msg });
    } catch (error) {
      console.error("Error calling Claude API:", error);
      res.status(500).json({ error: "Failed to get response from Claude API" });
    }
});

// --- Routes from your third app ---
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

app.use(express.static(path.join(__dirname, 'build')));

// Handle client-side routing - return index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});