import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '../../context/CartContext';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{item.productName}</h4>
                    <button
                        onClick={() => removeItem(item.productName)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <p className="text-xs text-slate-500 mb-3">{item.brandName} • {item.packing}</p>

                <div className="flex items-center justify-between">
                    <div className="font-semibold text-slate-700 text-sm">
                        {item.saleRate ? `₹${item.saleRate}` : 'Rate on Request'}
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-200">
                        <button
                            onClick={() => updateQuantity(item.productName, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-brandBlue hover:bg-blue-50 transition-colors"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.productName, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-brandBlue hover:bg-blue-50 transition-colors"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
