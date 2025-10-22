'use client';

import dynamic from 'next/dynamic';

/**
 * @description Componente ApexCharts com importação dinâmica
 * Evita problemas de SSR e adiciona loading state
 */
export const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Carregando gráfico...</div>
    </div>
  ),
});
