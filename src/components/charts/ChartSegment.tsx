'use client';

import { useState, useEffect } from 'react';
import type { ApexOptions } from 'apexcharts';
import { ApexChart } from './ApexChart';
import { getDashboardData, type DashboardData } from '@/services/dashboard.service';

/**
 * @description Componente de gráfico de impacto por segmento
 * Exibe gráfico de donut com segmentos selecionáveis
 */
export function ChartSegment() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
        // Seleciona os 3 primeiros segmentos por padrão
        if (data.segments.length > 0) {
          setSelectedSegments(data.segments.slice(0, 3).map(s => s.nome));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !dashboardData) {
    return (
      <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-48 mb-4"></div>
          <div className="h-64 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const colors = ['#3b82f6', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490'];

  /**
   * @description Toggle de segmento
   */
  const toggleSegment = (segmentName: string) => {
    setSelectedSegments(prev => {
      if (prev.includes(segmentName)) {
        // Remove se já estiver selecionado (mínimo 1 segmento)
        return prev.length > 1 ? prev.filter(s => s !== segmentName) : prev;
      } else {
        // Adiciona se não estiver selecionado
        return [...prev, segmentName];
      }
    });
  };

  /**
   * @description Gera dados do gráfico baseado nos segmentos selecionados
   */
  const getChartData = () => {
    const labels: string[] = [];
    const series: number[] = [];
    const chartColors: string[] = [];

    selectedSegments.forEach(segmentName => {
      const segment = dashboardData.segments.find(s => s.nome === segmentName);
      if (segment) {
        labels.push(segment.nome);
        series.push(segment.valor);
        const index = dashboardData.segments.findIndex(s => s.nome === segmentName);
        chartColors.push(colors[index % colors.length]);
      }
    });

    return { labels, series, colors: chartColors };
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
        {dashboardData.segments.map((segment, index) => {
          const isSelected = selectedSegments.includes(segment.nome);
          const segmentColor = colors[index % colors.length];
          return (
            <button
              key={segment.nome}
              onClick={() => toggleSegment(segment.nome)}
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
                style={{ backgroundColor: segmentColor }}
              />
              <span>{segment.nome}</span>
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
          {selectedSegments.map(segmentName => {
            const segment = dashboardData.segments.find(s => s.nome === segmentName);
            const index = dashboardData.segments.findIndex(s => s.nome === segmentName);
            const segmentColor = colors[index % colors.length];

            if (!segment) return null;

            return (
              <div key={segmentName} className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: segmentColor }}>
                  {segment.valor}%
                </div>
                <div className="text-sm text-gray-400">{segment.nome}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
