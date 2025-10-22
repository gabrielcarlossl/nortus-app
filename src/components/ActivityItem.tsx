import { LucideIcon } from 'lucide-react';

interface ActivityItemProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}

/**
 * @description Componente reutilizável para item de atividade recente
 */
export function ActivityItem({
  icon: Icon,
  iconColor,
  title,
  description,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-800 last:border-b-0">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: iconColor }}
      >
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="text-white font-medium">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
}
