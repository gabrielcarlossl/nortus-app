# Relatório de Desenvolvimento - Projeto Nortus (Loomi)

---

## 1. Organização de Demandas e Atividades

### **Metodologia Aplicada**

Utilizei uma abordagem de entregas por etapas de telas e funcionalidades obrigatórias, cada dia seria uma tela e suas funcionalidades, ao finalizar tudo obrigatório implementei melhorias e novas funcionalidades.

- Dia 1: Login e /dashboard(home)
- dia 2: Tickets / simulador
- dia 3: Clientes 360, configurações e componentes extras.

#### **1.1 Breakdown Inicial**

Analisei o desafio proposto e dividi em funcionalidades obrigatórias para iniciar e ao final incrementar melhorias:

```
1: Setup e Infraestrutura
  ├── Configuração Next.js 14 + TypeScript
  ├── Setup Redux Toolkit
  ├── Configuração Tailwind CSS
  ├── Setup ESLint + Prettier + Husky
  └── Estrutura de pastas

2: Autenticação
  ├── Tela de login com validação
  ├── AuthService (login/logout)
  ├── Redux authSlice
  ├── Middleware de proteção de rotas
  └── Armazenamento seguro (cookies + localStorage)

3: Dashboard Base
  ├── Layout com Sidebar + Header
  ├── Página principal com KPIs
  ├── Integração API mockada
  └── Skeleton loading states

4: Gestão de Tickets
  ├── Listagem com filtros
  ├── Modal de criação/edição
  ├── Paginação e busca
  └── Status e prioridades

Epic 5: Simulador de Planos
  ├── Seleção de planos (cards)
  ├── Sliders de ajuste (veículo/idade)
  ├── Coberturas adicionais
  ├── Cálculo dinâmico em tempo real
  └── Indicadores de conversão/ROI

Epic 6: Visão 360 do Cliente
  ├── Layout em 3 colunas
  ├── Perfil e produtos do cliente
  ├── Sugestões de IA (NBO/NBA/NBX)
  ├── Classificação inteligente
  └── Cards de upgrade

Epic 7: Features Complementares
  ├── Modal de notificações
  ├── Seletor de idioma
  ├── Dropdown de perfil do usuário
  ├── Página de configurações
  └── Hook customizado useClickOutside

Epic 8: Qualidade e Documentação
  ├── Testes unitários (Jest)
  ├── JSDoc completo
  ├── README e documentações
  ├── CI/CD (GitHub Actions)
  └── CHANGELOG automático
```

#### **1.2 Gestão de Tarefas**

**Commits Convencionais**

```bash
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
refactor: Refatoração
test:     Testes
chore:    Manutenção
```

#### **1.3 Rotina de Desenvolvimento**

**Daily (auto-avaliação):**

- O que fiz ontem?
- O que farei hoje?

**Ciclo de trabalho:**

```
1. Criar branch feat/nome-da-feature
2. Desenvolver + commitar frequentemente
3. Testar manualmente
4. Escrever testes automatizados
5. Documentar (JSDoc + README)
6. Merge para develop
7. Deploy preview (Netlify)
```

---

## 2. Priorização das Entregas

### **Critérios de Priorização**

| Prioridade    | Exemplos                                         |
| ------------- | ------------------------------------------------ |
| **(Crítico)** | Login, dashboard, gestão de tickets              |
| **(Média)**   | Testes, CI/CD, Github actions, Skeletons, Modais |
| **(Baixa)**   | Animações, sooner, apexcharts                    |

### **Ordem de Implementação**

#### **Dia 1: Fundação (Semana 1)**

```
 - Setup projeto (Next.js + TypeScript + Tailwind)
 - Configuração Redux Toolkit
 - Sistema de autenticação completo
 - Layout base (Sidebar + Header)
 - Dashboard principal com KPIs
```

**Justificativa:** Sem base, não roda. Autenticação protege rotas.

#### **dia 2: Features e telas principais**

```
 - Sistema de Tickets (CRUD completo)
 - Simulador de Planos (lógica complexa)
 - Skeletons de loading
 - Validações com Zod
```

**Justificativa:** Features principais do desafio. Simulador tem maior complexidade.

#### **dia 3: Visão 360 e extras**

