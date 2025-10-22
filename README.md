# Nortus - Plataforma de Inteligência para VendasThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

![Next.js](https://img.shields.io/badge/Next.js-14+-black)

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)

![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0-764abc)

Plataforma de inteligência artificial para times de vendas e atendimento que utiliza dados comportamentais, análise de perfil e sugestão inteligente de produtos e planos.

## 🚀 Tecnologias Utilizadas

- **Next.js 14+** - Framework React com App Router

- **TypeScript** - Tipagem estáticabun dev

- **React 18** - Biblioteca UI

### Gerenciamento de Estado

- **Redux Toolkit** - Gerenciamento de estado global

- **React-Redux** - Integração Redux com React

### Estilização

- **Tailwind CSS** - Framework CSS utility-first

- **Lucide React** - Biblioteca de ícones moderna

### Formulários e Validação

- **Zod** - Schema validation para formulários

### API e Dados

- **Axios** - Cliente HTTP para requisições

- **API Mockada** - Endpoints S3 da Loomi

### UI/UX

- **Sonner** - Toast notifications elegantes

- **ApexCharts.js** - Biblioteca de gráficos (preparado para uso)

## Deploy on Vercel

- **Acesse o link de deploy** - [Nortus](https://nortus-v7.netlify.app/)

### Desenvolvimento

- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatação de código
- **Husky** - Git hooks automatizados para pre commit e pre push
- **Lint-staged** - Lint em arquivos staged
- **Commitlint** - Validação de mensagens de commit
- **Semantic Release** - Versionamento automático
- **js-cookie** - Gerenciamento de cookies
- **Jest** - Testes unitários

## 📁 Estrutura do Projeto

```bash
loomi/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── dashboard/          # Páginas do dashboard
│   │   │   ├── layout.tsx      # Layout com sidebar e header
│   │   │   └── page.tsx        # Página principal do dashboard
│   │   ├── login/              # Página de login
│   │   │   └── page.tsx        # Formulário de autenticação
│   │   ├── globals.css         # Estilos globais
│   │   ├── layout.tsx          # Layout raiz com providers
│   │   └── page.tsx            # Página inicial (redirect)
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── charts/             # Componentes de gráficos (ApexChart, ChartKpi, etc)
│   │   ├── layout/             # Componentes de layout
│   │   │   ├── Header.tsx      # Cabeçalho fixo
│   │   │   └── Sidebar.tsx     # Menu lateral fixo
│   │   └── providers/          # Providers React
│   │       └── ReduxProvider.tsx
│   │
│   ├── constants/              # Constantes da aplicação
│   │   └── index.ts            # URLs, rotas, configurações
│   │
│   ├── lib/                    # Bibliotecas e configurações
│   │   └── axios.ts            # Instância configurada do Axios
│   │
│   ├── schemas/                # Schemas de validação Zod
│   │   └── auth.schema.ts      # Validação de autenticação
│   │
│   ├── services/               # Serviços de API
│   │   └── auth.service.ts     # Serviço de autenticação
│   │
│   ├── store/                  # Redux Store
│   │   ├── slices/             # Redux Slices
│   │   │   └── authSlice.ts    # Estado de autenticação
│   │   ├── hooks.ts            # Hooks tipados do Redux
│   │   └── index.ts            # Configuração da store
│   │
│   ├── types/                  # Definições de tipos TypeScript
│   │   └── index.ts            # Tipos globais
│   │
│   ├── __tests__/              # Testes automatizados (Jest)
│   │   └── ...                 # Testes dos services, slices, middleware, etc
│   │
│   └── middleware.ts           # Middleware de autenticação Next.js
│
├── public/                     # Arquivos estáticos
├── .eslintrc.json              # Configuração ESLint
├── .prettierrc.json            # Configuração Prettier
├── next.config.ts              # Configuração Next.js
├── tailwind.config.ts          # Configuração Tailwind
├── tsconfig.json               # Configuração TypeScript
└── package.json                # Dependências do projeto
```

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação

- [x] Página de login com design baseado no protótipo
- [x] Validação de formulário com Zod
- [x] Validação de email em tempo real
- [x] Toggle para mostrar/ocultar senha
- [x] Checkbox "Lembrar-me"
- [x] Feedback visual com Sonner (sucesso/erro)
- [x] Animações na interface
- [x] Integração com API mockada
- [x] Armazenamento de token em cookies
- [x] Armazenamento de dados do usuário em localStorage
- [x] Middleware Next.js para proteção de rotas
- [x] Redirecionamento automático após login

### ✅ Infraestrutura

- [x] Gerenciamento de estado com Redux Toolkit
- [x] Sistema de rotas organizado
- [x] Axios configurado com interceptors
- [x] Tratamento de erros global
- [x] TypeScript em toda aplicação
- [x] ESLint e Prettier configurados
- [x] Animações CSS customizadas
- [x] Testes unitários

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd loomi
```

2. Instale as dependências

```bash
npm install
```

3. Execute o projeto em desenvolvimento

```bash
npm run dev
```

4. Acesse no navegador

```
http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev               # Inicia servidor de desenvolvimento
npm run build             # Cria build de produção
npm run start             # Inicia servidor de produção
npm run lint              # Executa ESLint
npm run semantic-release  # Gera release automaticamente
npm run test              # Inicia os testes unitários
```

## 🔧 Git Workflow

O projeto utiliza **Husky** para automação de tarefas Git. Consulte [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) para detalhes completos.

### Padrão de Commits (Conventional Commits)

```bash
# Formato
<tipo>(<escopo>): <mensagem>

# Exemplos
feat: adiciona página de simulador
fix(auth): corrige validação de email
docs: atualiza README
```

### Tipos de Commit

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação
- **refactor**: Refatoração
- **perf**: Performance
- **test**: Testes
- **chore**: Manutenção

### Hooks Automáticos

**Pre-commit**: Executa antes de cada commit

- ✅ ESLint
- ✅ Prettier
- ✅ Validação de mensagem

**Pre-push**: Executa antes de cada push

- ✅ Lint completo
- ✅ Testes unitários
- ✅ Build de produção

## 🔐 Autenticação

### Credenciais de Teste

Para realizar login, use qualquer email válido e senha com no mínimo 6 caracteres.

**Exemplo:**

- Email: `teste@example.com`
- Senha: `123456`

### Fluxo de Autenticação

1. Usuário acessa `/login`
2. Preenche formulário (validação Zod em tempo real)
3. Submit → Validação completa
4. Requisição para API mockada
5. Token armazenado em cookie (7 dias)
6. Dados do usuário no localStorage
7. Redux state atualizado
8. Redirecionamento para `/dashboard`
9. Middleware protege rotas autenticadas

### API Mockada

**Endpoint de Login:**

```
GET https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2/login.json
```

**Resposta:**

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "Usuário..."
  }
}
```

## 🎨 Design System

### Cores Principais

```css
--background: #0f1629; /* Fundo principal */
--foreground: #ffffff; /* Texto principal */
--primary: #3b82f6; /* Azul primário */
--secondary: #1e293b; /* Cinza secundário */
--accent: #fbbf24; /* Amarelo destaque */
```

### Componentes

- **Sidebar**: Menu lateral fixo com navegação
- **Header**: Cabeçalho com perfil e notificações
- **Cards**: Componentes de métricas e informações
- **Forms**: Inputs com validação e feedback visual
- **Toasts**: Notificações com Sonner

## 📦 Padrões de Projeto

### Organização de Código

- **Components**: Componentes reutilizáveis com JSDoc
- **Services**: Camada de serviços para API
- **Schemas**: Validações centralizadas com Zod
- **Store**: Estado global com Redux Toolkit
- **Types**: Tipos TypeScript compartilhados
- **Constants**: Configurações e constantes

### Convenções

- Nomes de arquivos em camelCase
- Componentes em PascalCase
- Hooks customizados com prefixo `use`
- Types e Interfaces em PascalCase
- Constantes em UPPER_SNAKE_CASE

### Documentação

- JSDoc em funções principais
- Comentários explicativos em lógicas complexas
- README atualizado com funcionalidades
