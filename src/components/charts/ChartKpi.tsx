'use client';

import { useState } from 'react';
import type { ApexOptions } from 'apexcharts';
import { ApexChart } from './ApexChart';

/**
 * @description Tipos de KPI disponíveis
 */
type KpiType = 'arpu' | 'conversao' | 'churn' | 'retencao';

/**
 * @description Dados mockados para cada KPI
 */
const kpiData = {
  arpu: {
    label: 'ARPU',
    data: [
      120000, 135000, 145000, 138000, 152000, 168000, 175000, 182000, 190000, 198000, 210000,
      220000,
    ],
  },
  conversao: {
    label: 'Conversão',
    data: [55, 58, 62, 65, 63, 68, 72, 70, 75, 78, 82, 85],
  },
  churn: {
    label: 'Churn',
    data: [4.5, 4.2, 3.8, 3.5, 3.2, 3.0, 2.8, 2.5, 2.3, 2.1, 1.8, 1.5],
  },
  retencao: {
    label: 'Retenção',
    data: [75, 78, 80, 82, 84, 86, 88, 89, 90, 91, 92, 93],
  },
};

/**
 * @description Componente de gráfico de KPIs
 * Exibe gráfico de área com dados de métricas
 */
export function ChartKpi() {
  const [selectedKpi, setSelectedKpi] = useState<KpiType>('arpu');

  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#22d3ee'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: '#22d3ee',
            opacity: 0.7,
          },
          {
            offset: 50,
            color: '#06b6d4',
            opacity: 0.4,
          },
          {
            offset: 100,
            color: '#0891b2',
            opacity: 0.2,
          },
        ],
      },
    },
    xaxis: {
      categories: months,
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '12px',
        },
        formatter: value => {
          if (selectedKpi === 'arpu') {
            return `R$ ${(value / 1000).toFixed(0)}k`;
          }
          if (selectedKpi === 'conversao' || selectedKpi === 'retencao') {
            return `${value.toFixed(0)}%`;
          }
          return value.toFixed(1);
        },
      },
    },
    grid: {
      borderColor: '#1e293b',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
        formatter: value => {
          if (selectedKpi === 'arpu') {
            return `R$ ${value.toLocaleString('pt-BR')}`;
          }
          if (selectedKpi === 'conversao' || selectedKpi === 'retencao') {
            return `${value.toFixed(1)}%`;
          }
          return `${value.toFixed(1)}%`;
        },
        title: {
          formatter: () => kpiData[selectedKpi].label,
        },
      },
      marker: {
        show: true,
      },
      style: {
        fontSize: '12px',
      },
    },
    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: kpiData[selectedKpi].label,
      data: kpiData[selectedKpi].data,
    },
  ];

  const buttons: Array<{ key: KpiType; label: string }> = [
    { key: 'retencao', label: 'Retenção' },
    { key: 'conversao', label: 'Conversão' },
    { key: 'churn', label: 'Churn' },
    { key: 'arpu', label: 'ARPU' },
  ];

  return (
    <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Evolução dos KPI&apos;s</h3>
        <div className="flex items-center space-x-2">
          {buttons.map(button => (
            <button
              key={button.key}
              onClick={() => setSelectedKpi(button.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedKpi === button.key
                  ? 'bg-cyan-500 text-white'
                  : 'bg-[#0f1629] text-gray-400 hover:bg-[#1e293b] hover:text-white'
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[350px]">
        <ApexChart options={options} series={series} type="area" height="100%" width="100%" />
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">Valor atual</p>
        <p className="text-2xl font-bold text-cyan-500">
          {selectedKpi === 'arpu' &&
            `R$ ${kpiData[selectedKpi].data[kpiData[selectedKpi].data.length - 1].toLocaleString('pt-BR')}`}
          {selectedKpi === 'conversao' &&
            `${kpiData[selectedKpi].data[kpiData[selectedKpi].data.length - 1]}%`}
          {selectedKpi === 'churn' &&
            `${kpiData[selectedKpi].data[kpiData[selectedKpi].data.length - 1]}%`}
          {selectedKpi === 'retencao' &&
            `${kpiData[selectedKpi].data[kpiData[selectedKpi].data.length - 1]}%`}
        </p>
      </div>
    </div>
  );
}
