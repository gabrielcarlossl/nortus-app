/**
 * @fileoverview Testes para o Client 360 Service
 *
 * @description
 * Testes de error handling para o serviço de visão 360 do cliente.
 * Focado em validar o comportamento do service, não o contrato da API.
 *
 * @author Loomi Platform
 * @version 1.0.0
 */

import { getClient360Data } from '../../services/client360.service';

describe('client360.service', () => {
  describe('getClient360Data', () => {
    it('should fetch and return client 360 data successfully', async () => {
      const data = await getClient360Data();

      // Valida que recebeu dados válidos do TypeScript
      expect(data).toBeDefined();
      expect(data.client).toBeDefined();
      expect(data.produtos).toBeDefined();
      expect(data.sugestionsIA).toBeDefined();
    });

    it('should handle network errors gracefully', async () => {
      // Mock fetch para simular erro de rede
      const originalFetch = global.fetch;
      global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

      await expect(getClient360Data()).rejects.toThrow();

      // Restaura fetch original
      global.fetch = originalFetch;
    });

    it('should handle API errors (non-OK responses)', async () => {
      // Mock fetch para simular resposta 404
      const originalFetch = global.fetch;
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          statusText: 'Not Found',
        } as Response)
      );

      await expect(getClient360Data()).rejects.toThrow('Erro ao buscar dados da visão 360');

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

      await expect(getClient360Data()).rejects.toThrow();

      // Restaura fetch original
      global.fetch = originalFetch;
    });
  });
});
