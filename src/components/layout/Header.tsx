'use client';

import { useState } from 'react';
import { Bell, Search, User, Globe } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import NotificationsModal from '@/components/modals/NotificationsModal';
import LanguageSelector from '@/components/modals/LanguageSelector';
import UserDropdown from '@/components/modals/UserDropdown';

/**
 * @description Componente Header
 * Cabeçalho fixo com informações do usuário e ações
 */
export function Header() {
  const { user } = useAppSelector(state => state.auth);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-[#1a2332] border-b border-gray-800 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Título da Página */}
        <div>
          <h2 className="text-xl font-semibold text-white pl-12 lg:pl-0">Dashboard</h2>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[#0f1629] rounded-lg text-gray-400 hover:text-white transition-colors">
            <Search size={18} />
            <span className="text-sm">Pesquisar...</span>
          </button>

          {/* Language Selector */}
          <button
            onClick={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#0f1629] transition-colors cursor-pointer"
          >
            <Globe size={20} />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#0f1629] transition-colors cursor-pointer"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#0f1629] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              {user?.username ? (
                <span className="text-white text-sm font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User size={18} className="text-white" />
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">{user?.username || 'Usuário'}</p>
              <p className="text-xs text-gray-400">{user?.email || 'user@example.com'}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Language Selector */}
      <LanguageSelector
        isOpen={isLanguageSelectorOpen}
        onClose={() => setIsLanguageSelectorOpen(false)}
      />

      {/* User Dropdown */}
      <UserDropdown isOpen={isUserDropdownOpen} onClose={() => setIsUserDropdownOpen(false)} />
    </header>
  );
}
