import React, { useRef, useEffect } from 'react';
import { X, ShoppingBag, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { Button } from '../UI/Button';
import { PHONE_VALUE } from '../../constants';

export const CartDrawer: React.FC = () => {
    const { isCartOpen, toggleCart, items, cartTotal, partyName, setPartyName } = useCart();
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isCartOpen) {
                toggleCart();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCartOpen, toggleCart]);

    const handleCheckout = () => {
        if (!partyName.trim()) {
            alert("Please enter your Party / Hospital Name");
            return;
        }

        if (items.length === 0) return;

        const message =
            `*NEW ORDER REQUEST*
*Party:* ${partyName}
------------------------
${items.map(i => `• ${i.productName} (${i.packing}) - *Qty: ${i.quantity}*`).join('\n')}
------------------------
*Total Items:* ${cartTotal}

Please confirm availability and dispatch.`;

        const url = `https://wa.me/${PHONE_VALUE}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-slate-50 shadow-2xl flex flex-col h-full border-l border-white/20"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 bg-white border-b border-slate-100 shadow-sm relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="bg-brandBlue/10 p-2 rounded-lg text-brandBlue">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Your Order</h2>
                                    <p className="text-xs text-slate-500">{cartTotal} items selected</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
                                    <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                                        <ShoppingBag size={40} className="text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-slate-700">Your cart is empty</p>
                                        <p className="text-sm text-slate-500">Search for medicines to start ordering.</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={toggleCart}>
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                items.map(item => (
                                    <CartItem key={item.productName} item={item} />
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-5 bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-10 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                        Party / Hospital Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Neo medical / City Hospital"
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue transition-all text-sm font-medium"
                                        value={partyName}
                                        onChange={(e) => setPartyName(e.target.value)}
                                    />
                                </div>

                                <Button
                                    fullWidth
                                    size="lg"
                                    onClick={handleCheckout}
                                    className="!bg-[#25D366] hover:!bg-[#20bd5a] shadow-lg shadow-green-500/20 !border-0 flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    Send Order on WhatsApp
                                </Button>
                                <p className="text-[10px] text-center text-slate-400">
                                    This will open WhatsApp with your pre-formatted order list.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
