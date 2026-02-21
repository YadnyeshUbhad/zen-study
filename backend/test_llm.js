const OpenAI = require("openai");

// Testing the OpenRouter Key
const openai = new OpenAI({
    apiKey: "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",
    baseURL: "https://openrouter.ai/api/v1",
});

async function main() {
    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat", // Standard deepseek chat model
            messages: [
                { role: "user", content: "Hello!" },
            ],
        });
        console.log("Success:", completion.choices[0].message);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
