/**
 * @description Serviço para buscar dados dos planos
 */

import { PlanData } from '@/types';

const PLAN_API_URL = 'https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2/plan.json';

/**
 * Busca dados dos planos
 */
export async function getPlanData(): Promise<PlanData> {
  try {
    const response = await fetch(PLAN_API_URL, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados dos planos: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro no serviço de planos:', error);
    throw error;
  }
}
