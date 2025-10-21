'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';
import { authService } from '@/services/auth.service';
import { useAppDispatch } from '@/store/hooks';
import { setUser, setLoading } from '@/store/slices/authSlice';
import { ROUTES } from '@/constants';

/**
 * @description Página de Login
 * Formulário com validação Zod e feedback visual
 */
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * @description Valida campo individual
   */
  const validateField = (field: keyof LoginFormData, value: string) => {
    try {
      loginSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      const zodError = error as { errors: Array<{ message: string }> };
      setErrors(prev => ({ ...prev, [field]: zodError?.errors?.[0]?.message }));
    }
  };

  /**
   * @description Atualiza valores do formulário
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof LoginFormData, value);
  };

  /**
   * @description Submete formulário de login
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Valida formulário completo
      const validatedData = loginSchema.parse(formData);
      setIsSubmitting(true);
      dispatch(setLoading(true));

      // Realiza login
      const response = await authService.login(validatedData);

      // Atualiza estado global
      dispatch(
        setUser({
          username: response.data.username,
          email: validatedData.email,
        })
      );

      // Feedback visual de sucesso
      toast.success('Login realizado com sucesso!', {
        description: `Bem-vindo, ${response.data.username}!`,
      });

      // Aguarda animação do toast antes de redirecionar
      setTimeout(() => {
        router.push(ROUTES.DASHBOARD);
      }, 500);
    } catch (error) {
      // Feedback visual de erro
      const errorMessage =
        error instanceof Error ? error.message : 'Verifique suas credenciais e tente novamente.';
      toast.error('Erro ao realizar login', {
        description: errorMessage,
      });

      setIsSubmitting(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1629] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Lado Esquerdo - Formulário */}
        <div className="space-y-8 animate-slide-in px-4 lg:px-12">
          {/* Logo */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-blue-500">Nortus</h1>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-white">Login</h2>
            <p className="text-gray-400 text-sm">
              Entre com suas credenciais para acessar a sua conta.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-gray-300">
                Usuário*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Insira o seu e-mail, CPF ou passaporte."
                className={`w-full px-4 py-3 bg-[#1a2332] border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 animate-fade-in">{errors.email}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Insira o seu e-mail, CPF ou passaporte.
              </p>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-gray-300">
                Senha*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-[#1a2332] border ${
                    errors.password ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 animate-fade-in">{errors.password}</p>
              )}
            </div>

            {/* Lembrar-me e Esqueci senha */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-700 bg-[#1a2332] text-blue-500 focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-300">Lembrar meu usuário</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
                Esqueci minha senha
              </a>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </button>
          </form>
        </div>

        {/* Lado Direito - Ilustração */}
        <div className="hidden lg:flex items-center justify-center animate-fade-in">
          <div className="relative w-full h-[600px] bg-linear-to-br from-blue-900/20 to-blue-600/10 rounded-3xl p-8 backdrop-blur-sm border border-blue-500/20">
            <div className="flex items-center justify-between mb-6">
              <button className="text-white flex items-center space-x-2 text-sm">
                <span>🙋</span>
                <span>Ajuda</span>
              </button>
              <button className="text-white flex items-center space-x-2 text-sm">
                <span>🇧🇷</span>
                <span>PT-br</span>
              </button>
            </div>
            
            {/* Ilustração - Placeholder */}
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-64 h-64 mx-auto bg-linear-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="relative -mt-48">
                  <div className="text-6xl mb-4">🚗</div>
                  <div className="text-6xl mb-4">🏠</div>
                  <div className="text-6xl">📱</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
