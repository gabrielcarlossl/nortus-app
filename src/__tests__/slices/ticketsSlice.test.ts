import ticketsReducer, {
  setTicketsData,
  setLoading,
  setError,
  addTicket,
  updateTicket,
  deleteTicket,
} from '../../store/slices/ticketsSlice';
import type { TicketManagementData, Ticket } from '../../services/tickets.service';

describe('ticketsSlice', () => {
  const initialState = {
    data: null,
    loading: false,
    error: null,
  };

  const mockData: TicketManagementData = {
    resumo: { open: 1, inProgress: 2, solved: 3, timeAverageHours: 1.5 },
    status: ['Aberto', 'Fechado'],
    priorities: ['Urgente', 'Baixa'],
    tickets: [
      {
        id: 'TK001',
        priority: 'Urgente',
        client: 'Cliente 1',
        email: 'cliente1@email.com',
        subject: 'Teste',
        status: 'Aberto',
        createdAt: '2025-10-22T10:00:00.000Z',
        responsible: 'João',
      },
    ],
  };

  it('should handle setTicketsData', () => {
    const state = ticketsReducer(initialState, setTicketsData(mockData));
    expect(state.data).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle setLoading', () => {
    const state = ticketsReducer(initialState, setLoading(true));
    expect(state.loading).toBe(true);
  });

  it('should handle setError', () => {
    const state = ticketsReducer(initialState, setError('Erro'));
    expect(state.error).toBe('Erro');
    expect(state.loading).toBe(false);
  });

  it('should handle addTicket', () => {
    const newTicket: Ticket = {
      id: 'TK002',
      priority: 'Baixa',
      client: 'Cliente 2',
      email: 'cliente2@email.com',
      subject: 'Novo',
      status: 'Aberto',
      createdAt: '2025-10-22T11:00:00.000Z',
      responsible: 'Maria',
    };
    const state = ticketsReducer({ ...initialState, data: mockData }, addTicket(newTicket));
    expect(state.data?.tickets[0]).toEqual(newTicket);
    expect(state.data?.resumo.open).toBe(2);
  });

  it('should handle updateTicket', () => {
    const updatedTicket: Ticket = { ...mockData.tickets[0], subject: 'Atualizado' };
    const state = ticketsReducer({ ...initialState, data: mockData }, updateTicket(updatedTicket));
    expect(state.data?.tickets[0].subject).toBe('Atualizado');
  });

  it('should handle deleteTicket', () => {
    const state = ticketsReducer({ ...initialState, data: mockData }, deleteTicket('TK001'));
    expect(state.data?.tickets.length).toBe(0);
  });
});
