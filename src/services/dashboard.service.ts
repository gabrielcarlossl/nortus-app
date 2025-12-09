/**
 * @description Serviço para buscar dados do dashboard
 */

export interface KpiTrend {
  name: string;
  data: number[];
}

export interface KpiResume {
  valor: number;
  variacao: number;
}

export interface Segment {
  nome: string;
  valor: number;
}

export interface ActiveClient {
  id: string;
  name: string;
  email: string;
  secureType: string;
  monthValue: number;
  status: string;
  renewalDate: string;
  location: string;
}

export interface DashboardData {
  kpisTrend: {
    labels: string[];
    arpuTrend: KpiTrend;
    conversionTrend: KpiTrend;
    churnTrend: KpiTrend;
    retentionTrend: KpiTrend;
  };
  kpisResume: {
    arpu: KpiResume;
    conversion: KpiResume;
    retention: KpiResume;
    churn: KpiResume;
  };
  segments: Segment[];
  activeClients: {
    filters: {
      status: string[];
      secureType: string[];
      locations: string[];
    };
    data: ActiveClient[];
  };
}

const DASHBOARD_API_URL = 'https://nortus.s3.us-east-1.amazonaws.com/mock-api-json/v2/dash.json';

/**
 * Busca os dados do dashboard
 */
export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await fetch(DASHBOARD_API_URL);

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do dashboard');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    throw error;
  }
};
