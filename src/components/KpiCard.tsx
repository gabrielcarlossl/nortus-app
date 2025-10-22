import { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: ReactNode;
  loading?: boolean;
}

/**
 * @description Componente reutilizável para card de KPI
 */
export function KpiCard({ title, value, change, trend, icon, loading = false }: KpiCardProps) {
  if (loading) {
    return (
      <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
        <div className="h-8 bg-gray-700 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-28"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white mb-2">{value}</p>
      <p className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
    </div>
  );
}
