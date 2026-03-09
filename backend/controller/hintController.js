import pool from "../db/postgre.js";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function hints(req, res) {
  try {
    const { assignmentId, currentQuery, schema, question } = req.body;

    // ============================================
    // ADD YOUR PROMPT HERE
    // ============================================
    const systemPrompt = ``;
    // ============================================

    const userMessage = `
Assignment Question: ${question}
Database Schema: ${schema}
Current Query: ${currentQuery}

Please provide a hint to help the user solve this SQL problem.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 500,
    });

    const hint = completion.choices[0].message.content;
    res.json({ hint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
       