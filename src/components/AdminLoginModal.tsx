import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  X, 
  ArrowRight, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { DEMO_ADMIN_CREDENTIALS, saveAdminSession, AdminUser } from '../utils/authStorage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setUsername(DEMO_ADMIN_CREDENTIALS.username);
    setPassword(DEMO_ADMIN_CREDENTIALS.password);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      // Allow demo credentials or any reasonable admin username/pass for flexible access
      const isDemoMatch = 
        username.trim().toLowerCase() === DEMO_ADMIN_CREDENTIALS.username && 
        password === DEMO_ADMIN_CREDENTIALS.password;

      // Also allow if user specifies 'admin' with any password or custom entry
      if (isDemoMatch || (username.trim().toLowerCase() === 'admin' && password.length >= 4)) {
        const user: AdminUser = {
          username: username.trim(),
          name: 'Mestre Saboeiro (Admin)',
          role: 'Administrador Geral',
          loginTime: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        saveAdminSession(user);
        setIsLoading(false);
        onLoginSuccess(user);
        onClose();
      } else {
        setIsLoading(false);
        setErrorMessage('Credenciais incorretas. Dica: use o usuário "admin" e senha "atelie123".');
      }
    }, 400);
  };

  return (
    <div 
      id="admin-login-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D4A373]/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Botanical Header Accent */}
        <div className="bg-[#2C2723] px-6 py-5 text-white flex items-center justify-between border-b border-[#3B342F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5C6B47] text-[#FAF7F2] flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-5 h-5 text-[#EADCC9]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide text-[#FAF7F2]">
                Painel CMS & Gestão
              </h3>
              <p className="text-[11px] text-[#D4A373] tracking-widest uppercase font-medium">
                Ateliê Botânico • Acesso Restrito
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <p className="text-xs text-[#6B5E54] leading-relaxed">
              Área administrativa para criar, editar, ajustar estoque e gerenciar o catálogo completo de sabonetes e cosméticos artesanais.
            </p>
          </div>

          {/* Demo Helper Pill */}
          <div className="bg-[#F3EDE2] border border-[#D4A373]/30 rounded-2xl p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#5C6B47] font-medium">
              <Sparkles className="w-4 h-4 text-[#C2593F] shrink-0" />
              <span>Acesso Rápido Demo: <strong>admin</strong> / <strong>atelie123</strong></span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-[#8C6D53] hover:text-[#2C2723] bg-white px-2.5 py-1 rounded-lg border border-[#D4A373]/40 shadow-2xs hover:bg-[#FAF7F2] transition-colors whitespace-nowrap"
            >
              Preencher
            </button>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
              Usuário / E-mail
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8C6D53] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-username-input"
                type="text"
                required
                placeholder="Ex: admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] placeholder-[#A89A8F] focus:outline-none focus:border-[#5C6B47] focus:ring-2 focus:ring-[#5C6B47]/20 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
              Senha de Acesso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C6D53] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] placeholder-[#A89A8F] focus:outline-none focus:border-[#5C6B47] focus:ring-2 focus:ring-[#5C6B47]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4A3E39]"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-[#D4A373]/40 text-xs font-bold text-[#4A3E39] hover:bg-[#EFE9DF] transition-colors text-center"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white text-xs font-bold tracking-wide shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            >
              <span>{isLoading ? 'Autenticando...' : 'Acessar CMS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
