# AI Shopping Assistant - Python Backend# AI Todo Agent - Python Backend

A FastAPI-powered backend for an AI shopping assistant with LangChain integration.A LangGraph-powered AI agent for managing todos, built with FastAPI and CopilotKit integration.

## 🚀 Features## 🚀 Features

- **FastAPI Backend**: High-performance async API server- **LangGraph Agent**: Intelligent todo management using LangGraph state machine

- **LangChain Integration**: Powered by ChatOpenAI for intelligent conversations- **FastAPI Backend**: High-performance async API server

- **GitHub Models**: Uses OpenAI-compatible GitHub AI models- **CopilotKit Integration**: Seamless integration with CopilotKit frontend

- **Custom Chat Endpoint**: `/chat` endpoint for custom frontend integration- **GitHub Models**: Powered by OpenAI-compatible GitHub AI models

- **Shopping Cart Actions**: Add, remove, update, and manage cart items- **CORS Enabled**: Ready for cross-origin requests from frontend

- **CORS Enabled**: Ready for cross-origin requests from frontend

## 📋 Prerequisites

## 📋 Prerequisites

- Python 3.10-3.12

- Python 3.10-3.12- Conda (recommended) or Poetry

- Conda (recommended)- GitHub Personal Access Token (for GitHub Models)

- GitHub Personal Access Token (for GitHub Models)

## 🛠️ Installation

## 🛠️ Installation

### Option 1: Using Conda (Recommended)

### Using Conda (Recommended)

1. **Create the environment:**

1. **Create the environment:** ```bash

   ````bash conda env create -f environment.yml

   conda env create -f environment.yml   ```

   ````

1. **Activate the environment:**

1. **Activate the environment:** ```bash

   ````bash conda activate agent-py

   conda activate agent-py   ```

   ````

1. **Install Poetry in the environment:**

1. **Install dependencies:** ```bash

   ````bash conda install -c conda-forge poetry

   poetry install   ```

   ````

1. **Install dependencies:**

## ⚙️ Configuration ```bash

poetry install

Create a `.env` file in the `agent-py` directory: ```

````bash### Option 2: Using Poetry Only

# GitHub Token for AI Models

LLM_API_KEY=your_github_personal_access_token1. **Install dependencies:**

   ```bash

# Model Configuration   poetry install

LLM_BASE_URL=https://models.inference.ai.azure.com   ```

LLM_MODEL_ID=gpt-4o-mini

2. **Activate the virtual environment:**

# Server Configuration   ```bash

PORT=8000   poetry shell

```   ```



### Getting a GitHub Token## ⚙️ Configuration



1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)Create a `.env` file in the `agent-py` directory:

2. Generate a new token (classic)

3. No specific scopes needed for using GitHub Models```bash

4. Copy the token to your `.env` file# GitHub Token for AI Models

LLM_API_KEY=your_github_personal_access_token

## 🚀 Running the Server

# Model Configuration

### Using Uvicorn (Recommended)LLM_BASE_URL=https://models.inference.ai.azure.com

MODEL_PROVIDER=openai

```bashLLM_MODEL_ID=gpt-4o-mini

conda activate agent-py

uvicorn app.api:app --reload --port 8000# Server Configuration

```PORT=8000

````

### Using Poetry

### Getting a GitHub Token

````bash

conda activate agent-py1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)

poetry run start2. Generate a new token (classic)

```3. No specific scopes needed for using GitHub Models

4. Copy the token to your `.env` file

The server will start on `http://localhost:8000`

## 🚀 Running the Server

## 📁 Project Structure

### Using Poetry

````

agent-py/```bash

├── app/poetry run start

│ ├── **init**.py```

│ ├── api.py # FastAPI application with /chat endpoint

│ ├── agent.py.backup # Original LangGraph agent (backup)### Using Conda + Poetry

│ └── **pycache**/

├── .env # Environment variables (create this)```bash

├── environment.yml # Conda environment specificationconda activate agent-py

├── pyproject.toml # Poetry dependencies and project configpoetry run start

└── README.md```

````

### Direct Python

## 📡 API Endpoints

```bash

### Health Checkconda run -n agent-py python -c "from app.api import main; main()"

```bash```

GET /

```The server will start on `http://localhost:8000`

Returns: `{"message": "Custom Chat API"}`

## 📁 Project Structure

### Chat Endpoint

```bash```

POST /chatagent-py/

```├── app/

│   ├── __init__.py

**Request Body:**│   ├── agent.py          # LangGraph agent definition

```json│   ├── api.py            # FastAPI application

