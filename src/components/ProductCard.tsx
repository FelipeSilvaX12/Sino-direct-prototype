import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  return (
    <div className="product-card group bg-white border border-[#EEEEEE] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
      {/* Product Image Area */}
      <div className="aspect-square relative overflow-hidden bg-surface-container-low">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge Indicator (e.g., NOVO, PREMIUM, SMART, EXCLUSIVO) */}
        {product.badge && (
          <span className={`absolute top-4 left-4 text-[10px] font-extrabold px-2.5 py-1 rounded shadow-sm tracking-widest ${
            product.badge === 'NOVO' 
              ? 'bg-primary-container text-white' 
              : product.badge === 'PREMIUM'
              ? 'bg-[#1b1c1c] text-white'
              : 'bg-primary text-white'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Rating overlay badge at top right */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm text-[10px] font-semibold text-on-surface">
          <Star size={10} className="fill-yellow-400 stroke-yellow-400" />
          {product.rating.toFixed(1)}
        </div>

        {/* Quick Add Slide Up on Hover */}
        <div className="absolute bottom-0 w-full p-4 bg-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-md">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full py-2.5 bg-primary-container text-white font-display font-bold text-xs rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart size={14} />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>

      {/* Content details area */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-1">
            {product.category === 'eletronicos' ? 'Eletrônicos' : product.category === 'moda' ? 'Moda' : 'Casa'}
          </span>
          
          {/* Product Title */}
          <h4 className="font-display text-sm font-semibold text-on-surface line-clamp-2 min-h-[40px] group-hover:text-primary-container transition-colors">
            {product.name}
          </h4>
        </div>

        {/* Pricing & Call to Action */}
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-primary-container font-extrabold text-base md:text-lg">
              {formattedPrice}
            </span>
            {product.originalPrice && (
              <span className="text-secondary/50 text-xs line-through">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => onViewDetails(product)}
            className="mt-4 w-full py-2 border border-on-surface text-on-surface hover:bg-on-surface hover:text-white font-display font-semibold text-xs rounded-lg transition-colors active:scale-95 text-center"
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
