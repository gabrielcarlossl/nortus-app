'use client';

import { useEffect, useState } from 'react';
import { getClient360Data } from '@/services/client360.service';
import { Client360Data } from '@/types';
import { Phone, Mail, ExternalLink, Diamond, MoreHorizontal } from 'lucide-react';
import Client360Skeleton from '@/components/loading/Client360Skeleton';

/**
 * @fileoverview Página de Visão 360 do Cliente
 *
 * @description
 * Interface que oferece uma visão completa e integrada do cliente,
 * incluindo perfil, histórico de interações, produtos contratados,
 * classificação inteligente e sugestões de IA personalizadas.
 *
 * @features
 * - Perfil detalhado do cliente com informações de contato
 * - Lista de produtos contratados (ativos e inativos)
 * - Tags de perfil do cliente
 * - Frases captadas em atendimentos
 * - Histórico de ações no app
 * - Classificação inteligente (LTV, churn, expansão, retenção)
 * - Sugestões da IA (NBO, NBA, NBX) com probabilidade de conversão
 * - Cards de upgrade de seguros
 *
 * @api_endpoint
 * - URL: https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2/360-view.json
 *
 */
export default function Client360Page() {
  const [data, setData] = useState<Client360Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'NBO' | 'NBA' | 'NBX'>('NBO');

  useEffect(() => {
    async function loadData() {
      try {
        const clientData = await getClient360Data();
        setData(clientData);
      } catch (error) {
        console.error('Erro ao carregar dados da visão 360:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getScoreColor = (level: string): string => {
    switch (level.toLowerCase()) {
      case 'alto':
        return '#4ade80';
      case 'médio':
      case 'medio':
        return '#fbbf24';
      case 'baixo':
        return '#f87171';
      default:
        return '#6b7280';
    }
  };

  if (loading || !data) {
    return <Client360Skeleton />;
  }

  const selectedSuggestion = data.sugestionsIA[selectedTab];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column - Client Profile */}
        <div className="xl:col-span-3 space-y-6">
          {/* Client Card */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {data.client.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">{data.client.name}</h2>
              <p className="text-sm text-gray-400 mb-6">{data.client.clientType}</p>
            </div>

            <div className="flex space-y-3">
              <button className="w-full flex flex-col items-center justify-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-0">
                <Phone size={16} />
                Telefonar
              </button>
              <button className="w-full flex flex-col items-center justify-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-0">
                <Mail size={16} />
                Enviar e-mail
              </button>
              <button className="w-full flex flex-col items-center justify-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-0">
                <MoreHorizontal size={16} />
                Ver mais
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Produtos</h3>
            <div className="space-y-3">
              {data.produtos.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#141c2a]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        product.status === 'Ativo' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm text-white">{product.name}</p>
                      <p className="text-xs text-gray-400">{formatCurrency(product.value)}/mês</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <ExternalLink size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Tags */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Perfil</h3>
            <div className="flex flex-wrap gap-2">
              {data.profile.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Captured Phrases */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Frases captadas</h3>
            <div className="space-y-4">
              {data.capturedPhrases.map((item, index) => (
                <div key={index} className="p-3 rounded-lg bg-[#141c2a]">
                  <p className="text-sm text-gray-300 mb-2 italic">&ldquo;{item.phrase}&rdquo;</p>
                  <p className="text-xs text-gray-500">
                    Atendimento do dia {formatDate(item.serviceDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* App Actions */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Ações no app</h3>
            <div className="space-y-3">
              {data.appActions.map((action, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm text-white">{action.action}</p>
                  {action.pageTime && (
                    <p className="text-xs text-gray-400">Tempo na página: {action.pageTime}</p>
                  )}
                  <p className="text-xs text-gray-500">{action.accessed}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column - AI Suggestions */}
        <div className="xl:col-span-6 space-y-6">
          {/* Suggestion Tabs */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Sugestão da IA</h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {(['NBO', 'NBA', 'NBX'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-[#141c2a] text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Offer Card */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-400 mb-2">Oferta recomendada</h3>
              <p className="text-base text-white mb-4">{selectedSuggestion.offer}</p>

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Valor recomendado</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(selectedSuggestion.value)}
                    <span className="text-sm font-normal text-gray-400">/mês</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Probabilidade de conversão</p>
                  <p className="text-2xl font-bold text-green-500">
                    {selectedSuggestion.conversionProbability}%
                  </p>
                </div>
              </div>
            </div>

            {/* Reason Why */}
            <div>
              <h3 className="text-base font-semibold text-white mb-4">Reason Why</h3>
              <div className="space-y-3">
                {selectedSuggestion.reasonsWhy.map((reason, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-300">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
              Simular conversa com IA
            </button>
          </div>

          {/* Smart Classification */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Classificação inteligente</h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Segment Badge */}
              <div className="col-span-2 flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 mb-4">
                    <Diamond size={40} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {data.smartClassification.segment}
                  </p>
                </div>
              </div>

              {/* Lifetime Value */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Life time value</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrency(data.smartClassification.lifeTimeValue)}
                </p>
              </div>

              {/* Churn Probability */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Probabilidade de churn</p>
                <p className="text-xl font-bold text-green-500">
                  {data.smartClassification.churnProbability}%
                </p>
              </div>

              {/* Expansion Score */}
              <div className="col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-400">Score de expansão</p>
                  <span
                    className="px-2 py-1 text-xs font-medium rounded"
                    style={{
                      backgroundColor: `${getScoreColor(data.smartClassification.expansionScore.level)}20`,
                      color: getScoreColor(data.smartClassification.expansionScore.level),
                    }}
                  >
                    {data.smartClassification.expansionScore.level}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${data.smartClassification.expansionScore.value}%`,
                      backgroundColor: getScoreColor(data.smartClassification.expansionScore.level),
                    }}
                  ></div>
                </div>
              </div>

              {/* Retention Score */}
              <div className="col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-400">Score de retenção</p>
                  <span
                    className="px-2 py-1 text-xs font-medium rounded"
                    style={{
                      backgroundColor: `${getScoreColor(data.smartClassification.retetionScore.level)}20`,
                      color: getScoreColor(data.smartClassification.retetionScore.level),
                    }}
                  >
                    {data.smartClassification.retetionScore.level}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${data.smartClassification.retetionScore.value}%`,
                      backgroundColor: getScoreColor(data.smartClassification.retetionScore.level),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Upgrade Cards */}
        <div className="xl:col-span-3 space-y-6">
          {/* Seguro de vida individual Card */}
          <div className="bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Seguro de vida individual</h3>
            <p className="text-sm text-cyan-100 mb-6">
              Proteção financeira completa com cobertura por morte e doenças graves
            </p>

            <div className="mb-4">
              <p className="text-sm text-cyan-100 mb-1">Por apenas:</p>
              <p className="text-3xl font-bold">
                R$ 127,50<span className="text-base font-normal">/mês</span>
              </p>
            </div>

            <button className="w-full py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Simular
            </button>
          </div>

          {/* Upgrade do seguro residencial Card */}
          <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-2">Upgrade do seguro residencial</h3>
            <p className="text-sm text-gray-400 mb-6">
              Plano Completo com proteção contra danos elétricos e assistência 24h
            </p>

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Por apenas:</p>
              <p className="text-3xl font-bold text-white">
                R$ 127,50<span className="text-base font-normal text-gray-400">/mês</span>
              </p>
            </div>

            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
              Simular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
