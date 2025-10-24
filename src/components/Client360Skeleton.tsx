/**
 * @fileoverview Componente de Loading Skeleton para Visão 360 do Cliente
 *
 * @description
 * Skeleton screen que replica o layout da página de Visão 360,
 * exibido durante o carregamento dos dados da API.
 *
 * @features
 * - Estrutura de 3 colunas (3-6-3)
 * - Animações de pulsação suaves
 * - Réplica fiel do layout real
 * - Cards, listas e indicadores simulados
 *
 */
export default function Client360Skeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column Skeleton */}
        <div className="xl:col-span-3 space-y-6">
          {/* Client Card Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="flex flex-col items-center justify-between mb-6 gap-2">
              <div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-6 animate-pulse"></div>
            </div>
            <div className="flex space-y-3 justify-between">
              <div className="h-10 bg-gray-700 rounded animate-pulse w-1/6"></div>
              <div className="h-10 bg-gray-700 rounded animate-pulse w-1/6"></div>
              <div className="h-10 bg-gray-700 rounded animate-pulse w-1/6"></div>
            </div>
          </div>

          {/* Products Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-3 rounded-lg bg-[#141c2a]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded w-3/4 mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-7 w-24 bg-gray-700 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Phrases Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="p-3 rounded-lg bg-[#141c2a]">
                  <div className="h-4 bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="space-y-1">
                  <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column Skeleton */}
        <div className="xl:col-span-6 space-y-6">
          {/* Suggestions Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 w-20 bg-gray-700 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="mb-6">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-700 rounded w-full mb-4 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="h-3 bg-gray-700 rounded w-2/3 mb-1 animate-pulse"></div>
                  <div className="h-8 bg-gray-700 rounded w-full animate-pulse"></div>
                </div>
                <div>
                  <div className="h-3 bg-gray-700 rounded w-2/3 mb-1 animate-pulse"></div>
                  <div className="h-8 bg-gray-700 rounded w-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-700 animate-pulse shrink-0"></div>
                  <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          {/* Classification Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-1/2 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-700 animate-pulse mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-700 rounded w-24 mx-auto animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-700 rounded w-full animate-pulse"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-700 rounded w-full animate-pulse"></div>
              </div>
              <div className="col-span-2">
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-2 bg-gray-700 rounded-full animate-pulse"></div>
              </div>
              <div className="col-span-2">
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-2 bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="xl:col-span-3 space-y-6">
          {/* Card 1 Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-6 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-1 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded w-2/3 mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          {/* Card 2 Skeleton */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-6 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-1 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded w-2/3 mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
