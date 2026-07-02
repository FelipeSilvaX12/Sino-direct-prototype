import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Layers } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailsModal({ product, onClose, onAddToCart }: ProductDetailsModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  return (
    <div className="fixed inset-0 z-50 bg-[#1b1c1c]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      {/* Container Box */}
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in relative">
        
        {/* Close Button at top-right of mobile, absolute */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/85 backdrop-blur-sm hover:bg-surface-container-low rounded-full text-secondary hover:text-on-surface shadow transition-all"
        >
          <X size={20} />
        </button>

        {/* Left Side: Photo Area */}
        <div className="md:w-1/2 bg-surface-container-low flex items-center justify-center relative p-6 border-r border-outline-variant/20">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full max-h-[350px] md:max-h-[500px] object-contain rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <span className="absolute top-6 left-6 bg-primary-container text-white text-xs font-extrabold px-3 py-1 rounded shadow-md tracking-wider">
              {product.badge}
            </span>
          )}
        </div>

        {/* Right Side: Information Panel */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col h-[50vh] md:h-[80vh] overflow-y-auto">
          {/* Breadcrumb / Category info */}
          <span className="text-xs uppercase font-bold text-primary-container tracking-widest mb-1 block">
            {product.category === 'eletronicos' ? 'Eletrônicos' : product.category === 'moda' ? 'Moda' : 'Casa'}
          </span>

          <h2 className="font-display text-2xl font-extrabold text-on-surface mb-2 leading-snug">
            {product.name}
          </h2>

          {/* Rating reviews count */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 stroke-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-xs font-bold text-on-surface">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-secondary">
              ({product.reviewsCount} avaliações)
            </span>
          </div>

          {/* Pricing area */}
          <div className="flex items-baseline gap-3 mb-6 bg-surface-container-low/50 p-3 rounded-lg border border-outline-variant/20">
            <span className="text-primary-container font-extrabold text-2xl">
              {formattedPrice}
            </span>
            {product.originalPrice && (
              <span className="text-secondary/50 text-sm line-through">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-outline-variant/30 mb-4 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-2 pr-4 border-b-2 transition-all ${
                activeTab === 'desc'
                  ? 'text-primary-container border-primary-container'
                  : 'text-secondary border-transparent'
              }`}
            >
              Descrição
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 px-4 border-b-2 transition-all ${
                activeTab === 'specs'
                  ? 'text-primary-container border-primary-container'
                  : 'text-secondary border-transparent'
              }`}
            >
              Especificações
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 px-4 border-b-2 transition-all ${
                activeTab === 'reviews'
                  ? 'text-primary-container border-primary-container'
                  : 'text-secondary border-transparent'
              }`}
            >
              Avaliações
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-grow text-sm text-secondary leading-relaxed mb-6 scrollbar-none">
            {activeTab === 'desc' && (
              <div className="space-y-4 animate-fade-in">
                <p>{product.description}</p>
                <div className="space-y-2 mt-4">
                  <h4 className="font-display font-bold text-on-surface text-xs uppercase tracking-wide">
                    Destaques do Produto:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-2 animate-fade-in text-xs">
                <table className="w-full border-collapse">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-outline-variant/20 py-2">
                        <td className="font-bold text-on-surface py-2 w-1/3">{key}</td>
                        <td className="py-2 text-secondary">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 animate-fade-in">
                {/* Simulated review comments */}
                <div className="border-b border-outline-variant/20 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-on-surface text-xs">Marcelo S.</span>
                    <span className="text-[10px] text-secondary">2 dias atrás</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-yellow-400 stroke-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs">
                    "Qualidade impecável, embalagem super bem protegida. Superou todas as expectativas."
                  </p>
                </div>
                <div className="border-b border-outline-variant/20 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-on-surface text-xs">Aline M.</span>
                    <span className="text-[10px] text-secondary">1 semana atrás</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-yellow-400 stroke-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs">
                    "O design é incrivelmente sofisticado. SinoDirect está de parabéns pela curadoria."
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick trust assurances */}
          <div className="grid grid-cols-3 gap-2 border-t border-b border-outline-variant/20 py-3 mb-6 text-[10px] font-semibold text-secondary">
            <div className="flex flex-col items-center text-center gap-1">
              <ShieldCheck size={16} className="text-primary-container" />
              <span>Garantia de 1 Ano</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <Truck size={16} className="text-primary-container" />
              <span>Frete com Seguro</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <RefreshCw size={16} className="text-primary-container" />
              <span>Devolução Grátis</span>
            </div>
          </div>

          {/* Actions panel */}
          <div className="flex items-center gap-4 mt-auto">
            {/* Quantity Selector */}
            <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden bg-surface-container-low">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-secondary hover:bg-outline-variant/30 font-bold"
              >
                -
              </button>
              <span className="px-4 py-2 text-on-surface font-bold text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 text-secondary hover:bg-outline-variant/30 font-bold"
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddToCart}
              className="flex-grow py-3 bg-primary-container text-white font-display font-bold text-sm rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingCart size={16} />
              Adicionar ao Carrinho
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
