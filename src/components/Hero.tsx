import React from 'react';
import { Truck, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onExploreCategoriesClick: () => void;
}

export default function Hero({ onExploreClick, onExploreCategoriesClick }: HeroProps) {
  return (
    <section className="hero-gradient relative overflow-hidden py-16 md:py-24 mt-16 border-b border-outline-variant/20">
      <div className="px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Copy & Actions */}
        <div className="md:col-span-6 space-y-6 z-10">
          
          {/* Free Shipping Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffdbcd] text-[#7c2e00] rounded-full text-xs font-semibold tracking-wide shadow-sm">
            <Truck size={14} className="animate-bounce" />
            <span className="uppercase tracking-wider font-bold">
              FRETE GRÁTIS EM PEDIDOS ACIMA DE R$299
            </span>
          </div>

          {/* Main Display Typography */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1b1c1c] leading-tight tracking-tight">
            Descubra a Excelência do <span className="text-primary-container relative inline-block">Design Chinês</span>
          </h1>

          {/* Subheading */}
          <p className="font-sans text-base md:text-lg text-secondary leading-relaxed max-w-lg">
            Curadoria exclusiva de eletrônicos, moda e utilidades domésticas direto dos maiores polos tecnológicos da China para sua casa.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 bg-primary-container text-white font-display font-bold text-sm rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Ver Novidades
              <ArrowRight size={16} />
            </button>
            <button
              onClick={onExploreCategoriesClick}
              className="px-8 py-4 border border-[#1b1c1c] text-[#1b1c1c] font-display font-bold text-sm rounded-lg hover:bg-[#1b1c1c]/5 active:scale-95 transition-all flex items-center justify-center"
            >
              Explorar Categorias
            </button>
          </div>
        </div>

        {/* Right Column: Premium Image Area */}
        <div className="md:col-span-6 relative flex justify-center">
          {/* Ambient Decorative Pulse Circle */}
          <div className="aspect-square rounded-full bg-primary-container/5 absolute -z-10 w-4/5 animate-pulse-slow"></div>
          
          {/* Frameless Hero Image Matching Screenshot */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMBGfjZQDJcb4uUqP9K192m8QGeP-oDqaSW3-5daD4uBgfzYeFz3o6PWASE_VllInxgreYuxm4lk7DB9-eOJAUMDTEw2nqJN602cIKzuU5sAlPPHjGvpmS_Iel2soV3XAMey-biZt7I4y8mzdik-FsvFUjgwWT04atOZjcyfSDJ0lbBkuzogEGTnTPk4hQMqU6qfMDKWumWUoqcvLzRjAFoGvyirBIcZNP6Vk1hMQOIiz558jksOExKg"
              alt="Curadoria Premium SinoDirect"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl transform hover:rotate-1 hover:scale-[1.02] transition-all duration-500"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
