import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartOverlay from './components/CartOverlay';
import CheckoutOverlay from './components/CheckoutOverlay';
import Footer from './components/Footer';
import { Product, CartItem, Category, Coupon } from './types';
import { PRODUCTS, CATEGORIES } from './data';
import { Sparkles, MessageSquare, Check, HelpCircle, Truck, Package, HelpCircle as HelpIcon, ArrowRight, UserCheck, X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info';
}

export default function App() {
  // Navigation & filtering states
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & checkout states (persisted locally)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sinodirect_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal display toggles
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  
  // Custom interactive help / legal popups
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpSubject, setHelpSubject] = useState<string>('geral');
  const [profileOpen, setProfileOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterEmailSubscribed] = useState(false);

  // Custom Toast notifications state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('sinodirect_cart', JSON.stringify(cart));
  }, [cart]);

  // Toast notifier helper
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Add to cart operation
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Adicionado ${quantity}x ${product.name} ao carrinho!`);
  };

  // Update cart item quantity
  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove cart item
  const handleRemoveCartItem = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (item) {
      showToast(`${item.product.name} removido do carrinho.`, 'info');
    }
  };

  // Clear cart on checkout completion
  const handleClearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Trigger Checkout
  const handleCheckoutTrigger = (coupon: Coupon | null) => {
    setAppliedCoupon(coupon);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  // Quick select category from grid or filters
  const handleCategorySelect = (catId: string) => {
    setCategoryFilter(catId);
    setCurrentTab('produtos');
    const target = document.getElementById('vitrine-produtos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Newsletter submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterEmailSubscribed(true);
      showToast('Inscrição na newsletter realizada com sucesso!');
      setNewsletterEmail('');
    } else {
      showToast('Por favor, informe um endereço de e-mail válido.', 'info');
    }
  };

  // Open specific help subject from footer
  const handleOpenHelp = (subject: string) => {
    setHelpSubject(subject);
    setHelpOpen(true);
  };

  // Filter products based on search & category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans selection:bg-primary-container selection:text-white">
      
      {/* Dynamic Toast Notifications container at top level */}
      <div className="fixed top-20 right-6 z-[100] flex flex-col gap-2 max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 p-4 bg-[#1b1c1c] text-white rounded-xl shadow-lg border border-outline-variant/20 animate-slide-left text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-primary-container flex items-center justify-center text-white flex-shrink-0 font-bold">
              ✓
            </div>
            <p className="flex-grow font-semibold">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Main App Navigation Header */}
      <Header
        cart={cart}
        onOpenCart={() => setCartOpen(true)}
        onOpenCheckout={() => handleCheckoutTrigger(null)}
        onSetCategoryFilter={(cat) => setCategoryFilter(cat)}
        onOpenProfile={() => setProfileOpen(true)}
        currentTab={currentTab}
        onChangeTab={(tab) => {
          setCurrentTab(tab);
          // Scroll up on tab switch
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearch={(query) => {
          setSearchQuery(query);
          setCategoryFilter('all');
        }}
      />

      {/* Dynamic Tab Views container */}
      <main className="flex-grow pt-16">
        {currentTab === 'home' && (
          <div className="animate-fade-in space-y-4">
            {/* Hero Section */}
            <Hero
              onExploreClick={() => {
                setCurrentTab('produtos');
                setCategoryFilter('all');
              }}
              onExploreCategoriesClick={() => {
                const target = document.getElementById('categorias-secao');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Premium Categories Bento Grid */}
            <CategoryGrid
              onCategorySelect={handleCategorySelect}
              onSeeAllClick={() => {
                setCurrentTab('produtos');
                setCategoryFilter('all');
              }}
            />

            {/* Featured Products Shelf Section */}
            <section className="py-12 bg-surface-container-low" id="vitrine-produtos">
              <div className="px-6 md:px-16 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface">
                    Produtos em Destaque
                  </h2>
                  <p className="text-secondary text-sm mt-1 max-w-md mx-auto">
                    O melhor do mercado global agora ao seu alcance com entrega monitorada e segura.
                  </p>
                </div>

                {/* 4 columns layout matching screenshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(prod) => handleAddToCart(prod, 1)}
                      onViewDetails={(prod) => setSelectedProduct(prod)}
                    />
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => {
                      setCurrentTab('produtos');
                      setCategoryFilter('all');
                    }}
                    className="px-8 py-3 bg-[#1b1c1c] text-white hover:bg-[#1b1c1c]/90 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 mx-auto"
                  >
                    Ver Todo o Catálogo
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentTab === 'produtos' && (
          <div className="animate-fade-in py-10 px-6 md:px-16 max-w-7xl mx-auto space-y-8">
            {/* Catalog Banner & Title */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface">
                  Nossos Produtos Importados
                </h2>
                <p className="text-secondary text-sm mt-1">
                  Exclusividade asiática de alto requinte diretamente para o seu estilo de vida brasileiro.
                </p>
              </div>

              {/* Real-time Category filters chips list */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    categoryFilter === 'all'
                      ? 'bg-primary-container text-white shadow-md'
                      : 'bg-white border border-[#EEEEEE] text-secondary hover:bg-surface-container-low'
                  }`}
                >
                  Todos ({PRODUCTS.length})
                </button>
                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        categoryFilter === cat.id
                          ? 'bg-primary-container text-white shadow-md'
                          : 'bg-white border border-[#EEEEEE] text-secondary hover:bg-surface-container-low'
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search filter active badge display */}
            {searchQuery && (
              <div className="flex items-center justify-between bg-primary-fixed text-[#7c2e00] px-4 py-3 rounded-lg text-xs font-semibold">
                <span>
                  Resultados para a busca: <strong>"{searchQuery}"</strong> ({filteredProducts.length} itens encontrados)
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="underline hover:text-primary transition-all font-extrabold"
                >
                  Limpar busca
                </button>
              </div>
            )}

            {/* Grid list of dynamic filtered items */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-outline-variant/10 space-y-4">
                <p className="text-secondary text-sm">Nenhum produto atende aos filtros selecionados.</p>
                <button
                  onClick={() => {
                    setCategoryFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 bg-primary-container text-white rounded-lg text-xs font-bold"
                >
                  Ver Todos os Produtos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(prod) => handleAddToCart(prod, 1)}
                    onViewDetails={(prod) => setSelectedProduct(prod)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {currentTab === 'sobre' && (
          <div className="animate-fade-in py-12 px-6 md:px-16 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-display text-3xl font-extrabold text-on-surface">Sobre a SinoDirect</h2>
              <p className="text-secondary text-sm">Conectando inovação, requinte e praticidade global ao seu dia a dia.</p>
            </div>

            <div className="prose leading-relaxed text-secondary text-sm space-y-6">
              <p>
                Fundada com a missão de redefinir o conceito de produtos asiáticos no Brasil, a <strong>SinoDirect</strong> oferece uma curadoria minuciosa que une tecnologia de vanguarda, alta alfaiataria têxtil e utilitários residenciais com as assinaturas de design mais aclamadas dos polos industriais de Shenzhen, Suzhou e Hangzhou.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                <div className="p-5 bg-white border border-[#EEEEEE] rounded-xl space-y-2">
                  <h4 className="font-display font-bold text-on-surface text-sm">Nossa Curadoria</h4>
                  <p className="text-xs">Diferente das lojas globais de massa, cada item em nosso catálogo passa por testes rigorosos de qualidade, durabilidade, design e acabamento estético antes de ser listado.</p>
                </div>
                <div className="p-5 bg-white border border-[#EEEEEE] rounded-xl space-y-2">
                  <h4 className="font-display font-bold text-on-surface text-sm">Logística Segura</h4>
                  <p className="text-xs">Nossa rede integrada de importação assegura trâmite aduaneiro rápido, seguro e totalmente livre de surpresas de taxação para o consumidor brasileiro final.</p>
                </div>
              </div>

              <h3 className="font-display text-lg font-bold text-on-surface mt-6">Selo de Autenticidade</h3>
              <p>
                Trabalhamos diretamente com fabricantes e estúdios de design independentes na China continental para assegurar peças originais acompanhadas de garantias oficiais, suporte nacional em português e termos de devolução ágeis e sem complicações.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Newsletter footer banner section */}
      <section className="py-16 bg-primary-container mt-12">
        <div className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white space-y-2">
            <h3 className="font-display text-2xl md:text-3xl font-bold">Mantenha-se Atualizado</h3>
            <p className="text-white/80 text-sm max-w-md">
              Assine nossa newsletter e receba ofertas exclusivas, cupons de desconto premium e lançamentos em primeira mão diretamente no seu e-mail.
            </p>
          </div>
          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-xl text-white text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <UserCheck size={18} />
                <span>Obrigado por assinar! Verifique sua caixa de entrada para aproveitar R$50 de desconto em sua primeira compra.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:bg-white focus:text-on-surface focus:outline-none min-w-[280px] transition-all text-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-white text-primary-container font-bold rounded-lg hover:bg-white/95 active:scale-95 transition-all text-xs shadow-md"
                >
                  Inscrever-se
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer component containing links and contact */}
      <Footer
        onOpenPrivacy={() => handleOpenHelp('privacidade')}
        onOpenTerms={() => handleOpenHelp('termos')}
        onOpenHelp={() => handleOpenHelp('geral')}
        onHomeClick={() => {
          setCurrentTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Product Details Modal Component */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer Overlay Component */}
      <CartOverlay
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckoutTrigger}
      />

      {/* Checkout simulator component */}
      <CheckoutOverlay
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        appliedCoupon={appliedCoupon}
        onClearCart={handleClearCart}
      />

      {/* Interactive Support / Help Center Dialog Modal */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 bg-[#1b1c1c]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative space-y-4 animate-fade-in">
            <button
              onClick={() => setHelpOpen(false)}
              className="absolute top-4 right-4 p-2 text-secondary hover:text-on-surface hover:bg-surface-container-low rounded-full"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 text-primary-container">
              <HelpIcon size={24} />
              <h4 className="font-display text-lg font-bold text-on-surface">
                {helpSubject === 'privacidade' ? 'Políticas de Privacidade' : helpSubject === 'termos' ? 'Termos de Serviço' : 'Central de Atendimento SinoDirect'}
              </h4>
            </div>

            <div className="text-xs text-secondary leading-relaxed space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-none">
              {helpSubject === 'privacidade' ? (
                <>
                  <p><strong>Privacidade e Segurança Garantida:</strong></p>
                  <p>A SinoDirect valoriza a segurança de seus dados acima de tudo. Suas informações pessoais e dados cadastrais são mantidos em absoluto sigilo e criptografados sob o protocolo de segurança padrão SSL.</p>
                  <p>Nenhuma informação de cartão de crédito é armazenada em nossos servidores operacionais; todas as transações são processadas por meio de gateways bancários certificados pelo Banco Central do Brasil.</p>
                </>
              ) : helpSubject === 'termos' ? (
                <>
                  <p><strong>Termos de Serviço e Importação:</strong></p>
                  <p>Ao realizar um pedido na SinoDirect, você contrata nosso serviço de curadoria e logística aduaneira expressa.</p>
                  <p><strong>Garantia de Desembaraço:</strong> Todos os pedidos possuem impostos alfandegários pagos antecipadamente por nossa rede logística. Caso seu produto receba qualquer cobrança residual no Brasil, assumimos 100% da responsabilidade financeira.</p>
                  <p>O prazo médio estimado para entrega é de 10 a 18 dias úteis contados a partir da data de faturamento do pedido.</p>
                </>
              ) : (
                <>
                  <p><strong>Dúvidas Frequentes (FAQ):</strong></p>
                  <p><strong>Como rastreio meu pedido?</strong><br />Após a separação do produto em Shenzhen, você receberá um link de rastreamento internacional via e-mail para acompanhar desde o faturamento até a entrega pelos Correios do Brasil.</p>
                  <p><strong>Qual a política de trocas e devoluções?</strong><br />Dispomos de devolução grátis e sem burocracias em até 7 dias após o recebimento. Para produtos com defeito de fabricação, fornecemos garantia estendida oficial de até 1 ano.</p>
                  <p><strong>Quais os prazos de frete?</strong><br />Nosso frete é grátis para compras acima de R$ 299. Para compras de valores inferiores, a taxa única de envio seguro com desembaraço garantido é de R$ 35,00.</p>
                </>
              )}
            </div>

            <button
              onClick={() => setHelpOpen(false)}
              className="w-full py-2.5 bg-primary-container hover:brightness-110 text-white font-bold text-xs rounded-lg transition-all"
            >
              Compreendi
            </button>
          </div>
        </div>
      )}

      {/* User profile preview popup */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 bg-[#1b1c1c]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative space-y-4 animate-fade-in text-center">
            <button
              onClick={() => setProfileOpen(false)}
              className="absolute top-4 right-4 p-2 text-secondary hover:text-on-surface hover:bg-surface-container-low rounded-full"
            >
              <X size={18} />
            </button>
            
            {/* User Avatar Circle */}
            <div className="w-16 h-16 rounded-full bg-primary-fixed text-primary flex items-center justify-center mx-auto text-xl font-bold">
              FS
            </div>

            <div className="space-y-1">
              <h4 className="font-display font-extrabold text-base text-on-surface">Felipe Sousa</h4>
              <p className="text-secondary text-xs">ffelipesousadasilva@gmail.com</p>
            </div>

            {/* Loyalty points simulator */}
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 flex justify-between items-center text-xs">
              <span className="text-secondary font-semibold">Pontos de Fidelidade:</span>
              <span className="font-bold text-primary-container text-sm">350 Pts (Nível Bronze)</span>
            </div>

            <div className="text-left space-y-2.5 text-xs text-secondary border-t pt-4">
              <p className="font-bold text-on-surface text-center mb-1">Últimos Pedidos Importados</p>
              <div className="flex justify-between border-b pb-2 border-outline-variant/10">
                <span className="font-semibold text-on-surface">SD-726481</span>
                <span>Processando na Alfândega</span>
                <span className="font-bold text-primary-container">R$ 549,00</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-outline-variant/10 text-gray-400">
                <span>SD-329841</span>
                <span>Entregue há 1 mês</span>
                <span>R$ 215,00</span>
              </div>
            </div>

            <button
              onClick={() => setProfileOpen(false)}
              className="w-full py-2.5 bg-on-surface hover:bg-on-surface/90 text-white font-bold text-xs rounded-lg transition-all"
            >
              Fechar Painel do Cliente
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
