'use client';

import { useState } from 'react';
import type { ApexOptions } from 'apexcharts';
import { ApexChart } from './ApexChart';

/**
 * @description Tipos de segmentos disponíveis
 */
type SegmentType = 'automovel' | 'residencial' | 'viagem' | 'combo' | 'profissional';

/**
 * @description Dados mockados para cada segmento
 */
const segmentData: Record<SegmentType, { label: string; value: number; color: string }> = {
  automovel: {
    label: 'Automóvel',
    value: 35,
    color: '#3b82f6',
  },
  residencial: {
    label: 'Residencial',
    value: 25,
    color: '#22d3ee',
  },
  viagem: {
    label: 'Viagem',
    value: 20,
    color: '#06b6d4',
  },
  combo: {
    label: 'Combo resi + auto',
    value: 15,
    color: '#0891b2',
  },
  profissional: {
    label: 'Profissional',
    value: 5,
    color: '#0e7490',
  },
};

/**
 * @description Componente de gráfico de impacto por segmento
 * Exibe gráfico de donut com segmentos selecionáveis
 */
export function ChartSegment() {
  const [selectedSegments, setSelectedSegments] = useState<SegmentType[]>([
    'automovel',
    'residencial',
    'viagem',
  ]);

  /**
   * @description Toggle de segmento
   */
  const toggleSegment = (segment: SegmentType) => {
    setSelectedSegments(prev => {
      if (prev.includes(segment)) {
        // Remove se já estiver selecionado (mínimo 1 segmento)
        if (prev.length > 1) {
          return prev.filter(s => s !== segment);
        }
        return prev;
      } else {
        // Adiciona se não estiver selecionado
        return [...prev, segment];
      }
    });
  };

  /**
   * @description Gera dados do gráfico baseado nos segmentos selecionados
   */
  const getChartData = () => {
    const labels: string[] = [];
    const series: number[] = [];
    const colors: string[] = [];

    selectedSegments.forEach(segment => {
      const data = segmentData[segment];
      labels.push(data.label);
      series.push(data.value);
      colors.push(data.color);
    });

    return { labels, series, colors };
  };

  const chartData = getChartData();

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      height: 300,
      animations: {
        enabled: true,
        speed: 800,
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    labels: chartData.labels,
    colors: chartData.colors,
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'transparent',
          labels: {
            show: false,
          },
        },
        expandOnClick: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
        formatter: value => `${value}%`,
      },
      style: {
        fontSize: '12px',
      },
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
  };

  const segments: Array<{ key: SegmentType; label: string; color: string }> = [
    { key: 'automovel', label: 'Automóvel', color: '#3b82f6' },
    { key: 'residencial', label: 'Residencial', color: '#22d3ee' },
    { key: 'viagem', label: 'Viagem', color: '#06b6d4' },
    { key: 'combo', label: 'Combo resi + auto', color: '#0891b2' },
    { key: 'profissional', label: 'Profissional', color: '#0e7490' },
  ];

  return (
    <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Mapa de impacto por segmento</h3>
      </div>
      <div className="flex items-center justify-center mb-6">
        <div className="w-64 h-64">
          <ApexChart options={options} series={chartData.series} type="donut" height="100%" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {segments.map(segment => {
          const isSelected = selectedSegments.includes(segment.key);
          return (
            <button
              key={segment.key}
              onClick={() => toggleSegment(segment.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-[#0f1629] text-white border border-gray-700'
                  : 'bg-transparent text-gray-500 border border-gray-800 hover:border-gray-600'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-opacity ${
                  isSelected ? 'opacity-100' : 'opacity-40'
                }`}
                style={{ backgroundColor: segment.color }}
              />
              <span>{segment.label}</span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200">
          Analisar segmentos
        </button>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-4">
          {selectedSegments.map(segment => {
            const data = segmentData[segment];
            return (
              <div key={segment} className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: data.color }}>
                  {data.value}%
                </div>
                <div className="text-sm text-gray-400">{data.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
