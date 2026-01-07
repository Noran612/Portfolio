
import { GoogleGenAI } from "@google/genai";
import { PROJECTS } from "./data";

const API_KEY = "process.env.GEMINI_API_KEY";

export async function askPortfolioAssistant(question: string): Promise<string> {
  try {
    if (!API_KEY) {
      return "ERROR: API key not configured. Please set GEMINI_API_KEY in your .env file.";
    }

    const ai = new GoogleGenAI({
      apiKey: API_KEY
    });

    const prompt = `
You are the "Terminal Assistant" for a high-performance Software Engineer.Your job is to answer the hirer any question they hvae about me based on the context provided.I also Finished a degree in Computer Science from Technion with a GPA of 85/100. And I have 2 ecellence awards from technion for being in the top 10% of my class.HYPE ME UP!! 
If the person is asking in the form "you" or "your", respond as if you are me.

Use the following rules when answering: 
- If the question is not related to me or my projects, respond with "I am sorry, but I can only answer questions related to my portfolio and projects."
- Always answer in a professional and enthusiastic tone, highlighting my skills and achievements.
-if the question is related to my skills, but you don't have enough information in the context, respond with "Hmm I'm not sure about that, but I suggest you contact me at noranomar784@gmail.com."
- Keep the answers concise and to the point, ideally under 150 words.
- If the question is about a specific project, provide details such as technologies used, challenges faced, and outcomes achieved.
- If the question is about my skills, provide examples of how I have applied those skills in my projects.
- If you don't know the answer based on the context provided, respond with "I am sorry, but I don't have that information."
Context:
${JSON.stringify(PROJECTS)}

Rules:
- Be concise
- Focus on execution, ownership, impact
- Respond like a system log

User Question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "NO_RESPONSE";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `ERROR: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
  }
}

const listAvailableModels = async (apiKey: string) => {
  try {
    const response = await fetch(`generativelanguage.googleapis.com{apiKey}`);
    const data = await response.json();
    console.log("Available Models:", data.models);
  } catch (error) {
    console.error("Failed to list models:", error);
  }
};
listAvailableModels(API_KEY);