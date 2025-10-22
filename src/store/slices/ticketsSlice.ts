import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Ticket, TicketManagementData } from '@/services/tickets.service';

interface TicketsState {
  data: TicketManagementData | null;
  loading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  data: null,
  loading: false,
  error: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTicketsData: (state, action: PayloadAction<TicketManagementData>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      if (state.data) {
        state.data.tickets = [action.payload, ...state.data.tickets];
        state.data.resumo.open += 1;
      }
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      if (state.data) {
        const index = state.data.tickets.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.data.tickets[index] = action.payload;
        }
      }
    },
    deleteTicket: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.tickets = state.data.tickets.filter(t => t.id !== action.payload);
      }
    },
  },
});

export const { setTicketsData, setLoading, setError, addTicket, updateTicket, deleteTicket } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
