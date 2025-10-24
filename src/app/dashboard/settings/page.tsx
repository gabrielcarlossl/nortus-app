/**
 * @fileoverview Página de Configurações do Dashboard
 *
 * @description
 * Página genérica de configurações da aplicação, permitindo ao usuário
 * personalizar preferências, gerenciar conta e acessar opções do sistema.
 *
 * @features
 * - Configurações de perfil e conta
 * - Preferências de notificações
 * - Configurações de segurança
 * - Preferências de aparência
 * - Configurações de privacidade
 */

'use client';

import { useState } from 'react';
import { User, Bell, Shield, Palette, Lock, Globe, Save, Eye, EyeOff } from 'lucide-react';
import ToggleSwitch from '@/components/ToggleSwitch';

interface SettingSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const sections: SettingSection[] = [
    {
      id: 'profile',
      icon: <User size={20} />,
      title: 'Perfil',
      description: 'Gerencie suas informações pessoais',
    },
    {
      id: 'notifications',
      icon: <Bell size={20} />,
      title: 'Notificações',
      description: 'Configure suas preferências de notificação',
    },
    {
      id: 'security',
      icon: <Shield size={20} />,
      title: 'Segurança',
      description: 'Gerencie senha e autenticação',
    },
    {
      id: 'appearance',
      icon: <Palette size={20} />,
      title: 'Aparência',
      description: 'Personalize a interface',
    },
    {
      id: 'privacy',
      icon: <Lock size={20} />,
      title: 'Privacidade',
      description: 'Controle seus dados e privacidade',
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Informações do Perfil</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    defaultValue="Ricardo Leite"
                    className="w-full px-4 py-2 bg-[#141c2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">E-mail</label>
                  <input
                    type="email"
                    defaultValue="ricardo.leite@example.com"
                    className="w-full px-4 py-2 bg-[#141c2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Telefone</label>
                  <input
                    type="tel"
                    defaultValue="(11) 98765-4321"
                    className="w-full px-4 py-2 bg-[#141c2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Cargo</label>
                  <input
                    type="text"
                    defaultValue="Assistente Colaborador"
                    className="w-full px-4 py-2 bg-[#141c2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Preferências de Notificação</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#141c2a] rounded-lg">
                  <div>
                    <p className="text-white font-medium">Notificações por e-mail</p>
                    <p className="text-sm text-gray-400">Receber atualizações por e-mail</p>
                  </div>
                  <ToggleSwitch checked={true} />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#141c2a] rounded-lg">
                  <div>
                    <p className="text-white font-medium">Notificações push</p>
                    <p className="text-sm text-gray-400">Receber notificações no navegador</p>
                  </div>
                  <ToggleSwitch checked={true} />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#141c2a] rounded-lg">
                  <div>
                    <p className="text-white font-medium">Novos tickets</p>
                    <p className="text-sm text-gray-400">Alertas sobre novos tickets</p>
                  </div>
                  <ToggleSwitch checked={true} />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#141c2a] rounded-lg">
                  <div>
                    <p className="text-white font-medium">Relatórios semanais</p>
                    <p className="text-sm text-gray-400">Resumo semanal de atividades</p>
                  </div>
                  <ToggleSwitch checked={false} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Segurança e Autenticação</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Senha atual
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-2 bg-[#141c2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Nova senha</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-2 bg-[#141c2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Confirmar nova senha
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-2 bg-[#141c2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between p-4 bg-[#141c2a] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Autenticação de dois fatores</p>
                      <p className="text-sm text-gray-400">
                        Adicione uma camada extra de segurança
                      </p>
                    </div>
                    <ToggleSwitch checked={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Preferências de Aparência</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tema</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-4 bg-blue-600 border-2 border-blue-500 rounded-lg text-white font-medium">
                      Escuro
                    </button>
                    <button className="p-4 bg-[#141c2a] border-2 border-gray-700 rounded-lg text-gray-400 font-medium hover:border-blue-500">
                      Claro
                    </button>
                    <button className="p-4 bg-[#141c2a] border-2 border-gray-700 rounded-lg text-gray-400 font-medium hover:border-blue-500">
                      Auto
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Tamanho da fonte
                  </label>
                  <select className="w-full px-4 py-2 bg-[#141c2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option>Pequeno</option>
                    <option>Médio</option>
                    <option>Grande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <Globe size={16} className="inline mr-2" />
                    Idioma
                  </label>
                  <select className="w-full px-4 py-2 bg-[#141c2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option>Português (BR)</option>
                    <option>English (US)</option>
                    <option>Español</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Privacidade e Dados</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#141c2a] rounded-lg">
                  <div>
                    <p className="text-white font-medium">Perfil público</p>
                    <p className="text-sm text-gray-400">
                      Permitir que outros usuários vejam seu perfil
                    </p>
                  </div>
                  <ToggleSwitch checked={false} />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#141c2a] rounded-lg">
                  <div>
                    <p className="text-white font-medium">Coleta de dados analíticos</p>
                    <p className="text-sm text-gray-400">
                      Ajude a melhorar o produto compartilhando dados de uso
                    </p>
                  </div>
                  <ToggleSwitch checked={true} />
                </div>

                <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                  <h4 className="text-red-400 font-medium mb-2">Zona de Perigo</h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Essas ações são irreversíveis. Proceda com cuidado.
                  </p>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    Excluir minha conta
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Configurações</h1>
        <p className="text-gray-400">Gerencie suas preferências e configurações da conta</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Menu */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a2332] rounded-xl border border-gray-800 overflow-hidden">
            <nav className="space-y-1 p-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-[#141c2a] hover:text-white'
                  }`}
                >
                  <div className="mt-0.5">{section.icon}</div>
                  <div className="text-left">
                    <p className="font-medium">{section.title}</p>
                    <p className="text-xs opacity-80">{section.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            {renderContent()}

            {/* Save Button */}
            <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                <Save size={18} />
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
