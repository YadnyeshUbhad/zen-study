const supabase = require('../config/supabaseClient');
const { generateContent } = require('./llmService');

const generateAndSaveContent = async (videoData) => {
    const { title, summary, duration, tags, isCoding } = videoData;

    try {
        // 1. Save Video Metadata
        const { data: video, error: videoError } = await supabase
            .from('videos')
            .insert([{ title, summary, duration, tags, is_coding: isCoding }])
            .select()
            .single();

        if (videoError) throw videoError;

        console.log(`Video created: ${video.id}`);

        // 2. Generate Content via LLM
        const generatedContent = await generateContent(title, summary, tags, isCoding);

        // 3. Save Quiz
        if (generatedContent.quiz) {
            const { error: quizError } = await supabase
                .from('quizzes')
                .insert([{
                    video_id: video.id,
                    questions: generatedContent.quiz
                }]);

            if (quizError) throw quizError;
            console.log(`Quiz saved for video: ${video.id}`);
        }

        // 4. Save Coding Problems (if applicable)
        if (isCoding && generatedContent.coding_problems) {
            for (const problem of generatedContent.coding_problems) {
                // Save Problem
                const { data: savedProblem, error: problemError } = await supabase
                    .from('coding_problems')
                    .insert([{
                        video_id: video.id,
                        title: problem.title,
                        description: problem.description,
                        difficulty: problem.difficulty,
                        starter_templates: problem.starter_templates,
                        reference_solution: problem.reference_solution
                    }])
                    .select()
                    .single();

                if (problemError) throw problemError;

                // Save Test Cases
                if (problem.test_cases) {
                    const testCasesToInsert = [];

                    if (problem.test_cases.visible) {
                        problem.test_cases.visible.forEach(tc => {
                            testCasesToInsert.push({
                                problem_id: savedProblem.id,
                                input: tc.input,
                                expected_output: tc.expected_output,
                                is_hidden: false
                            });
                        });
                    }

                    if (problem.test_cases.hidden) {
                        problem.test_cases.hidden.forEach(tc => {
                            testCasesToInsert.push({
                                problem_id: savedProblem.id,
                                input: tc.input,
                                expected_output: tc.expected_output,
                                is_hidden: true
                            });
                        });
                    }

                    const { error: tcError } = await supabase
                        .from('test_cases')
                        .insert(testCasesToInsert);

                    if (tcError) throw tcError;
                }
            }
            console.log(`Coding problems saved for video: ${video.id}`);
        }

        return { success: true, videoId: video.id };

    } catch (error) {
        console.error("Error in generateAndSaveContent:", error);
        throw error;
    }
};

module.exports = { generateAndSaveContent };