```
 - Layout 3 colunas responsivo
 - Integração API 360-view
 - Sugestões de IA (tabs NBO/NBA/NBX)
 - Classificação inteligente
 - Cards de upgrade
 - Modal de notificações
 - Seletor de idioma
 - Dropdown de perfil
 - Página de configurações
 - Animações customizadas
```

**Justificativa:** ao finalizar features e telas críticas foquei em melhorar o projeto, adicionar mais conteúdo..

#### **Continuo: Qualidade**

```
 - Testes unitários (Jest)
 - Documentação completa (JSDoc + README)
 - CI/CD (GitHub Actions)
 - Semantic Release
 - Refatorações
 - Criação de componentes reutilizáveis
```

**Justificativa:** Projeto profissional precisa de testes e documentação.

## 3. Principais Dificuldades e Soluções

### **Desafio 1: Cálculo Dinâmico do Simulador**

**Problema:**

```
- Múltiplas variáveis interdependentes (valor veículo, idade, coberturas)
- Necessidade de recalcular em tempo real
- Manter performance em cada mudança
- Garantir precisão dos multiplicadores
```

**Solução:**

- Consulta de projetos que já trabalhei na minha empresa atual, consulta com IA
- Criei funções puras e testáveis
- UseEffect para recalcular quando deps mudam

---

### **Desafio 2: Layout Responsivo da Visão 360**

**Problema:**

```
- Layout complexo em 3 colunas
- Precisa funcionar em mobile (1 coluna)
- Tablet (2 colunas) e desktop (3 colunas)
- Ordem de exibição deve fazer sentido em cada tela
```

**Solução:**

- Grid responsivo com Tailwind
- Flex responsivo em seções específicas

---

### **Desafio 3: Repetição de Código (DRY)**

**Problema:**

```
- Múltiplos componentes, cards, badges, modais
- Múltiplos skeletons similares
- Formatação de moeda/data repetida
```

**Solução:**

- Refatoração para Componentes reutilizáveis
- Funções utilitárias

---

### **Desafio 4: Testes (O que testar no Frontend?)**

**Problema:**

```
- Estava testando contrato de API (responsabilidade do backend)
- Testes muito acoplados à implementação
- Baixo valor agregado
```

**Solução:**

- Testando responsabilidades do frontend
- Testando erros de API, falha de internet

### **Desafio 5: Integração com mapas e customizá-lo**

**Problema:**

```
- Integrar mapa com aplicação
- Customizar icones dentro do mapa
- Realizar marcação do mapa com pointers
```

**Solução:**

- Pesquisas e utilização do Leaflet, biblioteca opensource javascript leve para mapas interativos

---

## 4. O Que Faria Diferente com mais tempo ou contexto real de projeto.

### **4.1 Arquitetura e Código**

#### **React Query (TanStack Query)**

```typescript
//  Atual: useEffect + useState
useEffect(() => {
  async function loadData() {
    try {
      const data = await getClient360Data();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, []);

// Ideal: React Query
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['client360'],
  queryFn: getClient360Data,
  staleTime: 5 * 60 * 1000, // Cache 5min
  retry: 3,
});
```

**Benefícios:**

- Cache automático
- Refetch inteligente
- Loading e error states prontos
- Retry automático

---

#### **Zod + React Hook Form (Formulários)**

```typescript
// Atual: Validação manual
const handleSubmit = e => {
  e.preventDefault();
  if (!email) return;
  if (!password) return;
  // ...
};

// Ideal: Zod + React Hook Form
const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

const { register, handleSubmit, formState } = useForm({
  resolver: zodResolver(formSchema),
});

const onSubmit = handleSubmit(data => {
  // data já validado e tipado
});
```

**Benefícios:**

- Validação declarativa
- TypeScript inferido
- Acessibilidade automática

---

### **4.2 Testes e Qualidade**

#### **Testes E2E (Playwright)**

```typescript
// Atual: Apenas testes unitários (Jest)

// Ideal: E2E completos
test('user can login and view dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'admin@loomi.com.br');
  await page.fill('input[name="password"]', 'loomi2024');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h2')).toContainText('Dashboard');
});

test('simulator calculates prices correctly', async ({ page }) => {
  await page.goto('/dashboard/simulator');
  await page.selectOption('select[name="plan"]', 'Intermediário');
  await page.fill('input[name="vehicleValue"]', '50000');

  const price = await page.locator('[data-testid="total-price"]').textContent();
  expect(price).toBe('R$ 145,90');
});
```

**Cobertura ideal:**

