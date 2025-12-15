import React, { createContext, useContext, useState, useEffect } from 'react';
import { SearchProduct } from '../utils/searchService';

export interface CartItem extends SearchProduct {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    partyName: string;
    isCartOpen: boolean;
    setPartyName: (name: string) => void;
    addItem: (product: SearchProduct) => void;
    removeItem: (productName: string) => void;
    updateQuantity: (productName: string, delta: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('cart_items');
        return saved ? JSON.parse(saved) : [];
    });

    const [partyName, setPartyName] = useState(() => {
        return localStorage.getItem('cart_party_name') || '';
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart_items', JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem('cart_party_name', partyName);
    }, [partyName]);

    const addItem = (product: SearchProduct) => {
        setItems(prev => {
            const existing = prev.find(item => item.productName === product.productName);
            if (existing) {
                return prev.map(item =>
                    item.productName === product.productName
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (productName: string) => {
        setItems(prev => prev.filter(item => item.productName !== productName));
    };

    const updateQuantity = (productName: string, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item.productName === productName) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const cartTotal = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            partyName,
            isCartOpen,
            setPartyName,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            toggleCart,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
