import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Ticket, Check } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { COUPONS } from '../data';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (appliedCoupon: Coupon | null) => void;
}

export default function CartOverlay({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartOverlayProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingThreshold = 299.00;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingCost = subtotal > 0 && !isFreeShipping ? 35.00 : 0;

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.minSubtotal && subtotal < appliedCoupon.minSubtotal) {
      // Discard coupon if minimum requirement is not met
      setAppliedCoupon(null);
      setCouponError(`O cupom ${appliedCoupon.code} requer compra mínima de R$ ${appliedCoupon.minSubtotal}`);
    } else {
      if (appliedCoupon.discountType === 'percentage') {
        discountAmount = (subtotal * appliedCoupon.value) / 100;
      } else {
        discountAmount = appliedCoupon.value;
      }
    }
  }

  const finalTotal = Math.max(0, subtotal + shippingCost - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.toUpperCase().trim();
    
    if (!code) return;

    const coupon = COUPONS.find(c => c.code === code);
    if (coupon) {
      if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
        setCouponError(`Cupom válido apenas para compras acima de R$ ${coupon.minSubtotal}`);
      } else {
        setAppliedCoupon(coupon);
        setCouponError('');
      }
    } else {
      setCouponError('Cupom inválido. Tente SINODIR10 ou BENVINDO50');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1b1c1c]/60 backdrop-blur-sm flex justify-end">
      {/* Dimmed touch area */}
      <div className="flex-grow" onClick={onClose} />

      {/* Drawer panel */}
      <aside className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col p-6 animate-slide-left">
        {/* Header bar */}
        <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary-container" />
            <h3 className="font-display text-lg font-extrabold text-on-surface">
              Seu Carrinho
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary hover:text-primary-container hover:bg-surface-container-low rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
              <ShoppingBag size={32} />
            </div>
            <div>
              <h4 className="font-display font-bold text-on-surface text-base">
                Seu carrinho está vazio
              </h4>
              <p className="text-secondary text-xs mt-1 max-w-xs">
                Navegue pelas nossas categorias e descubra a excelência do design chinês para equipar o seu lar.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-primary-container text-white font-display font-bold text-xs rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-sm"
            >
              Continuar Comprando
            </button>
          </div>
        ) : (
          /* Cart with items */
          <>
            {/* Free Shipping Progression Meter */}
            <div className="bg-surface-container-low/75 p-4 rounded-xl border border-outline-variant/20 mb-4 text-xs">
              {isFreeShipping ? (
                <div className="text-green-600 font-bold flex items-center gap-2">
                  <Check size={16} />
                  Parabéns! Você ganhou Frete Grátis na sua compra!
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-on-surface-variant font-medium">
                    Falta apenas <span className="font-bold text-primary-container">{formatCurrency(shippingThreshold - subtotal)}</span> para ganhar <span className="font-bold text-primary-container">Frete Grátis</span>!
                  </div>
                  {/* Progress Bar container */}
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary-container h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable list items container */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-1 scrollbar-none mb-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 border border-[#EEEEEE] rounded-xl hover:shadow-sm transition-all"
                >
                  {/* Product thumbnail */}
                  <div className="w-16 h-16 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Quantity & item info */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans font-semibold text-xs text-on-surface line-clamp-1">
                        {item.product.name}
                      </h4>
                      <span className="text-[10px] text-primary-container font-extrabold mt-0.5 block">
                        {formatCurrency(item.product.price)}
                      </span>
                    </div>

                    {/* Quantity Selector controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-outline-variant/60 rounded-md bg-surface">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-secondary hover:text-on-surface"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-2 text-xs font-bold text-on-surface">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-secondary hover:text-on-surface"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Trash action */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50"
                        title="Remover item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code section */}
            <div className="border-t border-outline-variant/30 py-3">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <Ticket size={14} />
                    <span>
                      Cupom <strong>{appliedCoupon.code}</strong> aplicado
                      ({appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.value}% de desconto` : `${formatCurrency(appliedCoupon.value)} de desconto`})
                    </span>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-red-500 hover:text-red-600 font-bold ml-2">
                    Remover
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cupom (ex: SINODIR10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary-container outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#1b1c1c] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#1b1c1c]/90 transition-all active:scale-95"
                  >
                    Aplicar
                  </button>
                </form>
              )}
              {couponError && <p className="text-[10px] text-red-500 font-semibold mt-1">{couponError}</p>}
            </div>

            {/* Total calculation panel */}
            <div className="border-t border-outline-variant/30 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Frete</span>
                <span>{shippingCost === 0 ? 'Grátis' : formatCurrency(shippingCost)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Desconto</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-on-surface font-extrabold text-sm border-t border-outline-variant/20 pt-2">
                <span>Total</span>
                <span className="text-primary-container text-base">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            {/* Primary conversion trigger */}
            <div className="pt-4 mt-auto">
              <button
                onClick={() => onCheckout(appliedCoupon)}
                className="w-full py-4 bg-primary-container text-white font-display font-bold text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all text-center shadow-md flex items-center justify-center gap-2"
              >
                Ir para o Pagamento
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-center text-xs text-secondary hover:text-on-surface font-semibold mt-2"
              >
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
