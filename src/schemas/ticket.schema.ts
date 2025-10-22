import { z } from 'zod';

/**
 * @description Schema de validação para novo ticket
 */
export const newTicketSchema = z.object({
  client: z
    .string()
    .min(3, { message: 'Nome do cliente deve ter no mínimo 3 caracteres' })
    .max(100, { message: 'Nome do cliente deve ter no máximo 100 caracteres' }),
  email: z
    .string()
    .min(1, { message: 'E-mail é obrigatório' })
    .refine(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'E-mail inválido',
    }),
  priority: z.string().min(1, { message: 'Prioridade é obrigatória' }),
  responsible: z.string().min(1, { message: 'Responsável é obrigatório' }),
  subject: z
    .string()
    .min(5, { message: 'Assunto deve ter no mínimo 5 caracteres' })
    .max(200, { message: 'Assunto deve ter no máximo 200 caracteres' }),
});

export type NewTicketFormData = z.infer<typeof newTicketSchema>;
