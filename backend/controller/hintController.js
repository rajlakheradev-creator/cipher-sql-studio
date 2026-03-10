import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config({path:'D:\internship-assignment\cipher-sql-studio\.env'});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    You are a sql expert and you have to give hint of any question user asks.
    Analyze that question and give :
    1.Give 2 lines hint.
    2.It should be brief and clear.
    
    
    `;
    // ============================================

    const userMessage = `
Assignment Question: ${question}
Database Schema: ${schema}
Current Query: ${currentQuery}

Please provide a hint to help the user solve this SQL problem.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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
