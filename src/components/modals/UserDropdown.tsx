/**
 * @fileoverview Dropdown de Perfil do Usuário
 *
 * @description
 * Dropdown que exibe opções do perfil do usuário logado.
 * Inclui navegação rápida para configurações, perfil, ajuda e logout.
 *
 * @features
 * - Informações do usuário (nome, email, cargo)
 * - Links para perfil e configurações
 * - Opções de ajuda e documentação
 * - Tema e preferências
 * - Logout
 */

'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, HelpCircle, LogOut, Moon, Sun, FileText, Bell } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { authService } from '@/services/auth.service';
import { ROUTES } from '@/constants';
import { toast } from 'sonner';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDropdown({ isOpen, onClose }: UserDropdownProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    toast.success('Logout realizado com sucesso!');
    router.push(ROUTES.LOGIN);
    onClose();
  };

  const handleNavigation = (route: string) => {
    router.push(route);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-6">
      <div
        ref={dropdownRef}
        className="w-80 bg-[#1a2332] border border-gray-800 rounded-xl shadow-2xl animate-fade-in"
      >
        {/* User Info Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-medium">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.username || 'Usuário'}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {/* Meu Perfil */}
          <button
            onClick={() => handleNavigation(ROUTES.SETTINGS)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#0f1629] transition-colors text-left"
          >
            <User size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-white">Meu Perfil</p>
              <p className="text-xs text-gray-500">Ver e editar informações</p>
            </div>
          </button>

          {/* Configurações */}
          <button
            onClick={() => handleNavigation(ROUTES.SETTINGS)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#0f1629] transition-colors text-left"
          >
            <Settings size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-white">Configurações</p>
              <p className="text-xs text-gray-500">Preferências e privacidade</p>
            </div>
          </button>

          {/* Notificações */}
          <button
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#0f1629] transition-colors text-left"
          >
            <Bell size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-white">Notificações</p>
              <p className="text-xs text-gray-500">Gerenciar alertas</p>
            </div>
          </button>
        </div>

        <div className="border-t border-gray-800 py-2">
          {/* Tema */}
          <button
            onClick={onClose}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#0f1629] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Moon size={18} className="text-gray-400" />
              <span className="text-sm font-medium text-white">Tema Escuro</span>
            </div>
            <div className="flex items-center gap-2">
              <Sun size={14} className="text-gray-500" />
              <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all"></div>
              </div>
            </div>
          </button>

          {/* Ajuda */}
          <button
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#0f1629] transition-colors text-left"
          >
            <HelpCircle size={18} className="text-gray-400" />
            <span className="text-sm font-medium text-white">Central de Ajuda</span>
          </button>

          {/* Documentação */}
          <button
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#0f1629] transition-colors text-left"
          >
            <FileText size={18} className="text-gray-400" />
            <span className="text-sm font-medium text-white">Documentação</span>
          </button>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-800 p-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600/10 text-red-500 hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sair da conta</span>
          </button>
        </div>
      </div>
    </div>
  );
}
