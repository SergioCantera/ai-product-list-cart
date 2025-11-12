"""
Simple chat endpoint for custom UI
"""

import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    actions: List[Dict[str, Any]]
    context: Optional[Dict[str, Any]] = {}
    agent: Optional[str] = None

@app.post("/chat")
async def chat(request: ChatRequest):
    """Simple chat endpoint that returns AI responses"""
    
    # Initialize the model
    model = ChatOpenAI(
        model=os.getenv("LLM_MODEL_ID", "gpt-4o-mini"),
        api_key=os.getenv("LLM_API_KEY"),
        base_url=os.getenv("LLM_BASE_URL"),
        temperature=0.7,
    )
    
    # Convert actions to OpenAI function format
    functions = []
    for action in request.actions:
        function_def = {
            "name": action["name"],
            "description": action["description"],
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
        
        if "parameters" in action:
            for param_name, param_info in action["parameters"].items():
                function_def["parameters"]["properties"][param_name] = {
                    "type": param_info.get("type", "string"),
                    "description": param_info.get("description", "")
                }
                if param_info.get("required", False):
                    function_def["parameters"]["required"].append(param_name)
        
        functions.append(function_def)
    
    # Build system message with context
    cart_items = request.context.get('cart', {}).get('items', [])
    cart_summary = "\n".join([
        f"- {item['name']} x{item['quantity']} (${item['price']:.2f} each) = ${item['price'] * item['quantity']:.2f}" 
        for item in cart_items
    ]) if cart_items else "Cart is empty"
    
    system_content = f"""You are an expert shopping assistant for a dessert store.

CURRENT CART INFORMATION:
{cart_summary}
Total items: {len(cart_items)}
Total price: ${request.context.get('cart', {}).get('total', 0):.2f}

AVAILABLE PRODUCTS:
{chr(10).join([f"- {p['name']} ({p['category']}) - ${p['price']:.2f}" for p in request.context.get('products', [])])}

IMPORTANT INSTRUCTIONS:
1. When the user asks about their cart, ALWAYS use the getCartSummary action to show updated contents.
2. To add products, use addProductToCart with the product name. You can use partial or similar names.
3. To remove, use removeProductFromCart with the product name.
4. To change quantity, use updateProductQuantity with the name and new quantity.
5. To empty the cart, use clearCart.
6. To process/confirm/finalize the order, use processOrder.
7. After executing modification actions, use getCartSummary to confirm changes.
8. Be conversational and friendly in your responses.
9. ALWAYS execute the actions that correspond to what the user requested."""

    # Convert messages to LangChain format
    lc_messages = [SystemMessage(content=system_content)]
    for msg in request.messages:
        if msg.role == "user":
            lc_messages.append(HumanMessage(content=msg.content))
        elif msg.role == "assistant":
            lc_messages.append(AIMessage(content=msg.content))
    
    # Bind functions to model
    model_with_functions = model.bind_tools(functions)
    
    # Get AI response
    response = await model_with_functions.ainvoke(lc_messages)
    
    # Extract tool calls (actions)
    actions = []
    if hasattr(response, 'tool_calls') and response.tool_calls:
        for tool_call in response.tool_calls:
            actions.append({
                'name': tool_call['name'],
                'parameters': tool_call['args']
            })
    
    return {
        'message': response.content or '',
        'content': response.content or '',
        'actions': actions
    }

@app.get("/")
async def root():
    return {"message": "Custom Chat API"}

def main():
    """Run the uvicorn server."""
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(
        "app.api:app",
        host="0.0.0.0",
        port=port,
        reload=True,
    )

if __name__ == "__main__":
    main()
