/**
 * @fileoverview Modal de Notificações
 *
 * @description
 * Modal dropdown que exibe notificações do sistema com dados mockados.
 * Inclui diferentes tipos de notificações (info, success, warning, alert).
 *
 * @features
 * - Lista de notificações com ícones e timestamps
 * - Filtro por tipo (todas, não lidas)
 * - Marcação de leitura individual
 * - Ação "Marcar todas como lidas"
 * - Badge contador de não lidas
 *
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, AlertTriangle, Clock, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Novo cliente cadastrado',
      message: 'Ricardo Leite foi adicionado ao sistema com sucesso.',
      timestamp: '5 minutos atrás',
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Atualização de sistema',
      message: 'Nova versão 2.4.0 disponível com melhorias de performance.',
      timestamp: '1 hora atrás',
      read: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Atenção: Renovação pendente',
      message: 'Cliente João Silva possui apólice vencendo em 7 dias.',
      timestamp: '2 horas atrás',
      read: false,
    },
    {
      id: '4',
      type: 'alert',
      title: 'Ação necessária',
      message: 'Ticket #1234 aguardando sua resposta há mais de 24h.',
      timestamp: '3 horas atrás',
      read: true,
    },
    {
      id: '5',
      type: 'success',
      title: 'Pagamento confirmado',
      message: 'Pagamento de R$ 185,90 processado com sucesso.',
      timestamp: '1 dia atrás',
      read: true,
    },
    {
      id: '6',
      type: 'info',
      title: 'Relatório disponível',
      message: 'Relatório mensal de vendas já está disponível para download.',
      timestamp: '2 dias atrás',
      read: true,
    },
  ]);

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

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications =
    filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'alert':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'info':
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-6">
      <div
        ref={modalRef}
        className="w-full max-w-md bg-[#1a2332] border border-gray-800 rounded-xl shadow-2xl animate-fade-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-white" />
            <h3 className="text-lg font-semibold text-white">Notificações</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#0f1629] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#0f1629]'
            }`}
          >
            Todas ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#0f1629]'
            }`}
          >
            Não lidas ({unreadCount})
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="ml-auto text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <Check size={14} />
              Marcar todas
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-[500px] overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell size={48} className="mx-auto text-gray-600 mb-3" />
              <p className="text-gray-400">
                {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-[#0f1629] transition-colors cursor-pointer ${
                    !notification.read ? 'bg-[#0f1629]/30' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-white">{notification.title}</h4>
                        {!notification.read && (
                          <span className="shrink-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-800 text-center">
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Ver todas as notificações
          </button>
        </div>
      </div>
    </div>
  );
}
