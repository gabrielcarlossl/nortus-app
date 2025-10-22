'use client';

import { useEffect, useState } from 'react';
import { getPlanData } from '@/services/plan.service';
import { PlanData, PlanIndicator, AdditionalCoverage } from '@/types';
import PlanCard from '@/components/PlanCard';
import RangeSlider from '@/components/RangeSlider';
import PlanIndicatorCard from '@/components/PlanIndicatorCard';

/**
 * @fileoverview Componente da página do Simulador de Planos de Seguro
 *
 * @description
 * Este componente implementa um simulador interativo de planos de seguro automotivo
 * que permite aos usuários personalizar e visualizar em tempo real o custo de
 * diferentes planos baseados em múltiplos fatores de risco.
 *
 * @features
 * - Seleção entre três tipos de planos: Básico, Intermediário e Premium
 * - Ajuste dinâmico de preço baseado no valor do veículo (R$ 10.000 - R$ 500.000)
 * - Ajuste dinâmico de preço baseado na idade do cliente (18 - 90 anos)
 * - Coberturas adicionais opcionais com preços ajustados proporcionalmente
 * - Exibição de indicadores de performance (Conversão e ROI) para cada plano
 * - Cálculo de preço total em tempo real
 *
 * @calculation_logic
 *
 * 1. MULTIPLICADOR DO VEÍCULO
 *    - Valor base de referência: R$ 50.000
 *    - Fórmula: multiplicadorVeículo = valorVeículo / 50000
 *    - Exemplo: Veículo de R$ 100.000 → multiplicador = 2.0 (dobro do preço)
 *    - Exemplo: Veículo de R$ 25.000 → multiplicador = 0.5 (metade do preço)
 *
 * 2. MULTIPLICADOR DA IDADE
 *    - Idade base de referência: 28 anos (multiplicador = 1.0)
 *    - Para clientes JOVENS (18-27 anos):
 *      • Fórmula: 0.85 + ((idade - 18) / (28 - 18)) × 0.15
 *      • Range: 0.85 (18 anos) até 1.0 (28 anos)
 *      • Lógica: Clientes mais jovens recebem desconto progressivo (até 15%)
 *      • Exemplo: Cliente de 23 anos → multiplicador ≈ 0.925 (7.5% desconto)
 *
 *    - Para clientes MAIS VELHOS (29-90 anos):
 *      • Fórmula: 1.0 + ((idade - 28) / (90 - 28)) × 0.5
 *      • Range: 1.0 (28 anos) até 1.5 (90 anos)
 *      • Lógica: Clientes mais velhos pagam acréscimo progressivo (até 50%)
 *      • Exemplo: Cliente de 50 anos → multiplicador ≈ 1.177 (17.7% acréscimo)
 *      • Exemplo: Cliente de 70 anos → multiplicador ≈ 1.339 (33.9% acréscimo)
 *
 * 3. PREÇO DO PLANO AJUSTADO
 *    - Fórmula: preçoPlano = preçoBase × multiplicadorVeículo × multiplicadorIdade
 *    - Exemplo completo:
 *      • Plano Básico (R$ 89,90) + Veículo R$ 100.000 + Cliente 50 anos
 *      • preçoPlano = 89.90 × 2.0 × 1.177 ≈ R$ 211,61
 *
 * 4. PREÇO DA COBERTURA ADICIONAL
 *    - Fórmula: preçoCobertura = preçoBase × multiplicadorVeículo
 *    - Nota: Coberturas são afetadas APENAS pelo valor do veículo, não pela idade
 *    - Lógica: Custo de reparos/reposição aumenta com veículos mais caros
 *    - Exemplo:
 *      • Cobertura contra roubo (R$ 25,00) + Veículo R$ 100.000
 *      • preçoCobertura = 25.00 × 2.0 = R$ 50,00
 *
 * 5. PREÇO TOTAL FINAL
 *    - Fórmula: total = preçoPlano + Σ(coberturasHabilitadas)
 *    - Exemplo completo:
 *      • Plano Intermediário (R$ 145,90 base)
 *      • Veículo: R$ 100.000 (multiplicador 2.0)
 *      • Idade: 50 anos (multiplicador 1.177)
 *      • Coberturas habilitadas: Roubo (R$ 25), Colisão (R$ 35), Incêndio (R$ 20)
 *      • Cálculo:
 *        - Preço plano = 145.90 × 2.0 × 1.177 ≈ R$ 343,57
 *        - Cobertura roubo = 25.00 × 2.0 = R$ 50,00
 *        - Cobertura colisão = 35.00 × 2.0 = R$ 70,00
 *        - Cobertura incêndio = 20.00 × 2.0 = R$ 40,00
 *        - TOTAL = 343.57 + 50.00 + 70.00 + 40.00 = R$ 503,57
 *
 * @api_endpoint
 * - URL: https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2/plan.json
 * - Retorna: { includedBenefits: string[], plansIndicators: PlanIndicator[] }
 *
 * @performance_indicators
 * - Conversão (%): Taxa de conversão esperada para cada plano
 * - ROI (%): Retorno sobre investimento esperado para cada plano
 * - Cores dinâmicas baseadas nos valores:
 *   • Verde (#4ade80): Alta performance (Conversão ≥50%, ROI ≥120%)
 *   • Amarelo (#fbbf24): Performance média (Conversão 30-49%, ROI 80-119%)
 *   • Vermelho (#f87171): Performance baixa (Conversão <30%, ROI <80%)
 *
 * @state_management
 * - planData: Dados dos planos carregados da API
 * - loading: Estado de carregamento dos dados
 * - selectedPlan: Nome do plano atualmente selecionado
 * - vehicleValue: Valor do veículo (R$ 10.000 - R$ 500.000)
 * - clientAge: Idade do cliente (18 - 90 anos)
 * - additionalCoverages: Array de coberturas adicionais com estado habilitado/desabilitado
 */
