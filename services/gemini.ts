
import { GoogleGenAI } from "@google/genai";

// Ensure we use the latest API key from process.env during each call
export const chatWithGemini = async (prompt: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  // Always use a named parameter for the API key inside the function scope
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        systemInstruction: `You are Nexus Intelligence AI, a senior Relationship Manager (RM) strategist for a Tier-1 Investment Bank. 
        You specialize in Fintech performance, loan book health, and client retention.
        You analyze:
        1. AUM (Assets Under Management) growth and capital flight.
        2. Credit risk and compliance (KYC/AML) status.
        3. Sentiment in high-net-worth (HNW) conversations.
        Provide actionable, regulatory-aware coaching advice. Use tables for risk-weighted asset comparisons.`
      },
    });

    // Access the text property directly on the response object
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "An error occurred while analyzing your request. Please check the console for details.";
  }
};
