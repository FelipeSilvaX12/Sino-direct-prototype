import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
  onSeeAllClick: () => void;
}

export default function CategoryGrid({ onCategorySelect, onSeeAllClick }: CategoryGridProps) {
  // Let's grab our categories
  const eletronicos = CATEGORIES.find(c => c.id === 'eletronicos');
  const moda = CATEGORIES.find(c => c.id === 'moda');
  const casa = CATEGORIES.find(c => c.id === 'casa');

  return (
    <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto" id="categorias-secao">
      {/* Title & See All Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface">
            Categorias em Destaque
          </h2>
          <p className="text-secondary text-sm mt-1">
            Navegue por nossa seleção premium
          </p>
        </div>
        <button
          onClick={onSeeAllClick}
          className="text-primary-container font-semibold text-sm flex items-center gap-2 hover:underline group"
        >
          Ver todas
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Category 1: Eletrônicos (Span 2 Columns) */}
        {eletronicos && (
          <div
            onClick={() => onCategorySelect(eletronicos.id)}
            className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/20 h-64 md:h-96 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Background Image with Scale Zoom effect */}
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('${eletronicos.image}')` }}
            />
            {/* Elegant dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            {/* Info Container */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                {eletronicos.name}
              </h3>
              <p className="text-white/80 text-xs md:text-sm mt-2 font-light line-clamp-2">
                Gadgets de última geração
              </p>
            </div>
          </div>
        )}

        {/* Category 2: Moda */}
        {moda && (
          <div
            onClick={() => onCategorySelect(moda.id)}
            className="group relative overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/20 h-64 md:h-96 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('${moda.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="font-display text-lg md:text-xl font-bold text-white">
                {moda.name}
              </h3>
              <p className="text-white/80 text-xs mt-1 font-light line-clamp-2">
                Estilo contemporâneo
              </p>
            </div>
          </div>
        )}

        {/* Category 3: Casa */}
        {casa && (
          <div
            onClick={() => onCategorySelect(casa.id)}
            className="group relative overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/20 h-64 md:h-96 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('${casa.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="font-display text-lg md:text-xl font-bold text-white">
                {casa.name}
              </h3>
              <p className="text-white/80 text-xs mt-1 font-light line-clamp-2">
                Conforto inteligente
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
