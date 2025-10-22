/**
 * @fileoverview Componente de Slider com Range
 *
 * @description
 * Componente reutilizável para exibir sliders com range customizável.
 * Utilizado para ajustar valores como preço do veículo, idade do cliente, etc.
 * Apresenta valor atual, labels min/max e barra de progresso visual.
 *
 * @features
 * - Label customizável
 * - Formatação customizável do valor exibido
 * - Range configurável (min, max, step)
 * - Barra de progresso visual com gradiente
 * - Labels de valor mínimo e máximo
 * - Suporte a sufixo (ex: "anos", "km", etc)
 *
 * @usage
 * ```tsx
 * <RangeSlider
 *   label="Valor do veículo"
 *   value={50000}
 *   min={10000}
 *   max={500000}
 *   step={1000}
 *   formatValue={(val) => formatCurrency(val)}
 *   formatLabel={(val) => formatCurrency(val)}
 *   onChange={(val) => setValue(val)}
 * />
 * ```
 */

interface RangeSliderProps {
  /** Label exibida acima do slider */
  label: string;
  /** Valor atual do slider */
  value: number;
  /** Valor mínimo permitido */
  min: number;
  /** Valor máximo permitido */
  max: number;
  /** Incremento do slider */
  step: number;
  /** Função para formatar o valor exibido no topo */
  formatValue?: (value: number) => string;
  /** Função para formatar os labels min/max (opcional) */
  formatLabel?: (value: number) => string;
  /** Sufixo a ser exibido após o valor (ex: "anos") */
  suffix?: string;
  /** Callback executado ao mudar o valor */
  onChange: (value: number) => void;
}

export default function RangeSlider({
  label,
  value,
  min,
  max,
  step,
  formatValue,
  formatLabel,
  suffix = '',
  onChange,
}: RangeSliderProps) {
  // Calcula a porcentagem do progresso
  const percentage = ((value - min) / (max - min)) * 100;

  // Formata o valor exibido
  const displayValue = formatValue ? formatValue(value) : `${value}${suffix ? ` ${suffix}` : ''}`;

  // Formata os labels min/max
  const displayMin = formatLabel ? formatLabel(min) : `${min}${suffix ? ` ${suffix}` : ''}`;
  const displayMax = formatLabel ? formatLabel(max) : `${max}${suffix ? ` ${suffix}` : ''}`;

  return (
    <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <label className="text-white font-medium">{label}</label>
        <span className="text-white font-semibold">{displayValue}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #374151 ${percentage}%, #374151 100%)`,
        }}
      />

      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-400">{displayMin}</span>
        <span className="text-xs text-gray-400">{displayMax}</span>
      </div>
    </div>
  );
}
