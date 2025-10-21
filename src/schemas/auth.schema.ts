import { z } from 'zod';

/**
 * @description Schema de validação para o formulário de login
 * Validações:
 * - Email: formato válido e obrigatório
 * - Senha: mínimo 6 caracteres e obrigatório
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('Por favor, insira um email válido'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
