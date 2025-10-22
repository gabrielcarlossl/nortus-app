'use client';

import { useState, useMemo } from 'react';
import { Edit2, Eye, Search } from 'lucide-react';
import { Badge } from '@/components/Badge';
import type { Ticket } from '@/services/tickets.service';

interface TicketsTableProps {
  tickets: Ticket[];
  statusOptions: string[];
  priorities: string[];
}

/**
 * @description Tabela de tickets com filtros e busca
 */
export function TicketsTable({ tickets, statusOptions, priorities }: TicketsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [responsibleFilter, setResponsibleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Lista única de responsáveis
  const responsibles = useMemo(() => {
    const uniqueResponsibles = [...new Set(tickets.map(t => t.responsible))];
    return uniqueResponsibles.sort();
  }, [tickets]);

  // Filtra tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch =
        searchTerm === '' ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === '' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === '' || ticket.priority === priorityFilter;
      const matchesResponsible =
        responsibleFilter === '' || ticket.responsible === responsibleFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesResponsible;
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter, responsibleFilter]);

  // Paginação
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset página ao filtrar
  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    setCurrentPage(1);
  };

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

    // Verifica se a data é válida
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
    <div className="space-y-6">
      {/* Filtros e Busca */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por ID, cliente ou assunto"
            value={searchTerm}
            onChange={e => handleFilterChange(setSearchTerm, e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={e => handleFilterChange(setStatusFilter, e.target.value)}
          className="px-4 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="">Todos os status</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Prioridade */}
        <select
          value={priorityFilter}
          onChange={e => handleFilterChange(setPriorityFilter, e.target.value)}
          className="px-4 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="">Todas as prioridades</option>
          {priorities.map(priority => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        {/* Responsável */}
        <select
          value={responsibleFilter}
          onChange={e => handleFilterChange(setResponsibleFilter, e.target.value)}
          className="px-4 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="">Todos os responsáveis</option>
          {responsibles.map(responsible => (
            <option key={responsible} value={responsible}>
              {responsible}
            </option>
          ))}
        </select>
      </div>

      {/* Tabela */}
      <div className="bg-[#1a2332] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1623] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Prioridade
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Assunto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Criado em
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Responsável
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {paginatedTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    Nenhum ticket encontrado
                  </td>
                </tr>
              ) : (
                paginatedTickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-[#0f1623]/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-300">{ticket.id}</td>
                    <td className="px-6 py-4">
                      <Badge text={ticket.priority} variant={getPriorityVariant(ticket.priority)} />
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{ticket.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4">
                      <Badge text={ticket.status} variant={getStatusVariant(ticket.status)} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {formatDate(ticket.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{ticket.responsible}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="p-2 hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 rounded-lg transition-all duration-200"
                          title="Ver detalhes"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {filteredTickets.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
              {Math.min(currentPage * itemsPerPage, filteredTickets.length)} de{' '}
              {filteredTickets.length} tickets
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-white hover:bg-[#151f30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-400">
                {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-white hover:bg-[#151f30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
