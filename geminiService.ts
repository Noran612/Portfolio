
import { GoogleGenAI } from "@google/genai";
import { PROJECTS } from "./data";

const SYSTEM_PROMPT = `
You are the "Terminal Assistant" for a high-performance Software Engineer. 
Context: ${JSON.stringify(PROJECTS)}

Guidelines:
1. Respond as a technical system log or highly efficient assistant.
2. Focus on "Execution", "Ownership", and "Business Impact".
3. Use concise, punchy technical language.
4. If a user asks about a project, provide the tech stack and the "Net Outcome".
`;

export const askPortfolioAssistant = async (question: string): Promise<string> => {
  try {
    // Initializing inside the call to ensure process.env.API_KEY is current and avoids stale connection issues
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.5,
      },
    });

    return response.text || "NO_DATA_RETURNED";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "CONNECTION_REFUSED: Please verify API credentials or network state.";
  }
};
