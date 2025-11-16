# Viewing Embeddings in ChromaDB UI

## 🔍 How to Access Embeddings

1. **Open the Web UI**: http://localhost:3000
2. **Click on a Collection** (e.g., "rag_demo")
3. **Look for the purple button** on each document card that says:
   ```
   ⚡ Embedding Vector (3072 dimensions)
   ```
4. **Click the button** to expand the embedding viewer

## 📊 Embedding Visualization Options

Once expanded, you'll see 4 viewing options:

### 1. **📊 Stats** (Default View)
Shows statistical analysis of the embedding:
- **Dimensions**: Total number of dimensions (e.g., 3072 for text-embedding-3-large)
- **Mean**: Average value across all dimensions
- **Min/Max**: Range of values
- **Standard Deviation**: Spread of values
- **Range**: Difference between max and min

### 2. **👁️ Preview**
- Shows the first 20 dimensions
- Quick peek at the actual numbers
- Formatted in array notation

### 3. **📄 Full Vector**
- Complete embedding vector
- All dimensions displayed
- Scrollable view
- Numbers formatted to 6 decimal places
- Arranged in rows of 10 for readability

### 4. **📈 Visualization**
- Bar chart of first 50 dimensions
- **Blue bars** = positive values
- **Red bars** = negative values
- Height represents magnitude
- Hover to see exact values

## 🎯 What Are Embeddings?

Embeddings are numerical representations of your text in high-dimensional space. Each document is converted into a vector where:
- Similar documents have similar vectors
- The distance between vectors indicates semantic similarity
- Used for semantic search and retrieval

## 💡 Use Cases

- **Debug embeddings**: Check if they're generated correctly
- **Compare documents**: See how different documents are encoded
- **Understand dimensions**: See the size and scale of your vectors
- **Visualize patterns**: Identify positive/negative value distributions

## 🚀 Technical Details

- **Model**: OpenAI text-embedding-3-large
- **Dimensions**: 3072 (default for this model)
- **Format**: Float array
- **Storage**: ChromaDB vector database

