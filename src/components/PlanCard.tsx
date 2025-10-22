/**
 * @fileoverview Componente de Card de Plano
 *
 * @description
 * Componente reutilizável para exibir cards de planos de seguro.
 * Utilizado na página do simulador para mostrar as opções de planos disponíveis.
 * Apresenta estado visual diferenciado para planos selecionados e recomendados.
 *
 * @features
 * - Estado visual diferenciado para plano selecionado (borda azul)
 * - Badge "Recomendado" opcional
 * - Animação de hover com scale
 * - Suporta preço formatado ou número
 * - Label personalizável do período (padrão: "Por mês")
 * - Totalmente responsivo
 *
 * @props
 * - title: Nome do plano (ex: "Básico", "Intermediário", "Premium")
 * - price: Valor do plano já formatado (string) ou número
 * - priceLabel: Label do período (opcional, padrão: "Por mês")
 * - isRecommended: Se true, exibe badge "Recomendado" (opcional, padrão: false)
 * - isSelected: Indica se o plano está selecionado (obrigatório)
 * - onClick: Função callback executada ao clicar no card (obrigatório)
 *
 */

interface PlanCardProps {
  /** Nome do plano a ser exibido */
  title: string;
  /** Valor do plano (formatado como string ou número) */
  price: string | number;
  /** Label do período de pagamento (ex: "Por mês", "Por ano") */
  priceLabel?: string;
  /** Se true, exibe badge "Recomendado" */
  isRecommended?: boolean;
  /** Indica se este plano está selecionado */
  isSelected: boolean;
  /** Callback executado ao clicar no card */
  onClick: () => void;
}

export default function PlanCard({
  title,
  price,
  priceLabel = 'Por mês',
  isRecommended = false,
  isSelected,
  onClick,
}: PlanCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-lg border-2 transition-all cursor-pointer hover:scale-105 ${
        isSelected
          ? 'border-blue-500 bg-[#1e2a3d]'
          : 'border-gray-700 bg-[#141c2a] hover:border-gray-600'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-gray-300">{title}</span>
        {isRecommended && (
          <span className="px-2 py-1 text-xs font-medium bg-cyan-500 text-white rounded">
            Recomendado
          </span>
        )}
      </div>

      <div className="text-left">
        <div className="text-3xl font-bold text-white mb-1">
          {typeof price === 'number' ? `R$ ${price.toFixed(2)}` : price}
        </div>
        <div className="text-sm text-gray-400">{priceLabel}</div>
      </div>
    </button>
  );
}
