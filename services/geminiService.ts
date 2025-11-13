
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a marketing description for a Tenun product using the Gemini API.
 * @param productName The name of the Tenun product.
 * @returns A promise that resolves to the generated description string.
 */
export const generateProductDescription = async (productName: string): Promise<string> => {
    if (!apiKey) {
        // Return a mock description if API key is not set for development purposes
        return new Promise(resolve => setTimeout(() => resolve(`Ini adalah deskripsi yang menarik untuk ${productName}. Dibuat dengan bahan berkualitas tinggi dan motif tradisional yang memukau, produk ini mencerminkan kekayaan budaya Tapanuli Utara. Cocok untuk acara formal maupun sebagai koleksi berharga.`), 1000));
    }
    
  try {
    const prompt = `Buat deskripsi pemasaran yang menarik dan singkat (sekitar 2-3 kalimat) untuk produk tenun tradisional dari Tapanuli Utara bernama "${productName}". Tonjolkan keunikan, nilai budaya, dan kualitasnya.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });

    const text = response.text.trim();
    if (!text) {
        throw new Error("Received an empty response from Gemini API.");
    }
    
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Gagal menghasilkan deskripsi dari AI.");
  }
};
