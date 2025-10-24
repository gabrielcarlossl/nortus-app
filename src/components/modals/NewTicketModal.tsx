'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { newTicketSchema, type NewTicketFormData } from '@/schemas/ticket.schema';
import { toast } from 'sonner';
import type { Ticket } from '@/services/tickets.service';

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewTicketFormData) => Promise<void>;
  priorities: string[];
  editingTicket?: Ticket | null;
  onUpdate?: (id: string, data: NewTicketFormData) => Promise<void>;
}

/**
 * @description Modal para criar ou editar ticket
 */
export function NewTicketModal({
  isOpen,
  onClose,
  onSubmit,
  priorities,
  editingTicket,
  onUpdate,
}: NewTicketModalProps) {
  const [formData, setFormData] = useState<NewTicketFormData>({
    client: '',
    email: '',
    priority: '',
    responsible: '',
    subject: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewTicketFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preenche formulário quando está editando
  useEffect(() => {
    if (editingTicket) {
      setFormData({
        client: editingTicket.client,
        email: editingTicket.email,
        priority: editingTicket.priority,
        responsible: editingTicket.responsible,
        subject: editingTicket.subject,
      });
    } else {
      setFormData({
        client: '',
        email: '',
        priority: '',
        responsible: '',
        subject: '',
      });
    }
  }, [editingTicket, isOpen]);

  if (!isOpen) return null;

  const isEditMode = !!editingTicket;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpa erro do campo ao digitar
    if (errors[name as keyof NewTicketFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Valida com Zod
    const result = newTicketSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof NewTicketFormData, string>> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof NewTicketFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEditMode && editingTicket && onUpdate) {
        // Modo de edição
        await onUpdate(editingTicket.id, result.data);
        toast.success('Ticket atualizado com sucesso!');
      } else {
        // Modo de criação
        await onSubmit(result.data);
        toast.success('Ticket criado com sucesso!');
      }

      // Limpa formulário
      setFormData({
        client: '',
        email: '',
        priority: '',
        responsible: '',
        subject: '',
      });
      onClose();
    } catch (error) {
      toast.error(isEditMode ? 'Erro ao atualizar ticket' : 'Erro ao criar ticket');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      client: '',
      email: '',
      priority: '',
      responsible: '',
      subject: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleCancel}
    >
      <div
        className="bg-[#1a2332] rounded-xl border border-gray-800 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            {isEditMode ? 'Editar Ticket' : 'Novo Ticket'}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-400">
            {isEditMode
              ? 'Atualize as informações do ticket abaixo.'
              : 'Preencha os dados abaixo para registrar um novo ticket na plataforma.'}
          </p>

          {/* Nome do cliente */}
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-white mb-2">
              Nome do cliente
            </label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
              className={`w-full px-4 py-2 bg-[#0f1623] border ${
                errors.client ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white placeholder-gray-500 placeholder:text-xs focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.client && <p className="mt-1 text-sm text-red-500">{errors.client}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail de contato para atualizações e resposta"
              className={`w-full px-4 py-2 bg-[#0f1623] border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white placeholder-gray-500 placeholder:text-xs focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Prioridade */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-white mb-2">
              Prioridade
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#0f1623] border ${
                errors.priority ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors`}
            >
              <option value="">Selecione o nível de urgência do atendimento</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {errors.priority && <p className="mt-1 text-sm text-red-500">{errors.priority}</p>}
          </div>

          {/* Responsável */}
          <div>
            <label htmlFor="responsible" className="block text-sm font-medium text-white mb-2">
              Responsável
            </label>
            <input
              type="text"
              id="responsible"
              name="responsible"
              value={formData.responsible}
              onChange={handleChange}
              placeholder="Quem será o responsável por esse ticket"
              className={`w-full px-4 py-2 bg-[#0f1623] border ${
                errors.responsible ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white placeholder-gray-500 placeholder:text-xs focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.responsible && (
              <p className="mt-1 text-sm text-red-500">{errors.responsible}</p>
            )}
          </div>

          {/* Assunto */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
              Assunto
            </label>
            <textarea
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Resumo breve do problema ou solicitação"
              rows={3}
              className={`w-full px-4 py-2 bg-[#0f1623] border ${
                errors.subject ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white placeholder-gray-500 placeholder:text-xs focus:outline-none focus:border-blue-500 transition-colors resize-none`}
            />
            {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-transparent border border-gray-700 hover:border-gray-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting
                ? isEditMode
                  ? 'Atualizando...'
                  : 'Salvando...'
                : isEditMode
                  ? 'Atualizar'
                  : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
