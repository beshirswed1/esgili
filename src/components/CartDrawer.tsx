"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCartOpen, updateQuantity, removeFromCart, clearCart } from "@/store/slices/cartSlice";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const info = useAppSelector((state) => state.restaurant.info);
  const [tableNumber, setTableNumber] = useState("");
  const [error, setError] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(price);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleCheckout = () => {
    if (!tableNumber.trim()) {
      setError(true);
      return;
    }
    setError(false);

    let message = `*Yeni Sipariş - Masa: ${tableNumber}*\n`;
    message += `--------------------\n`;
    items.forEach((item) => {
      message += `${item.quantity}x ${item.name} (${formatPrice(item.price * item.quantity)})\n`;
    });
    message += `--------------------\n`;
    message += `*Toplam:* ${formatPrice(totalPrice)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${info.whatsapp}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    
    // Optionally clear cart and close drawer
    // dispatch(clearCart());
    // dispatch(setCartOpen(false));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => dispatch(setCartOpen(false))} />
      <div className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-sm bg-background border-l border-border shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-serif font-bold text-lg">Sepetim ({totalItems})</h2>
          </div>
          <button onClick={() => dispatch(setCartOpen(false))} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center opacity-70">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Sepetiniz Boş</p>
              <p className="text-sm text-muted-foreground">Menüden harika lezzetler ekleyebilirsiniz.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-card border border-border p-3 rounded-xl shadow-sm relative group">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm leading-tight pr-5">{item.name}</h3>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-muted-foreground hover:text-destructive absolute top-3 right-3 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-semibold text-primary text-sm mt-1">{formatPrice(item.price)}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-muted rounded-lg border border-border">
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="p-1 hover:bg-black/5 active:scale-90 rounded-l-lg transition-all">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="p-1 hover:bg-black/5 active:scale-90 rounded-r-lg transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 bg-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground font-medium">Toplam Tutar:</span>
              <span className="text-2xl font-bold font-serif text-primary">{formatPrice(totalPrice)}</span>
            </div>
            
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Masa Numarası (Örn: 5)" 
                value={tableNumber}
                onChange={(e) => {
                  setTableNumber(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-2 bg-background border ${error ? 'border-destructive ring-1 ring-destructive' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
              />
              {error && <p className="text-xs text-destructive mt-1 font-medium">Lütfen masa numarasını giriniz.</p>}
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-lg flex justify-center items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.835 6.368L0 24l5.809-1.508A12 12 0 1 0 11.944 0zm6.533 17.062c-.22.613-1.272 1.15-1.745 1.192-.44.04-1.026.115-3.235-.794-2.673-1.097-4.385-3.837-4.516-4.01-.131-.174-1.077-1.429-1.077-2.724 0-1.296.674-1.933.911-2.193.237-.26.514-.325.685-.325.171 0 .342.004.493.012.164.009.385-.065.602.455.275.659.883 2.147.957 2.296.074.15.123.325.025.52-.098.196-.148.316-.296.491-.148.174-.312.373-.445.507-.148.15-.306.315-.135.612.171.296.76 1.258 1.638 2.04.113.1.233.203.364.306 1.023.805 1.956 1.026 2.25 1.15.295.124.47.104.644-.095.174-.203.743-.865.941-1.162.198-.297.396-.247.67-.148.275.1.1738.816 2.035.965.297.15.495.223.57.347.074.124.074.72-.146 1.333z"/></svg>
              Siparişi Tamamla (WhatsApp)
            </button>
            <button onClick={() => dispatch(clearCart())} className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-destructive font-medium transition-colors">
              Sepeti Temizle
            </button>
          </div>
        )}
      </div>
    </>
  );
}
