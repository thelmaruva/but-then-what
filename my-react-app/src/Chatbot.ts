import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";

dotenv.config();

// console.log("API Key:", process.env.FYP_PROJECT_KEY);

// const anthropic = new Anthropic({
//   apiKey: process.env.FYP_PROJECT_KEY,
// });

const anthropic = new Anthropic({
    apiKey: "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",
  });

// if (!anthropic.apiKey) {
//   throw new Error("Missing Anthropic API key");
// }

const msg = await anthropic.messages.create({
  model: "claude-3-7-sonnet-20250219",
  max_tokens: 1000,
  temperature: 1,
  system: "Respond like a tutor speaking to a student. You can guide them in the right direction but you cannot tell them the answer.",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "I am trying to solve a functional programming coding problem where I have to create a function that will recursively print out Fibonacci numbers but I don't know where to start."
        }
      ]
    }
  ]
});
console.log(msg);