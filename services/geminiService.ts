
import { GoogleGenAI, Type } from "@google/genai";
import { Message, Phase } from "../types";

export async function getStudyAdvice(
  currentPhaseTitle: string, 
  completedCount: number, 
  totalCount: number,
  nextTask: string
) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Act as an expert AI Learning Coach. 
  The user is currently in "${currentPhaseTitle}". 
  Progress: ${completedCount}/${totalCount} tasks completed.
  Next suggested task: "${nextTask}".
  
  Provide a short, motivating 2-sentence piece of advice on how to tackle the next phase or task effectively. 
  Keep it professional yet inspiring.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Keep pushing! You're making great progress in your AI journey.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Focus on consistent daily practice. The compound effect of learning AI tools will pay off soon!";
  }
}

export async function chatWithAssistant(
  userMessage: string,
  history: Message[],
  roadmapData: Phase[],
  userProgress: string[]
) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Inject context about the roadmap so the AI knows what the user is talking about
  const roadmapContext = roadmapData.map(p => {
    return `${p.title}: ${p.modules.map(m => m.name).join(', ')}`;
  }).join(' | ');

  const systemInstruction = `You are the AI Mastery Coach. Your goal is to help users navigate their AI learning roadmap.
  Roadmap Context: ${roadmapContext}.
  User has completed these task IDs: ${userProgress.join(', ')}.
  Be concise, technical but encouraging, and focus on practical applications. 
  If they ask about a specific module, provide tips or explain why it's important.`;

  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });

  // Convert internal history to Gemini format (optional, here we just send the message)
  // For simplicity in this demo, we'll just send the current message with context
  try {
    const response = await chat.sendMessage({ message: userMessage });
    return response.text || "I'm here to help with your roadmap!";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having a bit of trouble connecting to my brain. Ask me again in a second!";
  }
}
