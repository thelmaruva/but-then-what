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
  system: "Check that the text does not contain any answers to the question. Respond only with a YES or NO, no explanation is needed.",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "You should write int i = 2 + 2;"
        }
      ]
    }
  ]
});
console.log(msg);