'use client';

import { useEffect, useState } from 'react';
import { Plus, Ticket } from 'lucide-react';
import { TicketsTable } from '@/components/TicketsTable';
import { NewTicketModal } from '@/components/NewTicketModal';
import { getTicketsData, createTicket } from '@/services/tickets.service';
import type { NewTicketFormData } from '@/schemas/ticket.schema';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTicketsData, setLoading, addTicket } from '@/store/slices/ticketsSlice';

/**
 * @description Página de Gerenciamento de Tickets
 */
export default function TicketsPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(state => state.tickets);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Só busca dados da API se não houver dados no Redux (primeira vez)
    if (!data) {
      const fetchData = async () => {
        dispatch(setLoading(true));
        try {
          const ticketsData = await getTicketsData();
          dispatch(setTicketsData(ticketsData));
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
          dispatch(setLoading(false));
        }
      };

      fetchData();
    }
  }, [data, dispatch]);

  const handleCreateTicket = async (formData: NewTicketFormData) => {
    const newTicket = await createTicket(formData);
    dispatch(addTicket(newTicket));
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gerenciamento de Tickets</h1>
            <p className="text-gray-400">Acompanhe e gerencie todos os tickets de suporte</p>
          </div>
          <div className="h-12 w-32 bg-gray-800 animate-pulse rounded-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-800 animate-pulse rounded-xl" />
          ))}
        </div>

        <div className="h-96 bg-gray-800 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-400">Erro ao carregar dados</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gerenciamento de Tickets</h1>
          <p className="text-gray-400">Acompanhe e gerencie todos os tickets de suporte</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} />
          Novo Ticket
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Tickets Abertos</span>
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Ticket className="text-cyan-400" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{data.resumo.open}</p>
        </div>

        <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Em Andamento</span>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Ticket className="text-yellow-400" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{data.resumo.inProgress}</p>
        </div>

        <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Resolvidos Hoje</span>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Ticket className="text-green-400" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{data.resumo.solved}</p>
        </div>

        <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Tempo Médio</span>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Ticket className="text-blue-400" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{data.resumo.timeAverageHours}h</p>
        </div>
      </div>

      {/* Tabela */}
      <TicketsTable
        tickets={data.tickets}
        statusOptions={data.status}
        priorities={data.priorities}
      />

      {/* Modal */}
      <NewTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
        priorities={data.priorities}
      />
    </div>
  );
}
