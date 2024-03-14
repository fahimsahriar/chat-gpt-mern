require("dotenv").config();
const OpenAI = require("openai");
const getCurrentWeather = require("../gpt_functions/getWeather");
const createEvent = require("../gpt_functions/createEvent");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
const messages = []; // Array to store conversation history

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
  {
    type: "function",
    function: {
      name: "createEvent",
      description: "Create a new event on the user's calendar",
      parameters: {
        type: "object",
        properties: {
          summary: {
            type: "string",
            description: "Summary or title of the event",
          },
          start: {
            type: "string",
            description: "Start date and time of the event (ISO 8601 format)",
          },
          end: {
            type: "string",
            description: "End date and time of the event (ISO 8601 format)",
          },
          location: {
            type: "string",
            description: "Location of the event",
          },
          description: {
            type: "string",
            description: "Description of the event",
          },
          attendees: {
            type: "array",
            description: "List of attendees",
            items: { type: "string" },
          },
        },
        required: ["summary", "start", "end"],
      },
    },
  },
];

const prompt = async (req, res) => {
  const { userMessage } = req.body;
  // Add user message to conversation history
  messages.push({ role: "user", content: userMessage });
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: messages,
      tools: tools,
      tool_choice: "auto", // auto is default, but we'll be explicit
    });
    const responseMessage = response.choices[0].message;

    // Step 2: check if the model wanted to call a function
    const toolCalls = responseMessage.tool_calls;
    if (responseMessage.tool_calls) {
      // Step 3: call the function
      // Note: the JSON response may not always be valid; be sure to handle errors
      const availableFunctions = {
        get_current_weather: getCurrentWeather,
        createEvent: createEvent,
      }; // only one function in this example, but you can have multiple
      messages.push(responseMessage); // extend conversation with assistant's reply
      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionToCall = availableFunctions[functionName];
        console.log("Function to call:", functionToCall);
        const functionArgs = JSON.parse(toolCall.function.arguments);
        console.log("Functions agr:", functionArgs);
        try {
          let functionResponse;
          if (functionName === 'get_current_weather') {
            functionResponse = await functionToCall(functionArgs.location, functionArgs.unit);
          } else if (functionName === 'createEvent') {
            functionResponse = await functionToCall(functionArgs);
          }
          //const functionResponse = await functionToCall(functionArgs.location);
          console.log(functionResponse);
          messages.push({
            tool_call_id: toolCall.id,
            role: "tool",
            name: functionName,
            content: functionResponse,
          });
          messages.push({
            role: "assistant",
            content:
              "analyze the output you have got and answer based on that.",
          });
        } catch (error) {
          console.error(
            `Error calling function ${functionName}:`,
            error.message
          );
          messages.push({
            tool_call_id: toolCall.id,
            role: "tool",
            name: functionName,
            content: { error: `Failed to execute function ${functionName}` },
          });
        }
      }
      const secondResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: messages,
      }); // get a new response from the model where it can see the function response
      console.log(secondResponse);

      // Send a response with a status code of 200 (OK) to Postman
      res.status(200).send(secondResponse.choices[0].message);
    } else {
      // Send a response with a status code of 200 (OK) to Postman
      res.status(200).send(response.choices[0].message);
    }
  } catch (error) {
    console.error("Error processing message:", error);
    // Send an error response with a status code of 500 (Internal Server Error) to Postman
    res.status(500).send("Internal Server Error");
  }
};

module.exports = prompt;