export default function SimulatorPage() {
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string>('Intermediário');
  const [vehicleValue, setVehicleValue] = useState(50000);
  const [clientAge, setClientAge] = useState(28);
  const [additionalCoverages, setAdditionalCoverages] = useState<AdditionalCoverage[]>([
    { id: '1', name: 'Cobertura contra roubo e furto', price: 25.0, enabled: true },
    { id: '2', name: 'Danos por colisão', price: 35.0, enabled: true },
    { id: '3', name: 'Cobertura contra incêndio', price: 20.0, enabled: true },
    { id: '4', name: 'Fenômenos naturais (granizo, enchente)', price: 30.0, enabled: false },
  ]);

  useEffect(() => {
    async function loadPlanData() {
      try {
        const data = await getPlanData();
        setPlanData(data);
      } catch (error) {
        console.error('Erro ao carregar dados dos planos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPlanData();
  }, []);

  const toggleCoverage = (id: string) => {
    setAdditionalCoverages(prev =>
      prev.map(coverage =>
        coverage.id === id ? { ...coverage, enabled: !coverage.enabled } : coverage
      )
    );
  };

  /**
   * Calcula o multiplicador baseado no valor do veículo
   *
   * @returns {number} Multiplicador de preço (valor do veículo / valor base)
   *
   * @example
   * // Veículo de R$ 100.000
   * getVehicleMultiplier() // returns 2.0
   *
   * @example
   * // Veículo de R$ 25.000
   * getVehicleMultiplier() // returns 0.5
   */
  const getVehicleMultiplier = () => {
    const baseValue = 50000; // Valor base de referência (R$ 50.000)
    return vehicleValue / baseValue;
  };

  /**
   * Calcula o multiplicador baseado na idade do cliente
   * Aplica diferentes fórmulas para clientes jovens e mais velhos
   *
   * @returns {number} Multiplicador de preço baseado no fator de risco da idade
   *
   * @logic
   * - Idade base: 28 anos (multiplicador = 1.0, sem ajuste)
   * - Clientes jovens (18-27): Desconto progressivo até 15%
   * - Clientes mais velhos (29-90): Acréscimo progressivo até 50%
   *
   * @example
   * // Cliente de 18 anos (desconto máximo)
   * getAgeMultiplier() // returns 0.85 (15% desconto)
   *
   * @example
   * // Cliente de 28 anos (idade base)
   * getAgeMultiplier() // returns 1.0 (sem ajuste)
   *
   * @example
   * // Cliente de 50 anos
   * getAgeMultiplier() // returns ~1.177 (17.7% acréscimo)
   *
   * @example
   * // Cliente de 90 anos (acréscimo máximo)
   * getAgeMultiplier() // returns 1.5 (50% acréscimo)
   */
  const getAgeMultiplier = () => {
    const baseAge = 28;

    if (clientAge < baseAge) {
      // Clientes jovens: interpolação linear de 0.85 a 1.0
      // Fórmula: desconto_minimo + (progresso_até_base × range_desconto)
      return 0.85 + ((clientAge - 18) / (baseAge - 18)) * 0.15;
    } else {
      // Clientes mais velhos: interpolação linear de 1.0 a 1.5
      // Fórmula: base + (progresso_até_max × range_acrescimo)
      return 1.0 + ((clientAge - baseAge) / (90 - baseAge)) * 0.5;
    }
  };

  /**
   * Calcula o preço ajustado do plano aplicando ambos os multiplicadores
   *
   * @param {PlanIndicator} basePlan - Dados do plano base com preço original
   * @returns {number} Preço final ajustado do plano
   *
   * @formula preço_ajustado = preço_base × multiplicador_veiculo × multiplicador_idade
   *
   * @example
   * // Plano Básico (R$ 89,90) + Veículo R$ 100.000 + Cliente 50 anos
   * getAdjustedPlanPrice(basicPlan)
   * // 89.90 × 2.0 × 1.177 = R$ 211,61
   */
  const getAdjustedPlanPrice = (basePlan: PlanIndicator) => {
    const vehicleMultiplier = getVehicleMultiplier();
    const ageMultiplier = getAgeMultiplier();
    return basePlan.value * vehicleMultiplier * ageMultiplier;
  };

  /**
   * Calcula o preço ajustado de uma cobertura adicional
   * Nota: Coberturas são afetadas APENAS pelo valor do veículo
   *
   * @param {number} basePrice - Preço base da cobertura
   * @returns {number} Preço ajustado da cobertura
   *
   * @rationale
   * Coberturas não consideram idade porque o custo de reparo/reposição
   * depende apenas do valor do veículo, não do perfil do motorista
   *
   * @formula preço_ajustado = preço_base × multiplicador_veiculo
   *
   * @example
   * // Cobertura contra roubo (R$ 25,00) + Veículo R$ 100.000
   * getAdjustedCoveragePrice(25.00)
   * // 25.00 × 2.0 = R$ 50,00
   */
  const getAdjustedCoveragePrice = (basePrice: number) => {
    const vehicleMultiplier = getVehicleMultiplier();
    return basePrice * vehicleMultiplier;
  };

  /**
   * Calcula o preço total final incluindo plano e coberturas habilitadas
   *
   * @param {PlanIndicator} basePlan - Dados do plano selecionado
   * @returns {number} Valor total do seguro por mês
   *
   * @formula total = preço_plano_ajustado + Σ(coberturas_habilitadas_ajustadas)
   *
   * @example
   * // Plano Intermediário (R$ 145,90) + Veículo R$ 100.000 + Cliente 50 anos
   * // + Coberturas: Roubo (R$ 25), Colisão (R$ 35), Incêndio (R$ 20)
   * calculateTotalPrice(intermediatePlan)
   * // Plano: 145.90 × 2.0 × 1.177 = R$ 343,57
   * // Roubo: 25.00 × 2.0 = R$ 50,00
   * // Colisão: 35.00 × 2.0 = R$ 70,00
   * // Incêndio: 20.00 × 2.0 = R$ 40,00
   * // TOTAL = R$ 503,57
   */
  const calculateTotalPrice = (basePlan: PlanIndicator) => {
    const adjustedPlanPrice = getAdjustedPlanPrice(basePlan);
    const additionalTotal = additionalCoverages
      .filter(c => c.enabled)
      .reduce((sum, c) => sum + getAdjustedCoveragePrice(c.price), 0);
    return adjustedPlanPrice + additionalTotal;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatVehicleValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  /**
   * Retorna os benefícios que devem ser exibidos como inclusos
   * baseado no plano selecionado
   *
   * @returns {string[]} Array de benefícios inclusos no plano atual
   *
   * @logic
   * - Básico: Apenas "Tudo do básico"
   * - Intermediário: "Tudo do básico" + "Carro reserva"
   * - Premium: Todos os benefícios disponíveis
   */
  const getIncludedBenefitsForPlan = (): string[] => {
    if (!planData) return [];

    const allBenefits = planData.includedBenefits;

    switch (selectedPlan) {
      case 'Básico':
        // Apenas o primeiro benefício
        return allBenefits.slice(0, 1); // ["Tudo do básico"]

      case 'Intermediário':
        // Primeiros dois benefícios
        return allBenefits.slice(0, 2); // ["Tudo do básico", "Carro reserva"]

      case 'Premium':
        // Todos os benefícios
        return allBenefits; // ["Tudo do básico", "Carro reserva", "Vidros"]

      default:
        return allBenefits;
    }
  };

  if (loading || !planData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-400">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Simulador de Planos</h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - Plan Configuration */}
        <div className="xl:col-span-2 space-y-6">
          {/* Plans Selection */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Planos personalizados</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {planData.plansIndicators.map(plan => {
                const adjustedPrice = getAdjustedPlanPrice(plan);
                return (
                  <PlanCard
                    key={plan.name}
                    title={plan.name}
                    price={formatCurrency(adjustedPrice)}
                    priceLabel="Por mês"
                    isRecommended={plan.name === 'Premium'}
                    isSelected={selectedPlan === plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                  />
                );
              })}
            </div>
          </div>

          {/* Vehicle Value Slider */}
          <RangeSlider
            label="Valor do veículo:"
            value={vehicleValue}
            min={10000}
            max={500000}
            step={1000}
            formatValue={formatVehicleValue}
            formatLabel={formatVehicleValue}
            onChange={setVehicleValue}
          />

          {/* Client Age Slider */}
          <RangeSlider
            label="Idade do Cliente:"
            value={clientAge}
            min={18}
            max={90}
            step={1}
            suffix="anos"
            onChange={setClientAge}
          />

          {/* Additional Coverages */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Coberturas Adicionais</h2>

            <div className="space-y-3">
              {additionalCoverages.map(coverage => {
                const adjustedPrice = getAdjustedCoveragePrice(coverage.price);
                return (
                  <label
                    key={coverage.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#141c2a] hover:bg-[#1e2a3d] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={coverage.enabled}
                        onChange={() => toggleCoverage(coverage.id)}
                        className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                      />
                      <span className="text-white">{coverage.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      + {formatCurrency(adjustedPrice)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Summary */}
        <div className="space-y-6">
          {/* Included Benefits */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Benefícios Inclusos</h2>

            <div className="space-y-3">
              {getIncludedBenefitsForPlan().map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[#141c2a]">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-white text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Indicadores</h2>
            <div className="space-y-4">
              {planData.plansIndicators.map(plan => {
                const totalPrice = calculateTotalPrice(plan);
                return (
                  <PlanIndicatorCard
                    key={plan.name}
                    planName={plan.name}
                    totalPrice={formatCurrency(totalPrice)}
                    conversion={plan.conversion}
                    roi={plan.roi}
                    isSelected={selectedPlan === plan.name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
