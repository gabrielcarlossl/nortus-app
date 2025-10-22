# Documentação do Simulador de Planos

## Visão Geral

O Simulador de Planos é um componente interativo que permite aos usuários personalizar e visualizar em tempo real o custo de diferentes planos de seguro automotivo. O componente calcula dinamicamente os preços baseado em múltiplos fatores de risco.

## Localização

**Arquivo:** `/src/app/dashboard/simulator/page.tsx`

**Rota:** `/dashboard/simulator`

## Funcionalidades Principais

### 1. Seleção de Planos

Três tipos de planos disponíveis:

- **Básico**: Plano de entrada com cobertura essencial
- **Intermediário**: Plano recomendado com melhor custo-benefício
- **Premium**: Plano completo com máxima cobertura

### 2. Ajustes Dinâmicos

#### Valor do Veículo

- **Range**: R$ 10.000 a R$ 500.000
- **Step**: R$ 1.000
- **Valor padrão**: R$ 50.000
- **Impacto**: Afeta o preço do plano e das coberturas adicionais

#### Idade do Cliente

- **Range**: 18 a 90 anos
- **Step**: 1 ano
- **Valor padrão**: 28 anos
- **Impacto**: Afeta apenas o preço do plano base

### 3. Coberturas Adicionais

Opções disponíveis:

- ✅ Cobertura contra roubo e furto (R$ 25,00 base)
- ✅ Danos por colisão (R$ 35,00 base)
- ✅ Cobertura contra incêndio (R$ 20,00 base)
- ☐ Fenômenos naturais - granizo, enchente (R$ 30,00 base)

**Nota**: Preços base são ajustados proporcionalmente ao valor do veículo.

### 4. Indicadores de Performance

Para cada plano são exibidos:

- **Conversão (%)**: Taxa de conversão esperada
- **ROI (%)**: Retorno sobre investimento esperado

Cores dos indicadores:

- 🟢 Verde: Alta performance (Conversão ≥50%, ROI ≥120%)
- 🟡 Amarelo: Performance média (Conversão 30-49%, ROI 80-119%)
- 🔴 Vermelho: Performance baixa (Conversão <30%, ROI <80%)

## Lógica de Cálculo

### 1. Multiplicador do Veículo

- **cálculos e multiplicadores baseado em práticas comuns do mercado de seguros**

Ajusta o preço baseado no valor do veículo em relação a um valor de referência.

```typescript
const baseValue = 50000; // Valor de referência: R$ 50.000
const multiplicadorVeículo = valorVeículo / baseValue;
```

**Exemplos:**

| Valor do Veículo | Cálculo        | Multiplicador | Efeito            |
| ---------------- | -------------- | ------------- | ----------------- |
| R$ 25.000        | 25000 / 50000  | 0.5           | Preço cai 50%     |
| R$ 50.000        | 50000 / 50000  | 1.0           | Preço normal      |
| R$ 100.000       | 100000 / 50000 | 2.0           | Preço dobra       |
| R$ 200.000       | 200000 / 50000 | 4.0           | Preço quadruplica |

### 2. Multiplicador da Idade

Ajusta o preço baseado no perfil de risco do cliente por idade.

#### Idade Base: 28 anos (multiplicador = 1.0)

#### Para Clientes Jovens (18-27 anos)

```typescript
// Desconto progressivo de até 15%
multiplicador = 0.85 + ((idade - 18) / (28 - 18)) × 0.15
```

**Exemplos:**

| Idade   | Cálculo               | Multiplicador | Desconto |
| ------- | --------------------- | ------------- | -------- |
| 18 anos | 0.85 + (0/10) × 0.15  | 0.85          | 15%      |
| 21 anos | 0.85 + (3/10) × 0.15  | 0.895         | 10.5%    |
| 23 anos | 0.85 + (5/10) × 0.15  | 0.925         | 7.5%     |
| 28 anos | 0.85 + (10/10) × 0.15 | 1.0           | 0%       |

#### Para Clientes Mais Velhos (29-90 anos)

```typescript
// Acréscimo progressivo de até 50%
multiplicador = 1.0 + ((idade - 28) / (90 - 28)) × 0.5
```

**Exemplos:**

| Idade   | Cálculo             | Multiplicador | Acréscimo |
| ------- | ------------------- | ------------- | --------- |
| 28 anos | 1.0 + (0/62) × 0.5  | 1.0           | 0%        |
| 40 anos | 1.0 + (12/62) × 0.5 | 1.097         | 9.7%      |
| 50 anos | 1.0 + (22/62) × 0.5 | 1.177         | 17.7%     |
| 60 anos | 1.0 + (32/62) × 0.5 | 1.258         | 25.8%     |
| 70 anos | 1.0 + (42/62) × 0.5 | 1.339         | 33.9%     |
| 80 anos | 1.0 + (52/62) × 0.5 | 1.419         | 41.9%     |
| 90 anos | 1.0 + (62/62) × 0.5 | 1.5           | 50%       |