{│   └── __pycache__/

  "messages": [├── .env                  # Environment variables (create this)

    {"role": "user", "content": "Add 2 waffles to my cart"}├── environment.yml       # Conda environment specification

  ],├── pyproject.toml        # Poetry dependencies and project config

  "actions": [└── README.md

    {```

      "name": "addProductToCart",

      "description": "Add a product to the user cart",## �� API Endpoints

      "parameters": {

        "name": {"type": "string", "required": true},### Health Check

        "quantity": {"type": "number", "required": false}```bash

      }GET /

    }```

  ],

  "context": {### CopilotKit Endpoint

    "products": [...],```bash

    "cart": {POST /copilotkit

      "items": [...],```

      "total": 0Main endpoint for CopilotKit frontend integration.

    }

  }## 🧪 Testing the API

}

```Test the agent endpoint:



**Response:**```bash

```jsoncurl -X POST http://localhost:8000/copilotkit \

{  -H "Content-Type: application/json" \

  "message": "I've added 2 waffles to your cart!",  -d '{

  "content": "I've added 2 waffles to your cart!",    "messages": [],

  "actions": [    "actions": []

    {  }'

      "name": "addProductToCart",```

      "parameters": {"name": "Waffle", "quantity": 2}

    }## 📚 Key Dependencies

  ]

}- **FastAPI** - Modern web framework

```- **LangGraph** - State machine for AI agents

- **LangChain** - LLM framework

## 🧪 Testing the API- **CopilotKit** - AI copilot integration

- **Uvicorn** - ASGI server

Test the chat endpoint:

## 🔍 Agent Capabilities

```bash

curl -X POST http://localhost:8000/chat \The agent is configured with:

  -H "Content-Type: application/json" \- **Custom State Management** - Extends CopilotKitState

  -d '{- **Tool Integration** - Example weather tool included

    "messages": [{"role": "user", "content": "What products do you have?"}],- **ReAct Pattern** - Reasoning and acting design pattern

    "actions": [],- **Streaming Support** - Real-time responses

    "context": {"products": [], "cart": {"items": [], "total": 0}}

  }'## 🛡️ Security Notes

````

- The CORS configuration currently allows all origins (`*`) for development

## 📚 Key Dependencies- **For production**: Update CORS settings in `app/api.py` to specific domains

- **Never commit** your `.env` file with real tokens

- **FastAPI** - Modern web framework- Regenerate tokens if accidentally exposed

- **LangChain** - LLM framework

- **LangChain OpenAI** - OpenAI integration## 🐛 Troubleshooting

- **Uvicorn** - ASGI server

- **Python-dotenv** - Environment variable management### Import Errors

```bash

## 🛠️ Available Actionspoetry install

```

The AI assistant can execute these actions:

### Port Already in Use

1. **addProductToCart**: Add products to the shopping cart```bash

2. **removeProductFromCart**: Remove products from cart# Kill process on port 8000

3. **updateProductQuantity**: Change product quantitieslsof -ti:8000 | xargs kill -9

4. **getCartSummary**: Get current cart contents```

5. **clearCart**: Empty the cart

6. **processOrder**: Process and confirm the order### LangGraph Agent Errors

Ensure your `.env` has the correct:

## 🔍 How It Works- `LLM_API_KEY` (GitHub token)

- `LLM_BASE_URL` (https://models.inference.ai.azure.com)

1. Frontend sends user message + available actions + context (products & cart state)- `LLM_MODEL_ID` (e.g., gpt-4o-mini)

2. Backend uses LangChain ChatOpenAI with function calling

3. AI model decides which actions to execute## 📄 License

4. Backend returns message + actions to execute

5. Frontend executes actions and updates UIMIT

## 🛡️ Security Notes## 👥 Contributing

- CORS currently allows all origins (`*`) for development1. Fork the repository

- **For production**: Update CORS settings in `app/api.py`2. Create a feature branch

- **Never commit** your `.env` file with real tokens3. Make your changes

- Regenerate tokens if accidentally exposed4. Submit a pull request

## 🐛 Troubleshooting## 🔗 Related

### Import Errors- [CopilotKit Documentation](https://docs.copilotkit.ai)

```bash- [LangGraph Documentation](https://langchain-ai.github.io/langgraph)

conda activate agent-py- [GitHub Models](https://github.com/marketplace/models)

poetry install
```

### Port Already in Use

```bash
lsof -ti:8000 | xargs kill -9
```

### Model Connection Errors

Ensure your `.env` has:

- Valid `LLM_API_KEY` (GitHub token)
- Correct `LLM_BASE_URL` (https://models.inference.ai.azure.com)
- Valid `LLM_MODEL_ID` (e.g., gpt-4o-mini)

### Poetry Lock Issues

```bash
poetry lock
poetry install
```

## 📄 License

MIT

## 🔗 Related

- [GitHub Models](https://github.com/marketplace/models)
- [LangChain Documentation](https://python.langchain.com)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
