interface BadgeProps {
  text: string;
  variant: 'red' | 'blue' | 'gray' | 'cyan' | 'yellow' | 'green';
}

const variantClasses = {
  red: 'bg-red-500/20 text-red-400 border-red-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30',
};

/**
 * @description Componente reutilizável para badges de status e prioridade
 */
export function Badge({ text, variant }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variantClasses[variant]}`}
    >
      {text}
    </span>
  );
}
