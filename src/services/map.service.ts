/**
 * @description Serviço para buscar dados do mapa
 */

import { MapData } from '@/types';

const MAP_API_URL = 'https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2/map.json';

/**
 * Busca os dados de localização do mapa
 */
export const getMapData = async (): Promise<MapData> => {
  try {
    const response = await fetch(MAP_API_URL);

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do mapa');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Erro ao buscar dados do mapa:', error);
    throw error;
  }
};
