import { ChromaClient } from "chromadb";

async function inspectChroma() {
  const client = new ChromaClient({
    path: process.env.CHROMA_URL || "http://localhost:8005"
  });

  try {
    // List all collections
    const collections = await client.listCollections();
    console.log("\n📚 Collections in ChromaDB:");
    console.log("=".repeat(50));
    
    if (collections.length === 0) {
      console.log("No collections found.");
      return;
    }

    for (const collection of collections) {
      console.log(`\n📁 Collection: ${collection.name}`);
      console.log(`   ID: ${collection.id}`);
      
      // Get the collection
      const coll = await client.getCollection({ name: collection.name });
      
      // Count documents
      const count = await coll.count();
      console.log(`   📊 Document count: ${count}`);
      
      // Get a sample of documents (first 5)
      if (count > 0) {
        const sample = await coll.get({ limit: 5 });
        
        console.log(`\n   📄 Sample documents (showing ${Math.min(5, count)} of ${count}):`);
        console.log("   " + "-".repeat(46));
        
        for (let i = 0; i < sample.ids.length; i++) {
          console.log(`\n   Document ${i + 1}:`);
          console.log(`   ID: ${sample.ids[i]}`);
          
          if (sample.metadatas && sample.metadatas[i]) {
            console.log(`   Metadata:`, JSON.stringify(sample.metadatas[i], null, 2).split('\n').join('\n   '));
          }
          
          if (sample.documents && sample.documents[i]) {
            const preview = sample.documents[i].substring(0, 150);
            console.log(`   Content: ${preview}${sample.documents[i].length > 150 ? '...' : ''}`);
          }
        }
      }
      
      console.log("\n" + "=".repeat(50));
    }
    
    console.log("\n✅ Inspection complete!\n");
    
  } catch (error) {
    console.error("❌ Error inspecting ChromaDB:", error.message);
    process.exit(1);
  }
}

inspectChroma();


