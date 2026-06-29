import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser, getUserDocuments, saveUserDocument, deleteUserDocument } from "./src/db/helpers.ts";

dotenv.config();

const app = express();
const PORT = 3000;

// Set payload limit to 20MB to allow document/image uploads
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

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

// API to list all documents stored on the Cloud SQL backend for a user
app.get("/api/documents", requireAuth, async (req: AuthRequest, res) => {
  try {
    const userUid = req.user?.uid;
    const userEmail = req.user?.email || "";
    if (!userUid) {
      return res.status(401).json({ error: "Unauthorized: Missing user UID" });
    }

    // Sync user profile to PostgreSQL
    const dbUser = await getOrCreateUser(userUid, userEmail);

    const docs = await getUserDocuments(dbUser.id);
    // Return sorted by newest first
    const sortedDocs = [...docs].sort(
      (a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
    );
    res.json(sortedDocs);
  } catch (error: any) {
    console.error("Error in GET /api/documents:", error);
    res.status(500).json({ error: "មិនអាចទាញយកបញ្ជីឯកសារបានទេ (Failed to retrieve document list)" });
  }
});

// API to save a new document or note for a user
app.post("/api/documents", requireAuth, async (req: AuthRequest, res) => {
  try {
    const userUid = req.user?.uid;
    const userEmail = req.user?.email || "";
    if (!userUid) {
      return res.status(401).json({ error: "Unauthorized: Missing user UID" });
    }

    const { name, type, fileType, size, content } = req.body;
    
    if (!name || !type || !content) {
      return res.status(400).json({ error: "ឈ្មោះ ប្រភេទ និងខ្លឹមសារមិនអាចទទេបានទេ (Name, type, and content are required)" });
    }

    // Sync user profile to PostgreSQL
    const dbUser = await getOrCreateUser(userUid, userEmail);

    const newDoc = await saveUserDocument(dbUser.id, {
      name,
      type,
      fileType: fileType || (type === "note" ? "text/markdown" : "application/octet-stream"),
      size: size || Buffer.byteLength(content, "utf8"),
      content,
    });

    res.status(201).json(newDoc);
  } catch (error: any) {
    console.error("Error in POST /api/documents:", error);
    res.status(500).json({ error: "មិនអាចរក្សាទុកឯកសារបានទេ (Failed to save document)" });
  }
});

// API to delete a document by ID for a user
app.delete("/api/documents/:id", requireAuth, async (req: AuthRequest, res) => {
  try {
    const userUid = req.user?.uid;
    const userEmail = req.user?.email || "";
    if (!userUid) {
      return res.status(401).json({ error: "Unauthorized: Missing user UID" });
    }

    const { id } = req.params;
    const docId = parseInt(id, 10);
    if (isNaN(docId)) {
      return res.status(400).json({ error: "លេខសម្គាល់មិនត្រឹមត្រូវ (Invalid document ID)" });
    }

    // Sync user profile to PostgreSQL
    const dbUser = await getOrCreateUser(userUid, userEmail);

    await deleteUserDocument(dbUser.id, docId);
    res.json({ success: true, message: "លុបឯកសារជោគជ័យ (Document deleted successfully)" });
  } catch (error: any) {
    console.error("Error in DELETE /api/documents:", error);
    res.status(500).json({ error: error.message || "មិនអាចលុបឯកសារបានទេ (Failed to delete document)" });
  }
});

// Math AI tutor API endpoint
app.post("/api/explain", async (req, res) => {
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

    const systemInstruction = `You are an expert Grade 12 Mathematics Tutor in Cambodia (លោកគ្រូគណិតវិទ្យាថ្នាក់ទី១២). 
Your specialty is Complex Numbers (ចំនួនកុំផ្លិច), Limits (លីមីត), and Trigonometry (ត្រីកោណមាត្រ) based on the Cambodian Ministry of Education, Youth and Sport (MoEYS) Grade 12 curriculum.

Please respond in a friendly, respectful, and encouraging tone in clear Khmer language (ភាសាខ្មែរ). 
When explaining math problems, provide clear step-by-step explanations, highlighting formulas used.
Use markdown for lists, bold text, and math equations (e.g., use LaTeX notation like $a + bi$, $\\cos\\alpha$, or $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$).
If the student asks something outside of math or Grade 12 curriculum, politely steer them back to learning Complex Numbers, Limits, and Trigonometry.

Context:
- Current topic being studied: ${topic || "General Grade 12 Math"}
- Always format mathematical formulas beautifully using bold text, symbols, or standard block notation so they are easy to read in Khmer.`;

    // Map history to Gemini content parts if provided
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.content }]
        });
      }
    }
    
    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await generateContentWithRetryAndFallback(ai, {
      contents: contents,
      systemInstruction: systemInstruction,
      temperature: 0.7,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/explain:", error);
    res.status(500).json({ error: error?.message || "មានកំហុសក្នុងការទំនាក់ទំនងជាមួយប្រព័ន្ធ AI (Error communicating with the AI system)" });
  }
});

// Configure Vite or Static files serving
async function setupApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupApp();
