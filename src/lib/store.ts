import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  customization?: Record<string, any>;
}

export interface CartItem extends Product {
  quantity: number;
  cartItemId: string; // Unique ID for the item in cart (especially important for custom items)
}

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  
  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  toggleCart: () => void;
  
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      isCartOpen: false,
      isWishlistOpen: false,

      addToCart: (product, quantity = 1) => {
        const cart = get().cart;
        // If it's a standard product, check if it already exists in cart with same size/color
        // For custom products, we should always add a new line item.
        const isCustom = !!product.customization;
        
        if (!isCustom) {
          const existingItemIndex = cart.findIndex(
            (item) => item.id === product.id && item.size === product.size && item.color === product.color && !item.customization
          );
          
          if (existingItemIndex > -1) {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity += quantity;
            set({ cart: newCart, isCartOpen: true });
            return;
          }
        }
        
        set({
          cart: [...cart, { ...product, quantity, cartItemId: Date.now().toString() }],
          isCartOpen: true
        });
      },

      removeFromCart: (cartItemId) => {
        set({ cart: get().cart.filter((item) => item.cartItemId !== cartItemId) });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity < 1) return;
        set({
          cart: get().cart.map((item) => 
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          )
        });
      },

      toggleCart: () => set({ isCartOpen: !get().isCartOpen, isWishlistOpen: false }),

      addToWishlist: (product) => {
        const wishlist = get().wishlist;
        if (!wishlist.some(item => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter((item) => item.id !== productId) });
      },

      toggleWishlist: () => set({ isWishlistOpen: !get().isWishlistOpen, isCartOpen: false }),
    }),
    {
      name: 'zacmo-storage',
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }), // Only persist cart and wishlist
    }
  )
);
