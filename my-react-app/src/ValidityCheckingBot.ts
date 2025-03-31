import express from 'express';
import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.REACT_APP_FYP_KEY
});

if (!anthropic.apiKey) {
  throw new Error("Missing Anthropic API key");
}

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


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});