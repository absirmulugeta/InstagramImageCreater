import { GoogleGenAI, Modality, GenerateContentResponse, Part } from '@google/genai';
import type { GeneratedImageData } from '../types';

// Helper to convert a file to a base64 generative part
const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        // Handle the case where the result is not a string (e.g., ArrayBuffer)
        resolve(''); // Or handle error appropriately
      }
    };
    reader.readAsDataURL(file);
  });
  const base64Data = await base64EncodedDataPromise;
  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type,
    },
  };
};

// Helper to extract a JSON object from a string
const extractJson = (text: string): { description: string; altText: string; clothingDescription: string } => {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/);
  if (!jsonMatch) {
    console.warn("Could not find JSON in model response:", text);
    return { 
        description: 'A beautiful travel memory.', 
        altText: 'AI-generated travel image.',
        clothingDescription: 'a stylish and comfortable travel outfit'
    };
  }
  try {
    const jsonString = jsonMatch[1] || jsonMatch[2];
    const parsed = JSON.parse(jsonString);
    return {
        description: parsed.description || 'A beautiful travel memory.',
        altText: parsed.altText || 'AI-generated travel image.',
        clothingDescription: parsed.clothingDescription || 'a stylish and comfortable travel outfit'
    };
  } catch (e) {
    console.error("Failed to parse JSON from model response:", text, e);
    return { 
        description: 'Could not parse description from AI response.', 
        altText: 'Could not parse alt text from AI response.',
        clothingDescription: 'a stylish and comfortable travel outfit'
    };
  }
};

// Step 1: Generate the text content and clothing description once for all images.
const generateSceneDetails = async (ai: GoogleGenAI, country: string, destination: string): Promise<{description: string, altText: string, clothingDescription: string}> => {
    const prompt = `You are a creative travel blogger and stylist. Write content for an Instagram post about a trip to ${destination}, ${country}.
Provide your response as a single JSON object with three keys:
1. "description": A short, engaging Instagram caption (1-2 sentences, max 40 words).
2. "altText": A detailed, descriptive alt text template for accessibility. It should describe a person at the location.
3. "clothingDescription": A specific and detailed description of a single, stylish, and culturally appropriate travel outfit. Be specific about items and colors.

Example JSON format:
\`\`\`json
{
  "description": "Living my best life exploring the ancient wonders of Rome!",
  "altText": "A photo of a person standing in front of the Colosseum in Rome under a clear blue sky.",
  "clothingDescription": "a lightweight white linen shirt, comfortable beige chino shorts, brown leather sandals, and classic aviator sunglasses"
}
\`\`\``;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    const text = response.text;
    if (!text) {
        throw new Error("Failed to generate description. The AI model did not return any text content.");
    }
    
    return extractJson(text);
};


// Step 2: Generate a single image with a specific style and clothing.
const generateSingleImage = async (ai: GoogleGenAI, imagePart: Part, country: string, destination: string, stylePrompt: string, clothingDescription: string): Promise<string> => {
  const prompt = `Create a photorealistic image placing the person from the provided photo at ${destination}, ${country}.
It is critically important that you DO NOT change their facial features, face structure, or ethnicity. Preserve the person's face exactly as it is in the original image.
You MUST change their clothing to match this exact description: ${clothingDescription}.
The final image should look like a high-quality travel photograph, with a portrait aspect ratio of 4:5, suitable for social media.
${stylePrompt}`; // Apply the specific style here.

  const textPart = { text: prompt };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT], // TEXT is included as per model requirements, though we don't use the text output here.
    },
  });
  
  if (!response.candidates?.[0]?.content?.parts) {
      const blockReason = response.promptFeedback?.blockReason;
      const finishReason = response.promptFeedback?.blockReason ? 'BLOCKED' : (response.candidates?.[0]?.finishReason || 'UNKNOWN');
      console.error(`Image generation failed for style: "${stylePrompt}". The request was blocked or returned no content.`, { finishReason, blockReason });
      throw new Error(`Image generation failed. Reason: ${blockReason || finishReason}`);
  }
  
  const imagePartResponse = response.candidates[0].content.parts.find(part => part.inlineData);

  if (imagePartResponse?.inlineData) {
    const base64ImageBytes: string = imagePartResponse.inlineData.data;
    return `data:${imagePartResponse.inlineData.mimeType};base64,${base64ImageBytes}`;
  } else {
    const finishReason = response.candidates[0].finishReason;
    const errorMessage = `Image generation failed for style: "${stylePrompt}". The model did not return an image.`;
    console.error(errorMessage, { finishReason });
    throw new Error(errorMessage);
  }
};

// Main orchestrator function
export const generateTravelImage = async (imageFile: File, country: string, destination: string): Promise<GeneratedImageData[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // First, generate the single description, alt text, and clothing for all images.
  const sceneDetails = await generateSceneDetails(ai, country, destination);

  // Then, prepare for image generation.
  const imagePart = await fileToGenerativePart(imageFile);

  const stylePrompts = [
    "Style: A vibrant, sunny day candid shot with natural lighting and bright colors.",
    "Style: A dramatic, cinematic shot with moody lighting, perhaps during the golden hour just before sunset.",
    "Style: A professional portrait shot. Use a shallow depth of field to create a beautifully blurred background (bokeh effect), making the person stand out.",
    "Style: An epic, scenic shot. Make the background feel vast and grand, with the person as a key part of the beautiful landscape."
  ];

  const imagePromises = stylePrompts.map(prompt => 
      generateSingleImage(ai, imagePart, country, destination, prompt, sceneDetails.clothingDescription)
  );

  // Use Promise.allSettled to allow some image generations to fail without stopping the entire process.
  const results = await Promise.allSettled(imagePromises);
  
  const successfulImages: GeneratedImageData[] = [];
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      // Combine the successfully generated image URL with the pre-generated text content.
      successfulImages.push({
          imageUrl: result.value,
          description: sceneDetails.description,
          altText: sceneDetails.altText
      });
    } else {
      // Log the specific error for debugging purposes, but don't throw an error to the user unless all fail.
      console.error(`Image generation failed for style: "${stylePrompts[index]}". Reason:`, result.reason);
    }
  });

  // Only throw an error if ALL image generations failed.
  if (successfulImages.length === 0) {
      throw new Error("Unfortunately, all image generations failed. This could be due to a network issue or the content policy. Please try again with a different photo or destination.");
  }
    
  return successfulImages;
};