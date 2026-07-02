import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Landmark, DollarSign, ArrowLeft, ShieldCheck, Copy, Check } from 'lucide-react';
import { CartItem, Coupon } from '../types';

interface CheckoutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  onClearCart: () => void;
}

export default function CheckoutOverlay({
  isOpen,
  onClose,
  cart,
  appliedCoupon,
  onClearCart
}: CheckoutOverlayProps) {
  // Input fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCpf] = useState('');
  
  // Payment option: 'pix' | 'card' | 'boleto'
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Form errors / validation
  const [errors, setFormErrors] = useState<Record<string, string>>({});
  
  // Checkout progress: 'form' | 'success'
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  // Calculators
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingThreshold = 299.00;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingCost = subtotal > 0 && !isFreeShipping ? 35.00 : 0;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const finalTotal = Math.max(0, subtotal + shippingCost - discountAmount);

  const validateForm = () => {
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = 'Nome completo é obrigatório';
    if (!email.trim() || !email.includes('@')) err.email = 'E-mail válido é obrigatório';
    if (!cep.trim() || cep.replace(/\D/g, '').length < 8) err.cep = 'CEP com 8 dígitos é obrigatório';
    if (!address.trim()) err.address = 'Endereço completo é obrigatório';
    if (!cpf.trim() || cpf.replace(/\D/g, '').length < 11) err.cpf = 'CPF com 11 dígitos é obrigatório';

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\D/g, '').length < 16) err.card = 'Número de cartão inválido';
      if (!cardHolder.trim()) err.cardHolder = 'Nome do titular é obrigatório';
      if (!cardExpiry.trim()) err.cardExpiry = 'Validade expirada ou incorreta';
      if (!cardCvv.trim() || cardCvv.length < 3) err.cardCvv = 'CVV incorreto';
    }

    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Create order number
      const num = 'SD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(num);
      setStep('success');
    }
  };

  const handleCloseSuccess = () => {
    onClearCart();
    onClose();
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126360014br.gov.bcb.pix0114sino-direct-pix-key');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1b1c1c]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-fade-in">
        
        {/* Header bar */}
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/30 bg-surface">
          <div className="flex items-center gap-3">
            <button
              onClick={step === 'success' ? handleCloseSuccess : onClose}
              className="p-1 hover:bg-surface-container-low rounded-full text-secondary hover:text-on-surface transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <h3 className="font-display text-lg font-extrabold text-on-surface">
              {step === 'form' ? 'Finalizar Importação Premium' : 'Pedido Confirmado!'}
            </h3>
          </div>
          <button
            onClick={step === 'success' ? handleCloseSuccess : onClose}
            className="p-2 text-secondary hover:text-primary-container hover:bg-surface-container-low rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {step === 'form' ? (
          /* CHECKOUT FORM VIEW */
          <div className="flex flex-col md:flex-row overflow-y-auto h-[75vh]">
            {/* Left side: Information and Payment form */}
            <form onSubmit={handleFinalize} className="md:w-3/5 p-6 space-y-6 overflow-y-auto">
              {/* Personal details */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-sm text-on-surface border-b pb-2 border-outline-variant/20">
                  1. Dados de Envio e Identificação
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-secondary">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Ex: João Silva da Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full bg-surface border rounded-lg px-3 py-2 text-xs focus:ring-1 outline-none ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant/50 focus:ring-primary-container'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                  </div>

                  {/* CPF */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-secondary">CPF</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      className={`w-full bg-surface border rounded-lg px-3 py-2 text-xs focus:ring-1 outline-none ${
                        errors.cpf ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant/50 focus:ring-primary-container'
                      }`}
                    />
                    {errors.cpf && <p className="text-[10px] text-red-500 font-semibold">{errors.cpf}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Email */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-secondary">E-mail</label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-surface border rounded-lg px-3 py-2 text-xs focus:ring-1 outline-none ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant/50 focus:ring-primary-container'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                  </div>

                  {/* CEP */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-secondary">CEP</label>
                    <input
                      type="text"
                      placeholder="01001-000"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      className={`w-full bg-surface border rounded-lg px-3 py-2 text-xs focus:ring-1 outline-none ${
                        errors.cep ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant/50 focus:ring-primary-container'
                      }`}
                    />
                    {errors.cep && <p className="text-[10px] text-red-500 font-semibold">{errors.cep}</p>}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary">Endereço Completo</label>
                  <input
                    type="text"
                    placeholder="Av. Paulista, 1000 - Apto 12 - Bela Vista, São Paulo - SP"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full bg-surface border rounded-lg px-3 py-2 text-xs focus:ring-1 outline-none ${
                      errors.address ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant/50 focus:ring-primary-container'
                    }`}
                  />
                  {errors.address && <p className="text-[10px] text-red-500 font-semibold">{errors.address}</p>}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-sm text-on-surface border-b pb-2 border-outline-variant/20">
                  2. Método de Pagamento
                </h4>

                {/* Selectors Tab Group */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Pix */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all gap-1.5 ${
                      paymentMethod === 'pix'
                        ? 'border-primary-container bg-primary-fixed text-[#7c2e00]'
                        : 'border-[#EEEEEE] hover:bg-surface-container-low text-secondary'
                    }`}
                  >
                    <Landmark size={18} />
                    <span className="text-[10px] font-bold">PIX (10% Off)</span>
                  </button>

                  {/* Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-primary-container bg-primary-fixed text-[#7c2e00]'
                        : 'border-[#EEEEEE] hover:bg-surface-container-low text-secondary'
                    }`}
                  >
                    <CreditCard size={18} />
                    <span className="text-[10px] font-bold">Cartão de Crédito</span>
                  </button>

                  {/* Boleto */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all gap-1.5 ${
                      paymentMethod === 'boleto'
                        ? 'border-primary-container bg-primary-fixed text-[#7c2e00]'
                        : 'border-[#EEEEEE] hover:bg-surface-container-low text-secondary'
                    }`}
                  >
                    <DollarSign size={18} />
                    <span className="text-[10px] font-bold">Boleto Bancário</span>
                  </button>
                </div>

                {/* Payment Option details */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 min-h-[140px]">
                  {paymentMethod === 'pix' && (
                    <div className="space-y-2 text-xs">
                      <p className="font-bold text-on-surface">Pagamento via Pix Premiado</p>
                      <p className="text-secondary leading-relaxed">
                        Aprovação instantânea de faturamento. Ganhe mais agilidade na separação de alfândega e liberação de entrega rápida do seu pedido premium.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'boleto' && (
                    <div className="space-y-2 text-xs">
                      <p className="font-bold text-on-surface">Pagamento por Boleto Bancário</p>
                      <p className="text-secondary leading-relaxed">
                        Após finalizar, você poderá copiar o código de barras ou imprimir o boleto. A aprovação bancária ocorre em até 2 dias úteis.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      {/* Card form */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-secondary uppercase">Número do Cartão</label>
                          <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-white border border-outline-variant/50 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-primary-container"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-secondary uppercase">Nome Impresso</label>
                          <input
                            type="text"
                            placeholder="NOME IGUAL AO CARTÃO"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                            className="w-full bg-white border border-outline-variant/50 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-primary-container"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-secondary uppercase">Validade</label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-white border border-outline-variant/50 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-primary-container"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-secondary uppercase">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-white border border-outline-variant/50 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-primary-container"
                          />
                        </div>
                      </div>
                      {errors.card && <p className="text-[10px] text-red-500 font-semibold">{errors.card}</p>}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit panel */}
              <button
                type="submit"
                className="w-full py-4 bg-primary-container text-white font-display font-bold text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                Finalizar Importação — {formatCurrency(paymentMethod === 'pix' ? finalTotal * 0.9 : finalTotal)}
              </button>
            </form>

            {/* Right side: Cart Summary sidebar */}
            <div className="md:w-2/5 p-6 bg-surface border-l border-outline-variant/20 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-on-surface mb-4">
                  Resumo do Pedido
                </h4>
                
                {/* List items inside summary */}
                <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1 scrollbar-none mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 text-xs items-center justify-between py-2 border-b border-outline-variant/10">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-container">{item.quantity}x</span>
                        <span className="text-secondary line-clamp-1 max-w-[150px]">{item.product.name}</span>
                      </div>
                      <span className="font-semibold text-on-surface">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal table */}
                <div className="space-y-2 text-xs border-t border-outline-variant/20 pt-4">
                  <div className="flex justify-between text-secondary">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Frete de Importação</span>
                    <span>{shippingCost === 0 ? 'Grátis' : formatCurrency(shippingCost)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Cupom ({appliedCoupon.code})</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  {paymentMethod === 'pix' && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Desconto Pix (10%)</span>
                      <span>-{formatCurrency(finalTotal * 0.1)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total display inside summary */}
              <div className="border-t border-outline-variant/30 pt-4 mt-6">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs font-bold text-secondary">Valor Final</span>
                  <span className="text-primary-container font-extrabold text-xl">
                    {formatCurrency(paymentMethod === 'pix' ? finalTotal * 0.9 : finalTotal)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-green-600 font-semibold bg-green-50 p-2.5 rounded-lg border border-green-200">
                  <ShieldCheck size={14} />
                  <span>Conexão SSL 100% Criptografada e Segura</span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* RECEIPT SUCCESS TICKET VIEW */
          <div className="p-8 text-center max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto animate-bounce">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-extrabold text-xl text-on-surface">
                Importação Agendada com Sucesso!
              </h4>
              <p className="text-secondary text-xs">
                Obrigado pela sua preferência, <strong>{name}</strong>! Recebemos o faturamento do pedido <strong className="text-primary-container">{orderNumber}</strong> e a separação dos produtos em nosso estoque alfandegário de Shenzhen já começou.
              </p>
            </div>

            {/* Simulated Receipt details block based on chosen payment option */}
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 space-y-4 text-xs text-left">
              <div className="flex justify-between border-b pb-2 border-outline-variant/20">
                <span className="text-secondary">E-mail de confirmação:</span>
                <span className="font-bold text-on-surface">{email}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-outline-variant/20">
                <span className="text-secondary">Endereço de Entrega:</span>
                <span className="font-bold text-on-surface text-right line-clamp-1 max-w-[200px]">{address}</span>
              </div>

              {paymentMethod === 'pix' ? (
                /* QR code simulator */
                <div className="text-center space-y-3 pt-2">
                  <p className="font-bold text-on-surface text-xs">Escaneie o código Pix abaixo para aprovação imediata:</p>
                  
                  {/* Generated simulated QR code block */}
                  <div className="w-40 h-40 bg-white border border-outline-variant/20 rounded-lg mx-auto flex items-center justify-center p-2">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126360014br.gov.bcb.pix0114sino-direct-pix-key"
                      alt="QR Code Pix"
                      className="w-full h-full"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="mx-auto flex items-center gap-1.5 px-4 py-2 bg-on-surface hover:bg-on-surface/90 text-white font-bold text-[10px] rounded-lg transition-all"
                  >
                    {copiedPix ? <Check size={12} /> : <Copy size={12} />}
                    {copiedPix ? 'Copiado!' : 'Copiar Código Pix Copia e Cola'}
                  </button>
                </div>
              ) : paymentMethod === 'boleto' ? (
                <div className="text-center space-y-2 pt-2">
                  <p className="font-bold text-on-surface text-xs">Código de Barras do Boleto:</p>
                  <code className="bg-white border px-3 py-1.5 rounded block text-[10px] font-mono text-on-surface text-center select-all">
                    34191.79001 01043.513184 91020.150008 7 912000000
                  </code>
                  <p className="text-[10px] text-secondary">
                    O boleto também foi enviado para o seu e-mail e pode levar até 2 horas para registrar no banco.
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2 pt-2 text-green-600 font-bold flex items-center justify-center gap-2">
                  <ShieldCheck size={16} />
                  <span>Cartão Aprovado Instantaneamente!</span>
                </div>
              )}
            </div>

            <button
              onClick={handleCloseSuccess}
              className="w-full py-3 bg-primary text-white font-display font-bold text-xs rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              Concluir e Voltar para Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
