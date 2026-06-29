import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API client lazily
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("សេវា AI មិនទាន់ត្រូវបានកំណត់រចនាសម្ព័ន្ធត្រឹមត្រូវទេ។ សូមពិនិត្យមើល GEMINI_API_KEY។ (AI service not configured. Please check GEMINI_API_KEY in Secrets.)");
  }
  // Lazily instantiate the client
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Helper to generate content with retries and fallback
async function generateContentWithRetryAndFallback(
  ai: GoogleGenAI,
  params: {
    contents: any[];
    systemInstruction: string;
    temperature?: number;
  }
) {
  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-1.5-flash",
    "gemini-2.5-pro",
    "gemini-1.5-pro"
  ];

  let lastError: any = null;

  for (const model of modelsToTry) {
    const maxRetries = 2;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempting Gemini call with model: ${model}, attempt ${attempt}`);
        const response = await ai.models.generateContent({
          model: model,
          contents: params.contents,
          config: {
            systemInstruction: params.systemInstruction,
            temperature: params.temperature ?? 0.7,
          },
        });
        
        if (response && response.text) {
          console.log(`Successfully generated content using ${model}`);
          return response;
        }
        throw new Error("Empty response received from Gemini API");
      } catch (error: any) {
        lastError = error;
        console.error(`Attempt ${attempt} for model ${model} failed:`, error?.message || error);
        
        if (attempt === maxRetries) {
          break;
        }
        
        const delay = attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error("All Gemini generation attempts failed.");
}

export default async function handler(req: any, res: any) {
  // Add CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, topic, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "សារមិនអាចទទេបានទេ (Message cannot be empty)" });
    }

    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }

    const systemInstruction = `You are an expert Grade 12 Mathematics Tutor in Cambodia (លោកគ្រូគណិតវិទ្យាថ្នាក់ទី១២) and a general helpful assistant. 
Your specialty is Complex Numbers (ចំនួនកុំផ្លិច), Limits (លីមីត), and Trigonometry (ត្រីកោណមាត្រ) based on the Cambodian Ministry of Education, Youth and Sport (MoEYS) Grade 12 curriculum, but you are also happy to answer other questions generally, helpfully, and friendly in Khmer.

Please respond in a friendly, respectful, and encouraging tone in clear Khmer language (ភាសាខ្មែរ). 
When explaining math problems, provide clear step-by-step explanations, highlighting formulas used.
Use markdown for lists, bold text, and math equations (e.g., use LaTeX notation like $a + bi$, $\\cos\\alpha$, or $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$).
You are free to answer any general questions, helpfully and friendly, even if they are not related to mathematics.

Context:
- Current topic being studied: ${topic || "General Grade 12 Math"}
- Always format mathematical formulas beautifully using bold text, symbols, or standard block notation so they are easy to read in Khmer.`;

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.content }]
        });
      }
    }
    
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await generateContentWithRetryAndFallback(ai, {
      contents: contents,
      systemInstruction: systemInstruction,
      temperature: 0.7,
    });

    res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/explain:", error);
    res.status(500).json({ error: error?.message || "មានកំហុសក្នុងការទំនាក់ទំនងជាមួយប្រព័ន្ធ AI (Error communicating with the AI system)" });
  }
}