- Fluxo de login/logout
- Criação de ticket
- Simulação de plano
- Navegação entre páginas
- Responsividade (viewports diferentes)

---

#### **Storybook (Documentação de Componentes)**

```typescript
// Criar stories para cada componente

// PlanCard.stories.tsx
export default {
  title: 'Components/PlanCard',
  component: PlanCard,
} as Meta;

export const Basic: Story = {
  args: {
    title: 'Básico',
    price: 89.9,
    isRecommended: false,
    isSelected: false,
  },
};

export const Recommended: Story = {
  args: {
    ...Basic.args,
    isRecommended: true,
  },
};

export const Selected: Story = {
  args: {
    ...Basic.args,
    isSelected: true,
  },
};
```

**Benefícios:**

- Documentação visual
- Desenvolvimento isolado
- Teste de acessibilidade
- Teste de variações

---

### **4.3 Performance e Otimização**

#### **Lazy Loading e Code Splitting**

```typescript
// Carregar modais sob demanda
const NotificationsModal = dynamic(
  () => import('@/components/modals/NotificationsModal'),
  { ssr: false }
);

// Lazy load de rotas pesadas
const Client360Page = lazy(() => import('@/app/dashboard/client-360/page'));

// Suspense boundaries
<Suspense fallback={<Client360Skeleton />}>
  <Client360Page />
</Suspense>
```

---

### **4.4 Observabilidade e Monitoramento**

#### **Sentry (Error Tracking)**

```typescript
// Capturar erros em produção
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Captura automática de erros
try {
  await getClient360Data();
} catch (error) {
  Sentry.captureException(error, {
    tags: { section: 'client360' },
    user: { id: user.id },
  });
  throw error;
}
```

#### **Analytics (Mixpanel/Amplitude)**

```typescript
// Rastrear comportamento do usuário
import { track } from '@/lib/analytics';

const handlePlanSelect = (plan: string) => {
  track('Plan Selected', {
    plan_name: plan,
    vehicle_value: vehicleValue,
    client_age: clientAge,
    timestamp: new Date(),
  });
  setSelectedPlan(plan);
};
```

#### **Logs Estruturados (Pino)**

```typescript
// Logs estruturados para debugging
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
  },
});

logger.info({ userId: user.id, action: 'login' }, 'User logged in');
logger.error({ error, context: 'API' }, 'Failed to fetch data');
```

---

### **4.5 UX/UI Avançado**

#### **Animações com Framer Motion**

```typescript
// Animações mais sofisticadas
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Modal />
    </motion.div>
  )}
</AnimatePresence>
```

#### **Toast Notifications Avançadas**

```typescript
// Atual: Sonner básico
toast.success('Login realizado!');

// Ideal: Toasts com ações
toast.success('Ticket criado!', {
  action: {
    label: 'Ver ticket',
    onClick: () => router.push(`/dashboard/tickets/${id}`),
  },
  duration: 5000,
});

toast.promise(saveData(), {
  loading: 'Salvando...',
  success: 'Salvo com sucesso!',
  error: 'Erro ao salvar',
});
```

---

### **4.6 Acessibilidade (WCAG 2.1 AA)**

```typescript
// 🚀 Melhorias de acessibilidade

// ARIA labels em todos os botões
<button
  aria-label="Fechar modal de notificações"
  aria-pressed={isOpen}
  onClick={onClose}
>
  <X />
</button>

// Focus trap em modais
import FocusTrap from 'focus-trap-react';

<FocusTrap active={isOpen}>
  <Modal />
</FocusTrap>

// Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Pular para conteúdo principal
</a>

// Anúncios para screen readers
<div role="status" aria-live="polite" className="sr-only">
  {statusMessage}
</div>
```

---

### **4.7 Internacionalização Real**

```typescript
// i18n com next-intl ou react-intl

// messages/pt-BR.json
{
  "dashboard.title": "Painel de Controle",
  "tickets.new": "Novo Ticket",
  "simulator.vehicleValue": "Valor do Veículo"
}

// Uso
import { useTranslations } from 'next-intl';

const t = useTranslations('dashboard');
<h1>{t('title')}</h1>

// Formatação automática de datas/moedas
const { formatCurrency, formatDate } = useIntl();
formatCurrency(145.90, { currency: 'BRL' }); // R$ 145,90
formatDate(new Date(), { dateStyle: 'long' }); // 24 de outubro de 2024
```

---
