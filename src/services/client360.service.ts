/**
 * @description Serviço para buscar dados da Visão 360 do Cliente
 */

import { Client360Data } from '@/types';

const CLIENT_360_API_URL =
  'https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2/360-view.json';

/**
 * Busca dados da visão 360 do cliente
 */
export async function getClient360Data(): Promise<Client360Data> {
  try {
    const response = await fetch(CLIENT_360_API_URL);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da visão 360: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro no serviço de visão 360:', error);
    throw error;
  }
}
