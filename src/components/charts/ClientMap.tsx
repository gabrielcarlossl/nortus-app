'use client';

import dynamic from 'next/dynamic';

/**
 * @description Wrapper para o componente de mapa com importação dinâmica
 * Necessário para evitar erros de SSR com Leaflet
 */
export const ClientMap = dynamic(
  () => import('./MapChart').then(mod => ({ default: mod.MapChart })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#0f1623] rounded-lg">
        <div className="animate-pulse text-gray-400">Carregando mapa...</div>
      </div>
    ),
  }
);
