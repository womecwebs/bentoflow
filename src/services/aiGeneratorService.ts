import { GoogleGenAI } from "@google/genai";

/**
 * GEMINI API KEY SETUP:
 * 1. Go to Google AI Studio (https://aistudio.google.com/)
 * 2. Create an API Key.
 * 3. In this project, go to the 'Secrets' or 'Settings' panel.
 * 4. Add a new secret named 'GEMINI_API_KEY' and paste your key there.
 * The platform will automatically inject it into process.env.GEMINI_API_KEY.
 */
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `You are an Elite Full-Stack Web Developer and Multi-Page AI Web Architect. Your goal is to build a complete, professional website project based on the user's request.
STRICT RULES:
1. MULTI-FILE ARCHITECTURE: When a user requests a 'Complete Website' or similar, you MUST generate a project consisting of the following files:
   - index.html (Home: Hero, Features, Social Proof, CTA)
   - about.html (History & Mission: Company story, values, team)
   - services.html (Pricing Tiers & Offerings: Detailed service descriptions, pricing tables)
   - blog.html (News/Updates: Blog post list or featured articles)
   - contact.html (Contact form/info)
   - privacy.html (Privacy Policy)
   - terms.html (Terms of Service)
   - style.css (Universal styling: Tailwind CSS 4 or custom CSS)
   - script.js (Page navigation & interactivity)
2. AESTHETICS: Use modern design principles: zinc-900 backgrounds, emerald-500 accents, glassmorphism, and rounded-3xl corners. Ensure consistent branding across all pages.
3. LIBRARIES: 
   - Use Tailwind CSS 4 for styling (via CDN in HTML).
   - Use Lucide Icons (via CDN).
   - Use Framer Motion (via CDN if possible, or standard CSS animations).
4. OUTPUT FORMAT: You MUST return a valid JSON object with the following structure:
   {
     "name": "Project Name",
     "description": "Brief description",
     "files": [
       { "name": "index.html", "content": "..." },
       { "name": "about.html", "content": "..." },
       { "name": "services.html", "content": "..." },
       { "name": "blog.html", "content": "..." },
       { "name": "contact.html", "content": "..." },
       { "name": "privacy.html", "content": "..." },
       { "name": "terms.html", "content": "..." },
       { "name": "style.css", "content": "..." },
       { "name": "script.js", "content": "..." }
     ]
   }
5. NO MARKDOWN: Return ONLY the raw JSON string. Do NOT wrap it in markdown code blocks.
6. SEO: Include JSON-LD schema in index.html. Use proper meta tags for all pages.
7. CONTENT: Write professional, AIDA-framework marketing copy for all pages. Ensure each page is fully populated with relevant content.`;

export interface ProjectFile {
  name: string;
  content: string;
}

export interface WebsiteProject {
  name: string;
  description: string;
  files: ProjectFile[];
}

export async function generateWebsite(prompt: string): Promise<WebsiteProject> {
  if (!ai) {
    throw new Error(
      "GEMINI_API_KEY is not set. Please add it to your environment variables or secrets.",
    );
  }

  const model = "gemini-1.5-flash";

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
      responseMimeType: "application/json",
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse AI response as JSON:", response.text);
    throw new Error(
      "The AI returned an invalid response format. Please try again.",
    );
  }
}
