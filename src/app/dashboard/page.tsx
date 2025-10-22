'use client';

import { useAppSelector } from '@/store/hooks';
import { TrendingUp, Users, Activity, DollarSign } from 'lucide-react';
import { ChartKpi } from '@/components/charts/ChartKpi';

/**
 * @description Página principal do Dashboard
 * Exibe KPIs e métricas principais
 */
export default function DashboardPage() {
  const { user } = useAppSelector(state => state.auth);

  const stats = [
    {
      title: 'ARPU',
      value: 'R$ 320,50',
      change: '+12% no período',
      trend: 'up',
      icon: <DollarSign className="text-blue-500" size={24} />,
    },
    {
      title: 'Conversão IA',
      value: '68,5%',
      change: '+8.2% no período',
      trend: 'up',
      icon: <TrendingUp className="text-green-500" size={24} />,
    },
    {
      title: 'Retenção',
      value: '85%',
      change: '+2.9% no período',
      trend: 'up',
      icon: <Users className="text-cyan-500" size={24} />,
    },
    {
      title: 'Taxa de Churn',
      value: '3,2%',
      change: '-1.5% no período',
      trend: 'down',
      icon: <Activity className="text-red-500" size={24} />,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Boas-vindas */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Bem-vindo, {user?.username || 'Usuário'}! 👋
        </h1>
        <p className="text-gray-400">
          Aqui está um resumo das métricas principais da sua plataforma.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#1a2332] rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
            <p className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Gráfico de KPIs */}
      <ChartKpi />

      {/* Placeholder para outros gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">Mapa de clientes por região</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <p>Mapa será implementado em breve</p>
          </div>
        </div>

        <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">Mapa de Impacto por Segmento</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <p>Gráfico de donut será implementado em breve</p>
          </div>
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">Atividades Recentes</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 py-3 border-b border-gray-800">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <Users size={20} />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Novo cliente cadastrado</p>
              <p className="text-sm text-gray-400">Ricardo Leite se cadastrou na plataforma</p>
            </div>
            <span className="text-xs text-gray-500">Há 2 horas</span>
          </div>
          <div className="flex items-center space-x-4 py-3 border-b border-gray-800">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
              <TrendingUp size={20} />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Meta de conversão atingida</p>
              <p className="text-sm text-gray-400">Você atingiu 100% da meta mensal</p>
            </div>
            <span className="text-xs text-gray-500">Há 5 horas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
