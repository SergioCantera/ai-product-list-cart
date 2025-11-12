# AI Shopping Assistant 🛒🤖

An AI-powered shopping assistant for a dessert store, featuring a custom chat interface that helps users manage their shopping cart through natural language interactions.

![GitHub](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-61dafb.svg)
![Python](https://img.shields.io/badge/Python-3.12-3776ab.svg)

## 🎯 Overview

This project consists of two main components:

- **Frontend**: React + Vite application with a custom AI chat sidebar
- **Backend**: FastAPI server with LangChain integration for intelligent chat responses

The AI assistant can help users:

- Browse products from the catalog
- Add/remove items from cart
- Update product quantities
- View cart summary with prices
- Process orders

## ✨ Features

### Frontend

- 🎨 Modern UI with Tailwind CSS 4
- 💬 Custom AI chat sidebar with markdown support
- 🛒 Shopping cart with Zustand state management
- 📱 Fully responsive design
- ✅ Order confirmation flow

### Backend

- 🤖 LangChain-powered AI assistant
- 🔧 Function calling for cart actions
- 🌐 GitHub Models integration (gpt-4o-mini)
- ⚡ FastAPI for high performance
- 🔒 CORS enabled for frontend integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10-3.12
- Conda (recommended)
- GitHub Personal Access Token

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-shopping-assistant.git
cd ai-shopping-assistant
```

### 2. Setup Backend

```bash
cd agent-py

# Create conda environment
conda env create -f environment.yml
conda activate agent-py

# Install dependencies
poetry install

# Create .env file
cat > .env << EOF
LLM_API_KEY=your_github_personal_access_token
LLM_BASE_URL=https://models.inference.ai.azure.com
LLM_MODEL_ID=gpt-4o-mini
PORT=8000
EOF

# Start the server
uvicorn app.api:app --reload --port 8000
```

### 3. Setup Frontend

```bash
cd ../ui

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
ai-shopping-assistant/
├── agent-py/              # Backend (FastAPI + LangChain)
│   ├── app/
│   │   ├── api.py        # FastAPI application
│   │   └── __init__.py
│   ├── .env              # Environment variables
│   ├── environment.yml   # Conda environment
│   ├── pyproject.toml    # Poetry dependencies
│   └── README.md
│
├── ui/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── store/        # Zustand store
│   │   └── App.jsx
│   ├── public/           # Static assets
│   ├── data.json         # Product catalog
│   ├── package.json
│   └── README.md
│
└── README.md             # This file
```

## 🎮 Usage

1. **Browse Products**: View the dessert catalog on the main page
2. **Open Chat**: Click the chat button in the bottom-right corner
3. **Talk to AI**: Ask questions like:
   - "What products do you have?"
   - "Add 2 waffles to my cart"
   - "Show me my cart"
   - "Remove the brownie"
   - "Process my order"

## 🛠️ Tech Stack

### Frontend

- React 19.1.0
- Vite 7.0.4
- Tailwind CSS 4.1.11
- Zustand 5.0.7
- React Markdown

### Backend

- Python 3.12
- FastAPI
- LangChain
- LangChain OpenAI
- Uvicorn

## 🤖 AI Capabilities

The AI assistant understands and executes these actions:

| Action                  | Description          | Example               |
| ----------------------- | -------------------- | --------------------- |
| `addProductToCart`      | Add products to cart | "Add 2 waffles"       |
| `removeProductFromCart` | Remove products      | "Remove the brownie"  |
| `updateProductQuantity` | Change quantities    | "Change waffles to 5" |
| `getCartSummary`        | View cart contents   | "What's in my cart?"  |
| `clearCart`             | Empty the cart       | "Clear my cart"       |
| `processOrder`          | Confirm order        | "Process my order"    |

## 📡 API Documentation

### Backend Endpoints

#### Chat Endpoint

```
POST /chat
```

**Request:**

```json
{
  "messages": [
    {"role": "user", "content": "Add waffles to my cart"}
  ],
  "actions": [...],
  "context": {
    "products": [...],
    "cart": {"items": [...], "total": 0}
  }
}
```

**Response:**

```json
{
  "message": "I've added waffles to your cart!",
  "actions": [
    {
      "name": "addProductToCart",
      "parameters": { "name": "Waffle", "quantity": 1 }
    }
  ]
}
```

## 🔧 Configuration

### Backend Environment Variables

```bash
LLM_API_KEY=your_github_token          # Required
LLM_BASE_URL=https://models.inference.ai.azure.com
LLM_MODEL_ID=gpt-4o-mini
PORT=8000
```

### Frontend Configuration

Update backend URL in `ui/src/hooks/useCustomChat.js`:

```javascript
const response = await fetch("http://localhost:8000/chat", {
  // ...
});
```

## 🧪 Development

### Backend Development

```bash
cd agent-py
conda activate agent-py
uvicorn app.api:app --reload --port 8000
```

### Frontend Development

```bash
cd ui
npm run dev
```

### Build for Production

```bash
cd ui
npm run build
```

## 🐛 Troubleshooting

See individual README files:

- [Backend README](./agent-py/README.md)
- [Frontend README](./ui/README.md)

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Links

- [LangChain Documentation](https://python.langchain.com)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [GitHub Models](https://github.com/marketplace/models)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## 👨‍💻 Author

**Sergio Cantera**

- GitHub: [@SergioCantera](https://github.com/SergioCantera)

---

⭐ If you find this project helpful, please give it a star!
