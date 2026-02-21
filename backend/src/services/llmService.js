const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

const MASTER_PROMPT = `
You are generating structured learning content for an intelligent video-based learning platform.

PLATFORM RULES:
1. Video Progression Logic:
   * Quiz unlocks ONLY after video completion
   * Passing score = 80%
2. Quiz Rules:
   * Quiz MUST be based ONLY on provided video summary
   * Test conceptual understanding
   * Generate:
     • 5 MCQs
     • 3 True/False
     • 2 Short Answer
3. Coding Logic (ONLY IF isCodingVideo=true):
   * Generate 3 problems → Easy, Medium, Hard
   * Problems MUST use ONLY concepts from summary
4. Coding Problem Structure:
   Each problem must include:
   * title, description, constraints, input_format, output_format
   * reference_solution (Python)
   * starter_templates (Python, Java)
5. Test Case Rules:
   * Generate EXACTLY:
     • 3 visible test cases
     • 10 hidden test cases
   * expected_output MUST match reference_solution
6. Output Format:
   Return STRICT JSON only:
{
  "quiz": [
    { "type": "mcq", "question": "...", "options": ["A", "B", "C", "D"], "answer": "A" }
  ],
  "coding_problems": [
    {
      "title": "...",
      "description": "...",
      "difficulty": "Easy",
      "constraints": "...",
      "input_format": "...",
      "output_format": "...",
      "reference_solution": "...",
      "starter_templates": { "python": "...", "java": "..." },
      "test_cases": {
        "visible": [{ "input": "...", "expected_output": "..." }],
        "hidden": [{ "input": "...", "expected_output": "..." }]
      }
    }
  ]
}
`;

const generateContent = async (title, summary, tags, isCoding) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat", // Use "deepseek/deepseek-r1:free" if preferred/available
            messages: [
                {
                    role: "system",
                    content: MASTER_PROMPT
                },
                {
                    role: "user",
                    content: `
VIDEO DATA:
Title: ${title}
Summary: ${summary}
Tags: ${tags.join(", ")}
Coding Video: ${isCoding}
Supported Languages: ["python", "java"]
`
                }
            ],
            response_format: { type: 'json_object' }
        });

        // Parse JSON response
        const content = JSON.parse(completion.choices[0].message.content);
        return content;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
};

module.exports = { generateContent };
