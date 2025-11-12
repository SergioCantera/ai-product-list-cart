import { create } from 'zustand'

export const useCartStore = create((set,get) => ({
    isClosed: true,
    cartItems:[],
    toggleConfirmation: () => set((state) => ({isClosed: !state.isClosed})),
    addItemToCart: (newItem) => set((state) => ({
        cartItems: [...state.cartItems, newItem]
    })),
    removeItemFromCart: (name) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.name !== name)
    })),
    updateItemInCart: (updateItem) => set((state) => ({
        cartItems: state.cartItems.map(item => 
            item.name === updateItem.name ? {...item, ...updateItem} : item
        )
    })),
    totalOrder: () => get().cartItems.reduce((acc, item) => acc +  (item.quantity * item.price),0),
    clearCart: () => set({ cartItems:[]})
}))
