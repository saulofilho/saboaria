import React, { useState } from 'react';
import { 
  Sparkles, 
  Leaf, 
  Heart, 
  Mail, 
  Check, 
  Instagram, 
  MessageCircle, 
  Youtube, 
  ShieldCheck, 
  Droplets,
  Award
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#231F1C] text-[#FAF7F2] border-t border-[#3B342F]">
      
      {/* Botanical Value Badges Banner */}
      <div className="border-b border-[#3B342F] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#3B342F] text-[#D4A373] flex items-center justify-center mx-auto">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">100% Vegetal & Vegano</h4>
              <p className="text-[11px] text-[#A89A8F]">Sem gordura animal ou óleo mineral</p>
            </div>

            <div className="space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#3B342F] text-[#D4A373] flex items-center justify-center mx-auto">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">Saponificação a Frio</h4>
              <p className="text-[11px] text-[#A89A8F]">Cura lenta e glicerina vegetal retida</p>
            </div>

            <div className="space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#3B342F] text-[#D4A373] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">Livre de Sintéticos</h4>
              <p className="text-[11px] text-[#A89A8F]">Sem lauril, parabenos ou ftalatos</p>
            </div>

            <div className="space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#3B342F] text-[#D4A373] flex items-center justify-center mx-auto">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">Feito à Mão</h4>
              <p className="text-[11px] text-[#A89A8F]">Lotes limitados e curados com carinho</p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & About (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#5C6B47] flex items-center justify-center text-[#FAF7F2]">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold text-[#FAF7F2] tracking-wide">
                Ateliê Botânico
              </span>
            </div>

            <p className="text-xs text-[#A89A8F] leading-relaxed max-w-sm">
              Saboaria artesanal ancestral, fitoterapia pura e alquimia botânica. Criamos barras aromaterápicas e ensinamos a arte da saponificação natural com respeito ao meio ambiente.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#D4A373]">
              <a href="#" className="w-8 h-8 rounded-full bg-[#3B342F] hover:bg-[#5C6B47] flex items-center justify-center text-white transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#3B342F] hover:bg-[#5C6B47] flex items-center justify-center text-white transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#3B342F] hover:bg-[#25D366] flex items-center justify-center text-white transition-colors" title="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (4 Cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <h5 className="font-serif text-sm font-bold text-[#FAF7F2] uppercase tracking-wider">
                Navegação
              </h5>
              <ul className="space-y-2 text-[#A89A8F]">
                <li>
                  <button onClick={() => onNavigate('loja')} className="hover:text-[#D4A373] transition-colors">
                    Galeria de Produtos
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('personalizado')} className="hover:text-[#D4A373] transition-colors">
                    Monte seu Sabonete
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('ingredientes')} className="hover:text-[#D4A373] transition-colors">
                    Guia de Ingredientes
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('depoimentos')} className="hover:text-[#D4A373] transition-colors">
                    Depoimentos de Clientes
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-serif text-sm font-bold text-[#FAF7F2] uppercase tracking-wider">
                Escola & Tutoriais
              </h5>
              <ul className="space-y-2 text-[#A89A8F]">
                <li>
                  <button onClick={() => onNavigate('aulas')} className="hover:text-[#D4A373] transition-colors">
                    Curso para Iniciantes
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('tutoriais')} className="hover:text-[#D4A373] transition-colors">
                    Vídeos Passo a Passo
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('ingredientes')} className="hover:text-[#D4A373] transition-colors">
                    Calculadora de SAP
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('aulas')} className="hover:text-[#D4A373] transition-colors">
                    Segurança com NaOH
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Box (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-serif text-sm font-bold text-[#FAF7F2] uppercase tracking-wider">
              Receitas & Dicas no seu E-mail
            </h5>
            <p className="text-xs text-[#A89A8F] leading-relaxed">
              Assine nosso boletim botânico mensal e receba fichas técnicas de formulação e descontos exclusivos.
            </p>

            {isSubscribed ? (
              <div className="bg-[#3B342F] p-3 rounded-2xl text-xs text-[#D4A373] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Inscrição confirmada! Boas alquimias.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C6D53] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Seu melhor e-mail"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#2C2723] border border-[#3B342F] text-xs text-white focus:outline-none focus:border-[#5C6B47]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs transition-colors"
                >
                  Receber Fichas & Receitas
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[#3B342F] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7E74] gap-3">
          <p>© {new Date().getFullYear()} Ateliê Botânico — Saboaria Artesanal & Cosmética Ancestral. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Criado com</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>para amantes da natureza</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
