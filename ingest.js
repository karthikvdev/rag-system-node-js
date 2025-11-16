import { Chroma } from "@langchain/community/vectorstores/chroma";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { embeddingModel } from "./embeddings.js";

async function ingest() {
  const loader = new PDFLoader("data/myfile.pdf");
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  });

  const chunks = await splitter.splitDocuments(docs);

  console.log("chunks", chunks);

  // Clean metadata to only include simple types (string, number, boolean)
  const cleanedChunks = chunks.map(chunk => ({
    ...chunk,
    metadata: {
      source: chunk.metadata.source || "unknown",
      page: chunk.metadata.loc?.pageNumber || 0
    }
  }));

  await Chroma.fromDocuments(cleanedChunks, embeddingModel, {
    collectionName: "rag_demo",
    url: process.env.CHROMA_URL || "http://localhost:8005"
  });

  console.log("📚 PDF Ingestion Complete!");
}

ingest();

