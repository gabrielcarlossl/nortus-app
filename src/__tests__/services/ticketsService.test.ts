import {
  getTicketsData,
  createTicket,
  updateTicket,
  type Ticket,
  type NewTicketData,
} from '../../services/tickets.service';

describe('tickets.service', () => {
  it('should fetch tickets data', async () => {
    const data = await getTicketsData();
    expect(data).toHaveProperty('tickets');
    expect(Array.isArray(data.tickets)).toBe(true);
  });

  it('should create a new ticket', async () => {
    const newTicketData: NewTicketData = {
      client: 'Teste',
      email: 'teste@email.com',
      priority: 'Urgente',
      responsible: 'João',
      subject: 'Novo ticket',
    };
    const ticket = await createTicket(newTicketData);
    expect(ticket).toMatchObject({
      client: 'Teste',
      email: 'teste@email.com',
      priority: 'Urgente',
      responsible: 'João',
      subject: 'Novo ticket',
      status: 'Aberto',
    });
    expect(ticket.id).toBeDefined();
    expect(ticket.createdAt).toBeDefined();
  });

  it('should update a ticket', async () => {
    const original: Ticket = {
      id: 'TK123',
      client: 'Teste',
      email: 'teste@email.com',
      priority: 'Urgente',
      responsible: 'João',
      subject: 'Novo ticket',
      status: 'Aberto',
      createdAt: new Date().toISOString(),
    };
    const updateData: NewTicketData = {
      client: 'Alterado',
      email: 'alterado@email.com',
      priority: 'Baixa',
      responsible: 'Maria',
      subject: 'Atualizado',
    };
    const updated = await updateTicket(original.id, updateData, original);
    expect(updated.client).toBe('Alterado');
    expect(updated.email).toBe('alterado@email.com');
    expect(updated.priority).toBe('Baixa');
    expect(updated.responsible).toBe('Maria');
    expect(updated.subject).toBe('Atualizado');
    expect(updated.id).toBe(original.id);
    expect(updated.status).toBe(original.status);
    expect(updated.createdAt).toBe(original.createdAt);
  });
});
