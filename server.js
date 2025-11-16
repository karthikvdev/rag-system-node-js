import express from "express";
import { ChromaClient } from "chromadb";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddingModel } from "./embeddings.js";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const CHROMA_URL = process.env.CHROMA_URL || "http://localhost:8005";

// Get all collections
app.get("/api/collections", async (req, res) => {
  try {
    const client = new ChromaClient({ path: CHROMA_URL });
    const collections = await client.listCollections();
    
    const collectionsWithCounts = await Promise.all(
      collections.map(async (col) => {
        const collection = await client.getCollection({ name: col.name });
        const count = await collection.count();
        return {
          name: col.name,
          id: col.id,
          count: count
        };
      })
    );
    
    res.json(collectionsWithCounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get documents from a collection
app.get("/api/collections/:name/documents", async (req, res) => {
  try {
    const client = new ChromaClient({ path: CHROMA_URL });
    const collection = await client.getCollection({ name: req.params.name });
    
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
    
    const results = await collection.get({
      limit: limit,
      offset: offset,
      include: ["embeddings", "documents", "metadatas"]
    });
    
    const documents = results.ids.map((id, index) => ({
      id: id,
      content: results.documents ? results.documents[index] : null,
      metadata: results.metadatas ? results.metadatas[index] : null,
      embedding: results.embeddings ? results.embeddings[index] : null
    }));
    
    res.json({
      total: await collection.count(),
      documents: documents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search/query documents
app.post("/api/search", async (req, res) => {
  try {
    const { query, collectionName, limit = 5 } = req.body;
    
    if (!query || !collectionName) {
      return res.status(400).json({ error: "Query and collectionName are required" });
    }
    
    const vectorStore = await Chroma.fromExistingCollection(embeddingModel, {
      collectionName: collectionName,
      url: CHROMA_URL
    });
    
    const results = await vectorStore.similaritySearchWithScore(query, limit);
    
    const formattedResults = results.map(([doc, score]) => ({
      content: doc.pageContent,
      metadata: doc.metadata,
      score: score
    }));
    
    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 ChromaDB Viewer running at http://localhost:${PORT}`);
  console.log(`📊 Connected to ChromaDB at ${CHROMA_URL}\n`);
});

