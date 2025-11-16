# RAG System with ChromaDB

A RAG (Retrieval-Augmented Generation) system using LangChain and ChromaDB, fully containerized with Docker.

## Prerequisites

- Docker and Docker Compose installed
- OpenAI API key

## Setup

1. **Clone the repository** (if from git)
```bash
git clone <your-repo-url>
cd rag-system-js
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Create a `.env` file** in the project root:
```bash
OPENAI_API_KEY=your_openai_api_key_here
CHROMA_URL=http://localhost:8005
```

4. **Place your PDF file** in the `data/` directory as `myfile.pdf`

## Running with Docker

### Option 1: Run ChromaDB only (develop locally)

Start just the ChromaDB container:
```bash
docker compose up -d chromadb
```

Then run your Node.js scripts locally:
```bash
node ingest.js
```

### Option 2: Run everything in Docker

Build and start all services:
```bash
docker compose up -d
```

Run the ingestion:
```bash
docker compose exec app node ingest.js
```

Run queries:
```bash
docker compose exec app node query.js
```

## Checking ChromaDB Status

Check if ChromaDB is running:
```bash
docker compose ps
```

View ChromaDB logs:
```bash
docker compose logs chromadb
```

## Stopping Services

```bash
docker compose down
```

To remove all data:
```bash
docker compose down -v
```

## Configuration

- **ChromaDB Port**: 8005 (configurable in docker-compose.yml)
- **CHROMA_URL**: Automatically set to `http://localhost:8005` for local development
- When running inside Docker, the app uses `http://chromadb:8000` to communicate with ChromaDB

## Using the Web UI

The easiest way to view and search your ChromaDB data:

```bash
npm run viewer
```

Then open your browser to: **http://localhost:3000**

Features:
- 📊 View all collections and document counts
- 📄 Browse individual documents
- 🔍 Semantic search with similarity scores
- 🎨 Beautiful, responsive interface

## Command Line Scripts

**Ingest PDF:**
```bash
npm run ingest
# or: node ingest.js
```

**Query/Search:**
```bash
npm run query "Your question here"
# or: node query.js "Your question here"
```

**Inspect ChromaDB:**
```bash
node inspect-chroma.js
```

## Project Structure

- `server.js` - Web server for ChromaDB viewer
- `public/index.html` - Web UI for browsing ChromaDB
- `ingest.js` - Loads PDF and stores embeddings in ChromaDB
- `embeddings.js` - OpenAI embeddings configuration
- `query.js` - Query the RAG system with AI responses
- `inspect-chroma.js` - CLI tool to inspect ChromaDB data
- `docker-compose.yml` - Docker services configuration
- `Dockerfile` - Node.js application container

