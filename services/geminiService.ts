
import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, GeneratedContent } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateConversationStarters(userInput: UserInput): Promise<GeneratedContent> {
  const { aboutMe, context, audience } = userInput;

  const prompt = `
    You are an expert in social dynamics and communication, tasked with helping users craft perfect conversation starters.
    Based on the user's information provided below, generate a JSON object with three keys: "starters", "analysis", and "warnings".

    1.  **"starters"**: This should be an array of 3-5 unique, engaging, and context-appropriate opening lines.
    2.  **"analysis"**: In this string, explain the psychological or social reasoning behind why these suggested starters are effective for the given context and audience.
    3.  **"warnings"**: In this string, provide advice on potential pitfalls. Explain how these same starters could be misinterpreted or be ineffective in a different context (e.g., professional vs. casual).

    User's Information:
    - About Me: ${aboutMe}
    - The Context: ${context}
    - My Audience: ${audience}

    Generate the response strictly in the JSON format defined by the provided schema.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            starters: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of 3-5 conversation starter strings."
            },
            analysis: {
              type: Type.STRING,
              description: "An analysis of why the starters are effective."
            },
            warnings: {
              type: Type.STRING,
              description: "Warnings about potential misinterpretations in other contexts."
            }
          },
          required: ["starters", "analysis", "warnings"]
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    return parsedJson as GeneratedContent;

  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to get suggestions from the AI. Please check your inputs or try again later.");
  }
}
