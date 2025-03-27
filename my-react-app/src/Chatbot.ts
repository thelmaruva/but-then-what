import express from 'express';
import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.REACT_APP_FYP_KEY,
});

app.post('/ask-claude', async (req, res) => {
  const { questionData } = req.body;
  const { question, keywords, code, query } = questionData;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1000,
      temperature: 1,
      system: "Respond like a tutor speaking to a student. Help the student to reason out the question they've been given by responding with probing questions or hints to help move the student closer to the desired output. You can guide them in the right direction but you cannot tell them the answer. These keywords were given to help you understand the domain of this problem: " + keywords,
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});