### 3. Preço do Plano Ajustado

```typescript
preçoPlano = preçoBase × multiplicadorVeículo × multiplicadorIdade
```

**Exemplo Completo:**

```
Plano Básico: R$ 89,90
Veículo: R$ 100.000
Cliente: 50 anos

Cálculos:
1. Multiplicador veículo = 100000 / 50000 = 2.0
2. Multiplicador idade = 1.0 + (22/62) × 0.5 = 1.177
3. Preço ajustado = 89.90 × 2.0 × 1.177 = R$ 211,61
```

### 4. Preço da Cobertura Adicional

```typescript
preçoCobertura = preçoBase × multiplicadorVeículo
```

**Nota Importante**: Coberturas adicionais são afetadas APENAS pelo valor do veículo, não pela idade do cliente.

**Justificativa**: O custo de reparo ou reposição de peças depende do valor do veículo, mas não do perfil etário do motorista.

**Exemplo:**

```
Cobertura contra roubo: R$ 25,00
Veículo: R$ 100.000

Cálculo:
1. Multiplicador veículo = 100000 / 50000 = 2.0
2. Preço ajustado = 25.00 × 2.0 = R$ 50,00
```

### 5. Preço Total Final

```typescript
total = preçoPlanoAjustado + Σ(coberturasHabilitadasAjustadas);
```

**Exemplo Completo:**

```
Configuração:
- Plano: Intermediário (R$ 145,90 base)
- Veículo: R$ 100.000
- Cliente: 50 anos
- Coberturas habilitadas:
  • Roubo e furto (R$ 25,00 base)
  • Danos por colisão (R$ 35,00 base)
  • Cobertura contra incêndio (R$ 20,00 base)

Cálculos:
1. Multiplicador veículo = 100000 / 50000 = 2.0
2. Multiplicador idade = 1.177

3. Preço do plano:
   145.90 × 2.0 × 1.177 = R$ 343,57

4. Coberturas:
   - Roubo: 25.00 × 2.0 = R$ 50,00
   - Colisão: 35.00 × 2.0 = R$ 70,00
   - Incêndio: 20.00 × 2.0 = R$ 40,00
   - Subtotal coberturas = R$ 160,00

5. TOTAL MENSAL = R$ 343,57 + R$ 160,00 = R$ 503,57
```

## Tabela de Referência Rápida

### Impacto do Valor do Veículo

| Veículo    | Plano Básico\* | Plano Intermediário\* | Plano Premium\* |
| ---------- | -------------- | --------------------- | --------------- |
| R$ 25.000  | R$ 44,95       | R$ 72,95              | R$ 112,95       |
| R$ 50.000  | R$ 89,90       | R$ 145,90             | R$ 225,90       |
| R$ 100.000 | R$ 179,80      | R$ 291,80             | R$ 451,80       |
| R$ 200.000 | R$ 359,60      | R$ 583,60             | R$ 903,60       |

\*Valores base para cliente de 28 anos, sem coberturas adicionais

### Impacto da Idade (para veículo de R$ 50.000)

| Idade   | Plano Básico | Plano Intermediário | Plano Premium |
| ------- | ------------ | ------------------- | ------------- |
| 18 anos | R$ 76,42     | R$ 124,02           | R$ 192,02     |
| 25 anos | R$ 85,65     | R$ 139,06           | R$ 215,31     |
| 28 anos | R$ 89,90     | R$ 145,90           | R$ 225,90     |
| 40 anos | R$ 98,62     | R$ 160,05           | R$ 247,83     |
| 50 anos | R$ 105,80    | R$ 171,74           | R$ 265,86     |
| 60 anos | R$ 113,09    | R$ 183,58           | R$ 284,18     |
| 70 anos | R$ 120,38    | R$ 195,42           | R$ 302,50     |

## Funções Principais

### `getVehicleMultiplier()`

Calcula o multiplicador baseado no valor do veículo.

### `getAgeMultiplier()`

Calcula o multiplicador baseado na idade do cliente.

### `getAdjustedPlanPrice(basePlan: PlanIndicator)`

Calcula o preço ajustado do plano aplicando ambos os multiplicadores.

### `getAdjustedCoveragePrice(basePrice: number)`

Calcula o preço ajustado de uma cobertura adicional.

### `calculateTotalPrice(basePlan: PlanIndicator)`

Calcula o preço total final incluindo plano e coberturas habilitadas.
