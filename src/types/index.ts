/**
 * @description Tipos globais da aplicação
 */

export interface User {
  username: string;
  email?: string;
}

export interface AuthResponse {
  data: {
    accessToken: string;
    username: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * @description Tipos para o mapa de clientes
 */
export interface MapLocation {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number]; // [longitude, latitude]
  category: string;
  address?: string;
  icon?: string;
  color?: string;
}

export interface MapData {
  center: [number, number]; // [longitude, latitude]
  zoom: number;
  locations: MapLocation[];
}

/**
 * @description Tipos para o simulador de planos
 */
export interface PlanIndicator {
  name: string;
  conversion: number;
  roi: number;
  value: number;
}

export interface PlanData {
  includedBenefits: string[];
  plansIndicators: PlanIndicator[];
}

export interface AdditionalCoverage {
  id: string;
  name: string;
  price: number;
  enabled: boolean;
}

/**
 * @description Tipos para a Visão 360 do Cliente
 */
export interface ClientProduct {
  name: string;
  value: number;
  status: 'Ativo' | 'Inativo';
}

export interface CapturedPhrase {
  phrase: string;
  serviceDate: string;
}

export interface AppAction {
  action: string;
  pageTime?: string;
  accessed: string;
}

export interface SmartClassification {
  segment: string;
  lifeTimeValue: number;
  churnProbability: number;
  expansionScore: {
    level: string;
    value: number;
  };
  retetionScore: {
    level: string;
    value: number;
  };
}

export interface IASuggestion {
  offer: string;
  value: number;
  conversionProbability: number;
  reasonsWhy: string[];
}

export interface Client360Data {
  client: {
    name: string;
    clientType: string;
  };
  produtos: ClientProduct[];
  profile: string[];
  capturedPhrases: CapturedPhrase[];
  appActions: AppAction[];
  smartClassification: SmartClassification;
  sugestionsIA: {
    NBO: IASuggestion;
    NBA: IASuggestion;
    NBX: IASuggestion;
  };
}
