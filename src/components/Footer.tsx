import React from 'react';
import { Mail, Phone, MapPin, Globe, Award, Share2 } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenHelp: () => void;
  onHomeClick: () => void;
}

export default function Footer({ onOpenPrivacy, onOpenTerms, onOpenHelp, onHomeClick }: FooterProps) {
  return (
    <footer className="bg-[#e4e2e2] text-on-surface border-t border-outline-variant/30">
      
      {/* Upper Grid Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 py-12 max-w-7xl mx-auto">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onHomeClick}>
            <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-white font-display font-extrabold text-sm shadow-sm">
              SD
            </div>
            <span className="font-display text-lg font-extrabold tracking-tight text-primary">
              SinoDirect
            </span>
          </div>
          <p className="text-secondary text-sm leading-relaxed">
            A ponte entre a inovação chinesa e o seu estilo de vida contemporâneo.
          </p>
          <div className="flex gap-4 text-secondary">
            <button className="hover:text-primary-container transition-colors">
              <Globe size={18} />
            </button>
            <button className="hover:text-primary-container transition-colors">
              <Award size={18} />
            </button>
            <button className="hover:text-primary-container transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Column 2: Sobre Nós */}
        <div>
          <h4 className="font-display text-on-surface font-bold text-sm mb-4">
            Sobre Nós
          </h4>
          <ul className="space-y-2.5 text-sm text-secondary font-medium">
            <li>
              <button onClick={onOpenHelp} className="hover:text-primary-container transition-colors">
                Nossa História
              </button>
            </li>
            <li>
              <button onClick={onOpenHelp} className="hover:text-primary-container transition-colors">
                Políticas de Importação
              </button>
            </li>
            <li>
              <button onClick={onOpenHelp} className="hover:text-primary-container transition-colors">
                Sustentabilidade
              </button>
            </li>
            <li>
              <button onClick={onOpenHelp} className="hover:text-primary-container transition-colors">
                Carreiras
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Suporte */}
        <div>
          <h4 className="font-display text-on-surface font-bold text-sm mb-4">
            Suporte
          </h4>
          <ul className="space-y-2.5 text-sm text-secondary font-medium">
            <li>
              <button onClick={onOpenHelp} className="hover:text-primary-container transition-colors">
                Política de Envio
              </button>
            </li>
            <li>
              <button onClick={onOpenHelp} className="hover:text-primary-container transition-colors">
                Devoluções
              </button>
            </li>
            <li>
              <button onClick={onOpenHelp} className="hover:text-primary-container transition-colors">
                Central de Ajuda
              </button>
            </li>
            <li>
              <button onClick={onOpenHelp} className="hover:text-primary-container transition-colors">
                Rastreio de Pedido
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contato */}
        <div>
          <h4 className="font-display text-on-surface font-bold text-sm mb-4">
            Contato
          </h4>
          <ul className="space-y-3 text-sm text-secondary font-medium">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary-container flex-shrink-0" />
              <span className="truncate">contato@sinodirect.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-primary-container flex-shrink-0" />
              <span>+55 (11) 4004-0000</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-primary-container flex-shrink-0" />
              <span className="leading-snug">São Paulo, SP - Brasil</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-outline-variant/20 py-6 px-6 md:px-16 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-secondary font-medium">
        <p>© 2026 SinoDirect Premium Imports. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <button onClick={onOpenPrivacy} className="hover:text-primary-container transition-colors">
            Privacidade
          </button>
          <button onClick={onOpenTerms} className="hover:text-primary-container transition-colors">
            Termos
          </button>
          <button onClick={onOpenHelp} className="hover:text-primary-container transition-colors">
            Cookies
          </button>
        </div>
      </div>

    </footer>
  );
}
