import { LucideIcon } from 'lucide-react';

interface TicketSummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: 'cyan' | 'yellow' | 'green' | 'blue' | 'red' | 'purple';
}

const iconColorClasses = {
  cyan: 'bg-cyan-500/10 text-cyan-400',
  yellow: 'bg-yellow-500/10 text-yellow-400',
  green: 'bg-green-500/10 text-green-400',
  blue: 'bg-blue-500/10 text-blue-400',
  red: 'bg-red-500/10 text-red-400',
  purple: 'bg-purple-500/10 text-purple-400',
};

/**
 * @description Componente reutilizável para cards de resumo de tickets
 */
export function TicketSummaryCard({ title, value, icon: Icon, iconColor }: TicketSummaryCardProps) {
  return (
    <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div className={`p-2 rounded-lg ${iconColorClasses[iconColor]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
