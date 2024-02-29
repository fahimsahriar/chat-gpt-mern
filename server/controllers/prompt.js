require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

const prompt =  async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{'role':'user', "content":"hi"}],
            max_tokens: 100
        });
        console.log(response.choices[0].message);

        // Send a response with a status code of 200 (OK) to Postman
        res.status(200).send(response.choices[0].message);
    } catch (error) {
        console.error("Error processing message:", error);
        // Send an error response with a status code of 500 (Internal Server Error) to Postman
        res.status(500).send("Internal Server Error");
    }
}

module.exports = prompt;