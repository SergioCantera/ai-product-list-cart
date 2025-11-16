import { useAgentChat } from 'agent-state-bridge';
import { useCartStore } from '../store/cart.store';
import data from '../../data.json';

/**
 * EJEMPLO: Hook usando agent-state-bridge con modelo {messages, actions, context}
 * 
 * Separa:
 * - actions: Operaciones CRUD del carrito
 * - context: Estado de la aplicación y datos disponibles (preparado para RAG)
 */
export const useAgentChatExample = () => {
  const { cartItems, totalOrder, addProduct, updateQuantity, deleteProduct } = useCartStore();

  const { messages, sendMessage, loading, error } = useAgentChat({
    endpoint: 'http://localhost:8000/chat',
    
    // Context: Estado actual de la app (preparado para RAG)
    getContext: () => ({
      products: data.map(p => ({ 
        name: p.name, 
        category: p.category, 
        price: p.price 
      })),
      cart: {
        items: cartItems,
        total: totalOrder(),
        itemCount: cartItems.length
      }
    }),
    
    // Actions: Últimas mutaciones del estado (opcional, para contexto)
    getActions: () => {
      // Aquí podrías trackear las últimas acciones del usuario
      return [];
    },
    
    // Callback cuando el agente retorna acciones a ejecutar
    onActionsReceived: (actions) => {
      actions.forEach(action => {
        switch (action.type) {
          case 'post':
            if (action.payload?.productName) {
              const product = data.find(p => 
                p.name.toLowerCase().includes(action.payload.productName.toLowerCase())
              );
              if (product) addProduct(product);
            }
            break;
          case 'put':
            if (action.payload?.productName && action.payload?.quantity) {
              const product = cartItems.find(p => 
                p.name.toLowerCase().includes(action.payload.productName.toLowerCase())
              );
              if (product) updateQuantity(product.name, action.payload.quantity);
            }
            break;
          case 'delete':
            if (action.payload?.productName) {
              const product = cartItems.find(p => 
                p.name.toLowerCase().includes(action.payload.productName.toLowerCase())
              );
              if (product) deleteProduct(product.name);
            }
            break;
        }
      });
    },
    
    initialMessages: []
  });

  return {
    messages,
    sendMessage,
    isLoading: loading,
    error
  };
};
