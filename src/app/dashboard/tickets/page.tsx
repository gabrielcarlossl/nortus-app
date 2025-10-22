'use client';

import { useEffect, useState } from 'react';
import { Plus, Ticket, MessageCircle, CheckSquare, Clock } from 'lucide-react';
import { TicketsTable } from '@/components/TicketsTable';
import { NewTicketModal } from '@/components/NewTicketModal';
import { ViewTicketModal } from '@/components/ViewTicketModal';
import { TicketSummaryCard } from '@/components/TicketSummaryCard';
import { getTicketsData, createTicket, updateTicket } from '@/services/tickets.service';
import type { NewTicketFormData } from '@/schemas/ticket.schema';
import type { Ticket as TicketType } from '@/services/tickets.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setTicketsData,
  setLoading,
  addTicket,
  updateTicket as updateTicketAction,
} from '@/store/slices/ticketsSlice';

/**
 * @description Página de Gerenciamento de Tickets
 */
export default function TicketsPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(state => state.tickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [viewingTicket, setViewingTicket] = useState<TicketType | null>(null);

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

  const handleUpdateTicket = async (ticketId: string, formData: NewTicketFormData) => {
    if (!data) return;

    const currentTicket = data.tickets.find(t => t.id === ticketId);
    if (!currentTicket) return;

    const updatedTicket = await updateTicket(ticketId, formData, currentTicket);
    dispatch(updateTicketAction(updatedTicket));
  };

  const handleEditClick = (ticket: TicketType) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  const handleViewClick = (ticket: TicketType) => {
    setViewingTicket(ticket);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTicket(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingTicket(null);
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
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          <Plus size={20} />
          Novo Ticket
        </button>
      </div>

      {/* KPIs cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TicketSummaryCard
          title="Tickets Abertos"
          value={data.resumo.open}
          icon={Ticket}
          iconColor="cyan"
        />
        <TicketSummaryCard
          title="Em Andamento"
          value={data.resumo.inProgress}
          icon={MessageCircle}
          iconColor="yellow"
        />
        <TicketSummaryCard
          title="Resolvidos Hoje"
          value={data.resumo.solved}
          icon={CheckSquare}
          iconColor="green"
        />
        <TicketSummaryCard
          title="Tempo Médio"
          value={`${data.resumo.timeAverageHours}h`}
          icon={Clock}
          iconColor="blue"
        />
      </div>

      {/* Tabela */}
      <TicketsTable
        tickets={data.tickets}
        statusOptions={data.status}
        priorities={data.priorities}
        onEditClick={handleEditClick}
        onViewClick={handleViewClick}
      />

      {/* Modal de Criação/Edição */}
      <NewTicketModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateTicket}
        priorities={data.priorities}
        editingTicket={editingTicket}
        onUpdate={handleUpdateTicket}
      />

      {/* Modal de Visualização */}
      <ViewTicketModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        ticket={viewingTicket}
      />
    </div>
  );
}
