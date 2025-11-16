# Git Setup Guide

## What's Ignored (.gitignore)

The `.gitignore` file ensures sensitive and unnecessary files aren't committed to your repository:

### 🔒 Sensitive Files (NEVER commit)
- `.env` - Contains your OpenAI API key and secrets
- `*.log` - May contain sensitive information
- `.env.*` - Any environment-specific configs

### 📦 Dependencies (Can be regenerated)
- `node_modules/` - Install with `npm install`
- `package-lock.json` / `yarn.lock` - May cause conflicts

### 🐳 Docker & Runtime
- `chroma_data/` - ChromaDB data (regenerate with ingestion)
- `*.tar` - Docker images

### 💻 IDE & OS Files
- `.vscode/`, `.idea/` - Editor configurations
- `.DS_Store` - macOS files
- `Thumbs.db` - Windows files

### 🗃️ Build & Temporary Files
- `dist/`, `build/` - Build outputs
- `*.tmp`, `tmp/` - Temporary files
- `*.log` - Log files

## 📝 What Should Be Committed

### ✅ Source Code
- `*.js` - All JavaScript files
- `*.html` - Web UI files
- `*.css` - Stylesheets (if any)

### ✅ Configuration
- `package.json` - Dependencies list
- `docker-compose.yml` - Docker setup
- `Dockerfile` - Container configuration
- `.dockerignore` - Docker ignore rules
- `.gitignore` - Git ignore rules

### ✅ Documentation
- `README.md` - Main documentation
- `*.md` - All markdown docs
- `EMBEDDINGS_GUIDE.md`
- `GIT_GUIDE.md`

### ⚠️ Data (Your Choice)
- `data/*.pdf` - **Currently NOT ignored**
  - If you want to ignore PDFs, uncomment line in `.gitignore`:
    ```bash
    # Uncomment to ignore PDF files:
    # data/*.pdf
    ```

## 🚀 Initial Git Setup

```bash
# Initialize git repository
git init

# Add all files (respects .gitignore)
git add .

# Create initial commit
git commit -m "Initial commit: RAG system with ChromaDB"

# Add remote repository
git remote add origin <your-repo-url>

# Push to remote
git push -u origin main
```

## 🔄 Common Git Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push changes
git push
```

## ⚠️ Important Notes

1. **Never commit `.env`** - It contains your API keys
2. **Share `.env` template** - Document required environment variables in README
3. **Regenerate `node_modules`** - Use `npm install` after cloning
4. **Docker volumes persist** - ChromaDB data survives even if not committed
5. **Consider data/ folder** - Decide if you want to commit your PDF files

## 🔐 If You Accidentally Commit Secrets

```bash
# Remove from git history (dangerous!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (only if necessary)
git push origin --force --all

# Rotate your API keys immediately!
```

## 📋 Recommended Branch Strategy

```bash
# Main branch for stable code
main (or master)

# Development branch
git checkout -b develop

# Feature branches
git checkout -b feature/new-feature

# Bug fix branches
git checkout -b fix/bug-description
```


