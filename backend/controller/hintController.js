import dotenv from "dotenv";
import Groq from "groq-sdk";
dotenv.config({ path: "../.env" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function hints(req, res) {
  try {
    const { assignmentId, currentQuery, schema, question } = req.body;

    // Validate required fields
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // ============================================
    // ADD YOUR PROMPT HERE
    // ============================================
    const systemPrompt = `
   You are a SQL expert teaching a student.
1. Provide a 2-line conceptual hint without giving the full SQL code.
2. Focus on the JOIN logic or the WHERE clause needed for the specific question.
3. Keep it brief and encouraging.
`;
    // ============================================

    const userMessage = `
Assignment Question: ${question}
Database Schema: ${schema}
Current Query: ${currentQuery}

Please provide a hint to help the user solve this SQL problem.
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const hint = completion.choices[0].message.content;
    res.json({ hint });
  } catch (err) {
    console.error("Error generating hint:", err);
    res.status(500).json({ error: "Failed to generate hint" });
  }
}
