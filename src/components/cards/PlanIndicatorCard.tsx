/**
 * @fileoverview Componente de Card de Indicador de Plano
 *
 * @description
 * Componente reutilizável para exibir cards de indicadores de performance dos planos.
 * Apresenta nome do plano, preço total, taxa de conversão e ROI com cores dinâmicas.
 *
 * @features
 * - Estado visual diferenciado para plano selecionado
 * - Cores dinâmicas baseadas nos valores dos indicadores
 * - Exibição de conversão e ROI com cores de performance
 * - Layout flexível e responsivo
 *
 * @color_rules
 * Conversão:
 * - Verde (#4ade80): ≥ 50% (alta performance)
 * - Amarelo (#fbbf24): 30-49% (performance média)
 * - Vermelho (#f87171): < 30% (baixa performance)
 *
 * ROI:
 * - Verde (#4ade80): ≥ 120% (alto retorno)
 * - Amarelo (#fbbf24): 80-119% (retorno médio)
 * - Vermelho (#f87171): < 80% (baixo retorno)
 *
 * @usage
 * ```tsx
 * <PlanIndicatorCard
 *   planName="Premium"
 *   totalPrice="R$ 503,57"
 *   conversion={25}
 *   roi={176}
 *   isSelected={selectedPlan === 'Premium'}
 * />
 * ```
 */

interface PlanIndicatorCardProps {
  /** Nome do plano */
  planName: string;
  /** Preço total formatado */
  totalPrice: string;
  /** Taxa de conversão em porcentagem */
  conversion: number;
  /** ROI em porcentagem */
  roi: number;
  /** Se o plano está selecionado */
  isSelected: boolean;
}

/**
 * Determina a cor do indicador baseado no valor e tipo
 */
const getIndicatorColor = (value: number, type: 'conversion' | 'roi'): string => {
  if (type === 'conversion') {
    if (value >= 50) return '#4ade80'; // Verde - Alta conversão
    if (value >= 30) return '#fbbf24'; // Amarelo - Conversão média
    return '#f87171'; // Vermelho - Baixa conversão
  }

  // type === 'roi'
  if (value >= 120) return '#4ade80'; // Verde - Alto ROI
  if (value >= 80) return '#fbbf24'; // Amarelo - ROI médio
  return '#f87171'; // Vermelho - Baixo ROI
};

export default function PlanIndicatorCard({
  planName,
  totalPrice,
  conversion,
  roi,
  isSelected,
}: PlanIndicatorCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border transition-colors ${
        isSelected ? 'border-blue-500 bg-[#1e2a3d]' : 'border-gray-700 bg-[#141c2a]'
      }`}
    >
      {/* Header - Nome e Preço */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white">{planName}</h3>
        <div className="text-right">
          <div className="text-xl font-bold text-white">{totalPrice}</div>
        </div>
      </div>

      {/* Indicadores - Conversão e ROI */}
      <div className="flex gap-4 text-sm">
        <div>
          <span className="text-gray-400">Conversão: </span>
          <span
            className="font-medium"
            style={{
              color: getIndicatorColor(conversion, 'conversion'),
            }}
          >
            {conversion}%
          </span>
        </div>

        <div>
          <span className="text-gray-400">ROI: </span>
          <span
            className="font-medium"
            style={{
              color: getIndicatorColor(roi, 'roi'),
            }}
          >
            {roi}%
          </span>
        </div>
      </div>
    </div>
  );
}
