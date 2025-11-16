import { Chroma } from "@langchain/community/vectorstores/chroma";
import { ChatOpenAI } from "@langchain/openai";
import { embeddingModel } from "./embeddings.js";
import "dotenv/config";

async function query(question) {
  try {
    console.log("\n🔍 Searching ChromaDB for:", question);
    console.log("=".repeat(60));

    // Connect to existing ChromaDB collection
    const vectorStore = await Chroma.fromExistingCollection(embeddingModel, {
      collectionName: "rag_demo",
      url: process.env.CHROMA_URL || "http://localhost:8005"
    });

    // Search for relevant documents
    const results = await vectorStore.similaritySearch(question, 3);
    
    console.log(`\n📚 Found ${results.length} relevant documents:\n`);
    
    results.forEach((doc, index) => {
      console.log(`Document ${index + 1}:`);
      console.log(`Source: ${doc.metadata.source}, Page: ${doc.metadata.page}`);
      console.log(`Content: ${doc.pageContent.substring(0, 200)}...`);
      console.log("-".repeat(60));
    });

    // Use LLM to generate answer based on retrieved context
    console.log("\n🤖 Generating AI response...\n");
    
    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY
    });

    const context = results.map(doc => doc.pageContent).join("\n\n");
    const prompt = `Based on the following context, answer the question. If the answer is not in the context, say so.

Context:
${context}

Question: ${question}

Answer:`;

    const response = await llm.invoke(prompt);
    
    console.log("💬 Answer:");
    console.log("=".repeat(60));
    console.log(response.content);
    console.log("=".repeat(60) + "\n");

  } catch (error) {
    console.error("❌ Error querying:", error.message);
    process.exit(1);
  }
}

// Get question from command line or use default
const question = process.argv.slice(2).join(" ") || "What is this document about?";
query(question);
