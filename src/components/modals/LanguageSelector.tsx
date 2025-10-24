/**
 * @fileoverview Modal de Seleção de Idioma
 *
 * @description
 * Dropdown para seleção de idioma/região da aplicação.
 * Inclui lista de idiomas disponíveis com bandeiras e nomes.
 *
 * @features
 * - Lista de idiomas com bandeiras
 * - Seleção visual do idioma ativo
 * - Fecha ao clicar fora
 * - Animação de entrada
 *
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageSelector({ isOpen, onClose }: LanguageSelectorProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');

  const languages: Language[] = [
    {
      code: 'pt-BR',
      name: 'Portuguese',
      nativeName: 'Português (Brasil)',
      flag: '🇧🇷',
    },
    {
      code: 'en-US',
      name: 'English',
      nativeName: 'English (United States)',
      flag: '🇺🇸',
    },
    {
      code: 'es-ES',
      name: 'Spanish',
      nativeName: 'Español (España)',
      flag: '🇪🇸',
    },
  ];

  // Fecha o modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    // Aqui você pode adicionar lógica para mudar o idioma da aplicação
    console.log('Idioma selecionado:', code);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-6">
      <div
        ref={modalRef}
        className="w-80 bg-[#1a2332] border border-gray-800 rounded-xl shadow-2xl animate-fade-in"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          <Globe size={20} className="text-white" />
          <h3 className="text-lg font-semibold text-white">Selecionar Idioma</h3>
        </div>

        {/* Languages List */}
        <div className="max-h-[400px] overflow-y-auto">
          {languages.map((language, index) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`w-full flex items-center justify-between p-4 hover:bg-[#0f1629] transition-colors ${
                selectedLanguage === language.code ? 'bg-[#0f1629]' : ''
              } ${index === languages.length - 1 ? 'rounded-b-xl' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{language.flag}</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{language.nativeName}</p>
                  <p className="text-xs text-gray-400">{language.name}</p>
                </div>
              </div>
              {selectedLanguage === language.code && <Check size={20} className="text-blue-500" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
