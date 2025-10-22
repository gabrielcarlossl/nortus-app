/**
 * @description Serviço para gerenciamento de tickets
 */

export interface TicketResumo {
  open: number;
  inProgress: number;
  solved: number;
  timeAverageHours: number;
}

export interface Ticket {
  id: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string;
  responsible: string;
}

export interface TicketManagementData {
  resumo: TicketResumo;
  status: string[];
  priorities: string[];
  tickets: Ticket[];
}

export interface NewTicketData {
  client: string;
  email: string;
  priority: string;
  responsible: string;
  subject: string;
}

const TICKETS_API_URL =
  'https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2/ticket-management.json';

/**
 * Busca os dados de tickets
 */
export const getTicketsData = async (): Promise<TicketManagementData> => {
  try {
    const response = await fetch(TICKETS_API_URL);

    if (!response.ok) {
      throw new Error('Erro ao buscar dados dos tickets');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados dos tickets:', error);
    throw error;
  }
};

/**
 * Cria um novo ticket
 */
export const createTicket = async (ticketData: NewTicketData): Promise<Ticket> => {
  // Simula criação de ticket
  const newTicket: Ticket = {
    id: `TK${String(Math.floor(Math.random() * 9000) + 1000).padStart(3, '0')}`,
    priority: ticketData.priority,
    client: ticketData.client,
    email: ticketData.email,
    subject: ticketData.subject,
    status: 'Aberto',
    createdAt: new Date().toISOString(),
    responsible: ticketData.responsible,
  };

  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));

  return newTicket;
};
