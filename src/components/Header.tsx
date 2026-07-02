import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Search, Globe, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenCheckout: () => void;
  onSetCategoryFilter: (category: string) => void;
  onOpenProfile: () => void;
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onSearch: (query: string) => void;
}

export default function Header({
  cart,
  onOpenCart,
  onOpenCheckout,
  onSetCategoryFilter,
  onOpenProfile,
  currentTab,
  onChangeTab,
  onSearch
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onChangeTab('produtos');
    setSearchOpen(false);
  };

  const handleNavClick = (tab: string) => {
    onChangeTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-outline-variant/30 transition-all duration-300">
      <div className="flex justify-between items-center h-16 px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 active:scale-95 transition-transform"
          id="logo-button"
        >
          {/* Stylized premium SVG icon for SinoDirect */}
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-white font-display font-extrabold text-xl tracking-tight shadow-md">
            SD
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight text-primary">
            Sino<span className="text-primary-container">Direct</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-sans font-medium text-sm">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors duration-200 pb-1 border-b-2 ${
              currentTab === 'home'
                ? 'text-primary-container border-primary-container font-bold'
                : 'text-secondary border-transparent hover:text-primary-container'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('produtos')}
            className={`transition-colors duration-200 pb-1 border-b-2 ${
              currentTab === 'produtos'
                ? 'text-primary-container border-primary-container font-bold'
                : 'text-secondary border-transparent hover:text-primary-container'
            }`}
          >
            Produtos
          </button>
          <button
            onClick={() => handleNavClick('sobre')}
            className={`transition-colors duration-200 pb-1 border-b-2 ${
              currentTab === 'sobre'
                ? 'text-primary-container border-primary-container font-bold'
                : 'text-secondary border-transparent hover:text-primary-container'
            }`}
          >
            Sobre Nós
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-surface-container-low border border-outline-variant/50 rounded-full py-1 px-3 z-50 shadow-sm animate-fade-in">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-xs focus:ring-0 outline-none w-40 md:w-56 text-on-surface"
                  autoFocus
                />
                <button type="submit" className="text-secondary hover:text-primary-container">
                  <Search size={14} />
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="text-secondary/60 hover:text-red-500 ml-1">
                  <X size={14} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-secondary hover:text-primary-container hover:bg-surface-container-low rounded-full transition-all"
                title="Buscar"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Shopping Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="p-2 text-secondary hover:text-primary-container hover:bg-surface-container-low rounded-full transition-all relative"
            title="Carrinho"
            id="cart-trigger"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-primary-container text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Account Trigger */}
          <button
            onClick={onOpenProfile}
            className="p-2 text-secondary hover:text-primary-container hover:bg-surface-container-low rounded-full transition-all"
            title="Sua Conta"
            id="profile-trigger"
          >
            <User size={20} />
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-secondary hover:text-primary-container hover:bg-surface-container-low rounded-full transition-all"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (SideNavBar Backdrop & Drawer) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex justify-end">
          {/* Dimmed touch area */}
          <div className="flex-grow" onClick={() => setMobileMenuOpen(false)} />
          
          {/* Drawer Body */}
          <aside className="w-80 h-full bg-white shadow-2xl flex flex-col p-6 animate-slide-left">
            <div className="flex justify-between items-center mb-8 border-b pb-4 border-outline-variant/30">
              <div>
                <span className="font-display text-2xl font-extrabold text-primary">
                  Sino<span className="text-primary-container">Direct</span>
                </span>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mt-1">
                  Premium Chinese Imports
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-secondary hover:text-primary-container hover:bg-surface-container-low rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation links inside drawer */}
            <nav className="space-y-2 flex-grow">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all ${
                  currentTab === 'home'
                    ? 'bg-primary-fixed text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Home
                </span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => handleNavClick('produtos')}
                className={`w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all ${
                  currentTab === 'produtos'
                    ? 'bg-primary-fixed text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-container" />
                  Explorar Produtos
                </span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => handleNavClick('sobre')}
                className={`w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all ${
                  currentTab === 'sobre'
                    ? 'bg-primary-fixed text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Sobre Nós
                </span>
                <ChevronRight size={16} />
              </button>
            </nav>

            {/* Drawer Call to Action */}
            <div className="mt-auto pt-6 border-t border-outline-variant/30">
              <button
                onClick={() => {
                  handleNavClick('produtos');
                  onSetCategoryFilter('all');
                }}
                className="w-full py-4 bg-primary text-white font-display font-bold rounded-xl active:scale-95 hover:brightness-110 transition-all text-center text-sm shadow-md"
              >
                Ver Lançamentos
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
