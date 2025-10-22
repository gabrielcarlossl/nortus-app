'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/Badge';
import type { Ticket } from '@/services/tickets.service';

interface ViewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
}

/**
 * @description Modal para visualizar detalhes do ticket
 */
export function ViewTicketModal({ isOpen, onClose, ticket }: ViewTicketModalProps) {
  if (!isOpen || !ticket) return null;

  // Mapeia prioridade para cor do badge
  const getPriorityVariant = (priority: string): 'red' | 'blue' | 'gray' => {
    const variants: Record<string, 'red' | 'blue' | 'gray'> = {
      Urgente: 'red',
      Média: 'blue',
      Baixa: 'gray',
    };
    return variants[priority] || 'gray';
  };

  // Mapeia status para cor do badge
  const getStatusVariant = (status: string): 'cyan' | 'yellow' | 'green' => {
    const variants: Record<string, 'cyan' | 'yellow' | 'green'> = {
      Aberto: 'cyan',
      'Em andamento': 'yellow',
      Fechado: 'green',
    };
    return variants[status] || 'cyan';
  };

  // Formata data
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '-';

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1a2332] rounded-xl border border-gray-800 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-white">Detalhes do Ticket</h2>
            <span className="text-sm font-mono text-gray-400">{ticket.id}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status e Prioridade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
              <Badge text={ticket.status} variant={getStatusVariant(ticket.status)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Prioridade</label>
              <Badge text={ticket.priority} variant={getPriorityVariant(ticket.priority)} />
            </div>
          </div>

          {/* Cliente e Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Cliente</label>
              <p className="text-white bg-[#0f1623] px-4 py-3 rounded-lg border border-gray-700">
                {ticket.client}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <p className="text-white bg-[#0f1623] px-4 py-3 rounded-lg border border-gray-700 break-all">
                {ticket.email}
              </p>
            </div>
          </div>

          {/* Responsável e Data de Criação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Responsável</label>
              <p className="text-white bg-[#0f1623] px-4 py-3 rounded-lg border border-gray-700">
                {ticket.responsible}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Criado em</label>
              <p className="text-white bg-[#0f1623] px-4 py-3 rounded-lg border border-gray-700">
                {formatDate(ticket.createdAt)}
              </p>
            </div>
          </div>

          {/* Assunto */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Assunto</label>
            <div className="text-white bg-[#0f1623] px-4 py-3 rounded-lg border border-gray-700 whitespace-pre-wrap">
              {ticket.subject}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
