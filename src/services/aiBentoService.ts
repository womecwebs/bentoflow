import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateAIBentoGrid = async (prompt: string) => {
  const model = "gemini-3.1-pro-preview";
  
  const systemInstruction = `You are an expert UI/UX designer and frontend developer. 
  Your task is to generate a complex, production-ready React + Tailwind CSS bento grid component.
  
  LAYOUT RULES:
  - Use a 12-column CSS Grid (grid-cols-12).
  - Use col-span and row-span to create asymmetric, high-end layouts.
  - Avoid simple repetitive squares.
  - The layout should be responsive (stack on mobile, grid on desktop).
  
  AESTHETIC RULES:
  - Glassmorphism: Use bg-white/10 with backdrop-blur-md and border border-white/20.
  - Gradients: Use vibrant, mesh-style gradients for some cards.
  - Micro-interactions: Use Framer Motion (motion.div) with whileHover={{ scale: 1.02 }} for every card.
  - Typography: Use clean, modern sans-serif fonts.
  - Icons: Use Lucide React icons.
  
  OUTPUT FORMAT:
  - Return ONLY the React component code.
  - Do not include markdown code blocks.
  - Ensure all necessary imports are included (React, framer-motion, lucide-react).
  - The component should be named 'BentoGrid'.
  
  USER DESCRIPTION: ${prompt}`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: systemInstruction }] }],
    });

    return response.text || "";
  } catch (error) {
    console.error("AI Bento Generation Error:", error);
    throw error;
  }
};
