import { useState } from 'react';
import { useCartStore } from '../store/cart.store';
import data from '../../data.json';

export const useCustomChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    cartItems, 
    addItemToCart, 
    removeItemFromCart, 
    updateItemInCart, 
    clearCart,
    totalOrder,
    toggleConfirmation
  } = useCartStore();

  // Define las acciones disponibles para el LLM
  const availableActions = [
    {
      name: 'addProductToCart',
      description: 'Add a product to the user cart',
      parameters: {
        name: { type: 'string', required: true, description: 'Product name' },
        quantity: { type: 'number', required: false, description: 'Quantity (default: 1)' }
      }
    },
    {
      name: 'removeProductFromCart',
      description: 'Remove a product from the cart',
      parameters: {
        name: { type: 'string', required: true, description: 'Product name' }
      }
    },
    {
      name: 'updateProductQuantity',
      description: 'Update the quantity of a product in the cart',
      parameters: {
        name: { type: 'string', required: true },
        quantity: { type: 'number', required: true }
      }
    },
    {
      name: 'getCartSummary',
      description: 'Get the current cart summary',
      parameters: {}
    },
    {
      name: 'clearCart',
      description: 'Empty the cart completely',
      parameters: {}
    },
    {
      name: 'processOrder',
      description: 'Process the current order and show confirmation',
      parameters: {}
    }
  ];

  // Ejecuta las acciones que el LLM solicite
  const executeAction = (actionName, params) => {
    console.log('Executing action:', actionName, params);
    
    switch (actionName) {
      case 'addProductToCart': {
        // Buscar producto por coincidencia flexible
        const product = data.find(p => 
          p.name.toLowerCase().includes(params.name.toLowerCase()) ||
          params.name.toLowerCase().includes(p.name.toLowerCase())
        );
        if (product) {
          const quantity = params.quantity || 1;
          addItemToCart({
            ...product,
            quantity: quantity
          });
          return `✅ Added: ${product.name} x${quantity} to cart`;
        }
        return `❌ Product "${params.name}" not found. Available products: ${data.map(p => p.name).slice(0, 3).join(', ')}...`;
      }
      
      case 'removeProductFromCart': {
        const item = cartItems.find(i => 
          i.name.toLowerCase().includes(params.name.toLowerCase()) ||
          params.name.toLowerCase().includes(i.name.toLowerCase())
        );
        if (item) {
          removeItemFromCart(item.name);
          return `✅ Removed: ${item.name} from cart`;
        }
        return `❌ Product "${params.name}" not found in cart`;
      }
      
      case 'updateProductQuantity': {
        const item = cartItems.find(i => 
          i.name.toLowerCase().includes(params.name.toLowerCase()) ||
          params.name.toLowerCase().includes(i.name.toLowerCase())
        );
        if (item) {
          updateItemInCart({ name: item.name, quantity: params.quantity });
          return `✅ Updated: ${item.name} → quantity: ${params.quantity}`;
        }
        return `❌ Product "${params.name}" not found in cart`;
      }
      
      case 'getCartSummary': {
        if (cartItems.length === 0) {
          return '🛒 Your cart is empty';
        }
        const summary = cartItems.map(item => 
          `• ${item.name} x${item.quantity} = $${(item.quantity * item.price).toFixed(2)}`
        ).join('\n');
        return `🛒 Your cart:\n${summary}\n\n💰 Total: $${totalOrder().toFixed(2)}`;
      }
      
      case 'clearCart':
        clearCart();
        return '✅ Cart emptied completely';
      
      case 'processOrder': {
        if (cartItems.length === 0) {
          return '❌ Cannot process an order with an empty cart';
        }
        const total = totalOrder();
        const itemCount = cartItems.length;
        toggleConfirmation();
        return `✅ Order processed successfully!\n\n📦 ${itemCount} product${itemCount > 1 ? 's' : ''}\n💰 Total: $${total.toFixed(2)}\n\nThank you for your purchase!`;
      }
      
      default:
        return `❌ Unknown action: ${actionName}`;
    }
  };

  const sendMessage = async (userMessage) => {
    // Agregar mensaje del usuario
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Preparar el contexto para el LLM
      const context = {
        products: data.map(p => ({ name: p.name, category: p.category, price: p.price })),
        cart: {
          items: cartItems,
          total: totalOrder(),
          itemCount: cartItems.length
        }
      };

      // Llamar al backend
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          actions: availableActions,
          context: context
        })
      });

      const responseData = await response.json();
      
      // Procesar la respuesta del LLM
      let assistantMessage = responseData.message || responseData.content || '';
      let actionResults = [];
      
      // Si el LLM solicitó ejecutar acciones
      if (responseData.actions && Array.isArray(responseData.actions)) {
        for (const action of responseData.actions) {
          const result = executeAction(action.name, action.parameters);
          actionResults.push(result);
        }
      }
      
      // Combinar mensaje y resultados de acciones
      const fullMessage = actionResults.length > 0 
        ? `${assistantMessage}\n\n${actionResults.join('\n')}`
        : assistantMessage;

      // Agregar respuesta del asistente
      setMessages([
        ...newMessages,
        { role: 'assistant', content: fullMessage }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: '❌ Error communicating with the assistant' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    clearMessages: () => setMessages([])
  };
};
