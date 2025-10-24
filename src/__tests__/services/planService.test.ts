/**
 * @fileoverview Testes para o Plan Service
 *
 * @description
 * Testes de error handling para o serviço de planos.
 * Focado em validar o comportamento do service, não o contrato da API.
 *
 * @author Loomi Platform
 * @version 1.0.0
 */

import { getPlanData } from '../../services/plan.service';

describe('plan.service', () => {
  describe('getPlanData', () => {
    it('should fetch and return plan data successfully', async () => {
      const data = await getPlanData();

      // Valida que recebeu dados válidos do TypeScript
      expect(data).toBeDefined();
      expect(data.includedBenefits).toBeDefined();
      expect(data.plansIndicators).toBeDefined();
    });

    it('should handle network errors gracefully', async () => {
      // Mock fetch para simular erro de rede
      const originalFetch = global.fetch;
      global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

      await expect(getPlanData()).rejects.toThrow();

      // Restaura fetch original
      global.fetch = originalFetch;
    });

    it('should handle API errors (non-OK responses)', async () => {
      // Mock fetch para simular resposta 500
      const originalFetch = global.fetch;
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          statusText: 'Internal Server Error',
        } as Response)
      );

      await expect(getPlanData()).rejects.toThrow('Erro ao buscar dados dos planos');

      // Restaura fetch original
      global.fetch = originalFetch;
    });

    it('should handle invalid JSON responses', async () => {
      // Mock fetch para simular resposta inválida
      const originalFetch = global.fetch;
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.reject(new Error('Invalid JSON')),
        } as Response)
      );

      await expect(getPlanData()).rejects.toThrow();

      // Restaura fetch original
      global.fetch = originalFetch;
    });
  });
});
