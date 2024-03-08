require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
const conversationHistory = []; // Array to store conversation history

const tools = [
  {
    type: "function",
    function: {
      name: "get_current_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
          unit: { type: "string", enum: ["celsius", "fahrenheit"] },
        },
        required: ["location"],
      },
    },
  },
];

const prompt = async (req, res) => {
  const { userMessage } = req.body;
  // Add user message to conversation history
  conversationHistory.push({ role: "user", content: userMessage });
  try {
    console.log(conversationHistory);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory, // Pass conversation history to API
    });
    // Add AI response to conversation history
    conversationHistory.push({
      role: "assistant",
      content: response.choices[0].message.content,
    });

    // Send a response with a status code of 200 (OK) to Postman
    res.status(200).send(response.choices[0].message);
  } catch (error) {
    console.error("Error processing message:", error);
    // Send an error response with a status code of 500 (Internal Server Error) to Postman
    res.status(500).send("Internal Server Error");
  }
};

module.exports = prompt;
