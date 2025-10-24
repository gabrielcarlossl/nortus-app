/**
 * @fileoverview Componente de Loading Skeleton para Simulador de Planos
 *
 * @description
 * Skeleton screen que replica o layout da página do Simulador de Planos,
 * exibido durante o carregamento dos dados da API.
 *
 * @features
 * - Estrutura de 2 colunas (8-4)
 * - Cards de planos com animação
 * - Sliders simulados
 * - Coberturas adicionais
 * - Painel de benefícios e indicadores
 */
export default function SimulatorSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Skeleton */}
      <div>
        <div className="h-9 bg-gray-700 rounded w-64 mb-2 animate-pulse"></div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - Plan Configuration */}
        <div className="xl:col-span-2 space-y-6">
          {/* Plans Selection Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-48 mb-6 animate-pulse"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-6 rounded-lg border-2 border-gray-700 bg-[#141c2a]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
                    {i === 3 && <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>}
                  </div>

                  <div>
                    <div className="h-9 bg-gray-700 rounded w-32 mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Value Slider Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="h-5 bg-gray-700 rounded w-32 animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded w-28 animate-pulse"></div>
            </div>

            <div className="h-2 bg-gray-700 rounded-lg animate-pulse mb-2"></div>

            <div className="flex justify-between">
              <div className="h-3 bg-gray-700 rounded w-20 animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Client Age Slider Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="h-5 bg-gray-700 rounded w-36 animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>

            <div className="h-2 bg-gray-700 rounded-lg animate-pulse mb-2"></div>

            <div className="flex justify-between">
              <div className="h-3 bg-gray-700 rounded w-16 animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
          </div>

          {/* Additional Coverages Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-48 mb-6 animate-pulse"></div>

            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#141c2a]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-gray-700 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-48 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Summary */}
        <div className="space-y-6">
          {/* Included Benefits Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-40 mb-6 animate-pulse"></div>

            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#141c2a]">
                  <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse"></div>
                  <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-32 mb-6 animate-pulse"></div>

            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 rounded-lg border border-gray-700 bg-[#141c2a]">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-5 bg-gray-700 rounded w-24 animate-pulse"></div>
                    <div className="h-6 bg-gray-700 rounded w-28 animate-pulse"></div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
