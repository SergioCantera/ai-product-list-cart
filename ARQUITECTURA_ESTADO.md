# Arquitectura de Compartición de Estado entre Frontend y Agente Python

Este documento describe cómo la aplicación comparte el estado entre el frontend (React) y el backend (FastAPI + LangChain), incluyendo un diagrama y ejemplos de código.

---

## Diagrama de Arquitectura

```mermaid
graph TD
    A[Usuario] -->|Interacción UI| B[Frontend (React + Zustand)]
    B -- Estado actual + Mensaje --> C[API /chat (FastAPI)]
    C -- Procesa estado y mensaje --> D[Agente Python (LangChain + GitHub Models)]
    D -- Respuesta --> C
    C -- Respuesta JSON --> B
    B -->|Actualiza UI| A
```

---

## Flujo de Datos

1. **El usuario interactúa con la UI** (añade productos, envía mensajes, procesa pedido).
2. **El frontend** mantiene el estado (carrito, historial, etc.) usando Zustand.
3. **Al enviar un mensaje o acción**, el frontend hace un `fetch` al backend, enviando el estado actual y el mensaje.
4. **El backend** recibe el estado y el mensaje, los procesa con el agente Python y responde con un mensaje generado.
5. **El frontend** muestra la respuesta y actualiza el estado si es necesario.

---

## Ejemplo de Código

### 1. Envío de estado y mensaje desde el frontend

```js
// ui/src/hooks/useCustomChat.js
const sendMessage = async (userMessage, cartState) => {
  const response = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: userMessage,
      cart: cartState,
      // ...otros estados relevantes
    }),
  });
  return await response.json();
};
```

### 2. Endpoint backend que recibe el estado

```python
# agent-py/app/api.py
from fastapi import FastAPI, Request
from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    cart: dict
    # ...otros campos

app = FastAPI()

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    # Procesar el estado y el mensaje
    response = process_with_agent(request.message, request.cart)
    return {"response": response}
```

### 3. Procesamiento en el agente

```python
# agent-py/app/agent.py
def process_with_agent(message, cart):
    # Aquí se puede usar LangChain, modelos de lenguaje, etc.
    # El agente puede razonar sobre el estado recibido
    return f"You have {len(cart['items'])} items in your cart. How can I help you?"
```

---

## Ventajas de esta Arquitectura

- **Desacoplamiento:** El backend es stateless respecto al usuario.
- **Escalabilidad:** Fácil de escalar horizontalmente el backend.
- **Simplicidad:** El frontend es la fuente de la verdad del estado.
- **Flexibilidad:** Se puede extender el estado compartido fácilmente.

---

## Resumen

El frontend gestiona el estado y lo comparte con el backend solo cuando es necesario. El backend procesa el estado recibido y responde, sin almacenar información de usuario entre peticiones.

---

> _Para dudas o mejoras, abre un issue o pull request en el repositorio._
