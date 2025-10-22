'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { TrendingUp, Users, Activity, DollarSign } from 'lucide-react';
import { ChartKpi } from '@/components/charts/ChartKpi';
import { ChartSegment } from '@/components/charts/ChartSegment';
import { ClientMap } from '@/components/charts/ClientMap';
import { ActivityItem } from '@/components/ActivityItem';
import { KpiCard } from '@/components/KpiCard';
import { getDashboardData, type DashboardData } from '@/services/dashboard.service';

/**
 * @description Página principal do Dashboard
 * Exibe KPIs e métricas principais
 */
export default function DashboardPage() {
  const { user } = useAppSelector(state => state.auth);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = dashboardData
    ? [
        {
          title: 'ARPU',
          value: `R$ ${dashboardData.kpisResume.arpu.valor.toFixed(2)}`,
          change: `${dashboardData.kpisResume.arpu.variacao > 0 ? '+' : ''}${dashboardData.kpisResume.arpu.variacao}% no período`,
          trend: (dashboardData.kpisResume.arpu.variacao > 0 ? 'up' : 'down') as 'up' | 'down',
          icon: <DollarSign className="text-blue-500" size={24} />,
        },
        {
          title: 'Conversão IA',
          value: `${dashboardData.kpisResume.conversion.valor}%`,
          change: `${dashboardData.kpisResume.conversion.variacao > 0 ? '+' : ''}${dashboardData.kpisResume.conversion.variacao}% no período`,
          trend: (dashboardData.kpisResume.conversion.variacao > 0 ? 'up' : 'down') as
            | 'up'
            | 'down',
          icon: <TrendingUp className="text-green-500" size={24} />,
        },
        {
          title: 'Retenção',
          value: `${dashboardData.kpisResume.retention.valor}%`,
          change: `${dashboardData.kpisResume.retention.variacao > 0 ? '+' : ''}${dashboardData.kpisResume.retention.variacao}% no período`,
          trend: (dashboardData.kpisResume.retention.variacao > 0 ? 'up' : 'down') as 'up' | 'down',
          icon: <Users className="text-cyan-500" size={24} />,
        },
        {
          title: 'Taxa de Churn',
          value: `${dashboardData.kpisResume.churn.valor}%`,
          change: `${dashboardData.kpisResume.churn.variacao > 0 ? '+' : ''}${dashboardData.kpisResume.churn.variacao}% no período`,
          trend: (dashboardData.kpisResume.churn.variacao < 0 ? 'up' : 'down') as 'up' | 'down',
          icon: <Activity className="text-red-500" size={24} />,
        },
      ]
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Boas-vindas */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Bem-vindo, {user?.username || 'Usuário'}!
        </h1>
        <p className="text-gray-400">
          Aqui está um resumo das métricas principais da sua plataforma.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <KpiCard
                key={index}
                title=""
                value=""
                change=""
                trend="up"
                icon={<></>}
                loading={true}
              />
            ))
          : stats.map((stat, index) => (
              <KpiCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                trend={stat.trend}
                icon={stat.icon}
              />
            ))}
      </div>

      {/* Gráfico de KPIs */}
      <ChartKpi />

      {/* Gráficos secundários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">Mapa de clientes por região</h3>
          <div className="h-[500px]">
            <ClientMap />
          </div>
        </div>

        {/* Gráfico de Segmentos */}
        <ChartSegment />
      </div>

      {/* Atividades Recentes */}
      <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">Atividades Recentes</h3>
        <div className="space-y-4">
          <ActivityItem
            icon={Users}
            iconColor="#2563eb"
            title="Novo cliente cadastrado"
            description="Ricardo Leite se cadastrou na plataforma"
            time="Há 2 horas"
          />
          <ActivityItem
            icon={TrendingUp}
            iconColor="#16a34a"
            title="Meta de conversão atingida"
            description="Você atingiu 100% da meta mensal"
            time="Há 5 horas"
          />
          <ActivityItem
            icon={Activity}
            iconColor="#ea580c"
            title="Novo ticket criado"
            description="Cliente solicitou suporte técnico"
            time="Há 1 dia"
          />
        </div>
      </div>
    </div>
  );
}
