
import { GoogleGenAI, Type } from "@google/genai";
import { PROJECTS } from "./data";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `
You are the AI assistant for a world-class Software Engineer's portfolio. 
The engineer's profile is focused on Ownership, Adaptability, and Problem Solving.
Here is the project data you should use to answer questions: ${JSON.stringify(PROJECTS)}

Your tone should be:
- Professional and confident
- Impact-driven
- Minimalist (avoid flowery language)
- Direct

Rules:
1. Only answer questions related to the engineer, their skills, or their projects.
2. If asked about a project, highlight the specific "Outcome" and "Impact".
3. Keep responses concise (max 3 sentences).
`;

export const askPortfolioAssistant = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("AI Assistant error:", error);
    return "The AI assistant is currently offline. Please review the projects manually.";
  }
};
