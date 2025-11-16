import { OpenAIEmbeddings } from "@langchain/openai";
import "dotenv/config";

export const embeddingModel = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
  apiKey: process.env.OPENAI_API_KEY
});
