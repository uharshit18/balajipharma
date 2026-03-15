import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '../../context/CartContext';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity, setQuantity, removeItem } = useCart();
    const [localQty, setLocalQty] = useState(String(item.quantity));

    useEffect(() => {
        setLocalQty(String(item.quantity));
    }, [item.quantity]);

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Allow empty string while typing
        if (val === '' || /^\d+$/.test(val)) {
            setLocalQty(val);
        }
    };

    const handleQtyBlur = () => {
        const parsed = parseInt(localQty, 10);
        if (!parsed || parsed < 1) {
            setQuantity(item.productName, 1);
            setLocalQty('1');
        } else {
            setQuantity(item.productName, parsed);
            setLocalQty(String(parsed));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
        }
    };

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

                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-200">
                        <button
                            onClick={() => updateQuantity(item.productName, -1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-brandBlue hover:bg-blue-50 transition-colors"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={14} />
                        </button>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={localQty}
                            onChange={handleQtyChange}
                            onBlur={handleQtyBlur}
                            onKeyDown={handleKeyDown}
                            onFocus={(e) => e.target.select()}
                            className="w-12 h-7 text-sm font-bold text-slate-900 text-center bg-white border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-brandBlue/50 focus:border-brandBlue transition-all appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <button
                            onClick={() => updateQuantity(item.productName, 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-brandBlue hover:bg-blue-50 transition-colors"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
