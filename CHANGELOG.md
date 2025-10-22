# [1.3.0](https://github.com/gabrielcarlossl/loomi/compare/v1.2.0...v1.3.0) (2025-10-22)

### Features

- add jest configuration and update package.json for testing ([0aa4217](https://github.com/gabrielcarlossl/loomi/commit/0aa4217d65e891e61ccfe8bbac533a03991bf06c))
- add logo and favicon ([caf756a](https://github.com/gabrielcarlossl/loomi/commit/caf756a3e384529f4c5903a51cf3f1f314dffaa2))

# [1.2.0](https://github.com/gabrielcarlossl/loomi/compare/v1.1.0...v1.2.0) (2025-10-22)

### Features

- add reusable ActivityItem component ([0cffa23](https://github.com/gabrielcarlossl/loomi/commit/0cffa23c4292731a3a41cf23819d7b188655220e))
- add reusable Badge component for priority and status in TicketsTable ([d113e15](https://github.com/gabrielcarlossl/loomi/commit/d113e152f75834ff5aaebd0dc05355ccf1806197))
- add reusable KpiCard component for displaying KPI metrics ([19309e6](https://github.com/gabrielcarlossl/loomi/commit/19309e6bed6985318cb0f1259beb2133ba894055))
- add reusable ticket cards ([fb6a610](https://github.com/gabrielcarlossl/loomi/commit/fb6a610b6f9fd133e559491aabddd60a1eb95338))
- add ticket management service with data fetching and ticket creation ([9cf9a5c](https://github.com/gabrielcarlossl/loomi/commit/9cf9a5c9595aebf6111f96bfa78c533b5365394e))
- add TicketsTable component with filtering, pagination, and search functionality ([3620068](https://github.com/gabrielcarlossl/loomi/commit/36200685cf7dbdbf2390da45d268aaa2f0728042))
- add validation schema for new ticket creation ([a0e5a30](https://github.com/gabrielcarlossl/loomi/commit/a0e5a30a0d1ae1b90a1c715384e201104f1dbc98))
- enhance TicketsPage with data fetching, KPIs display, and ticket creation modal ([871fb38](https://github.com/gabrielcarlossl/loomi/commit/871fb38880221377293f151484b594db1a5f4913))
- implement dashboard data fetching from API and integrated on charts and cards ([48d2ab8](https://github.com/gabrielcarlossl/loomi/commit/48d2ab86c2ef7e7ce005efc15aed610db1930e32))
- implement NewTicketModal component for ticket creation ([fe77973](https://github.com/gabrielcarlossl/loomi/commit/fe77973667f662b5937c03dfb3cc74204635fd4f))
- implement Redux Persist for state management and add tickets slice ([e83bebf](https://github.com/gabrielcarlossl/loomi/commit/e83bebf162c8c93b1a66c331bd1409f946f71981))
- implement ticket editing and viewing functionality with modals ([2273614](https://github.com/gabrielcarlossl/loomi/commit/2273614ecb30e1a29aa1a3d5f9061224880d585e))
- integrate KpiCard component for KPI display in dashboard ([b813d2b](https://github.com/gabrielcarlossl/loomi/commit/b813d2b9c156d3617a99cfa28a874ce2592c61b0))
- update TicketSummaryCard icons for better representation ([419e4c9](https://github.com/gabrielcarlossl/loomi/commit/419e4c9aa5fe7443a3e11f8a05b7fba869db5088))

# [1.1.0](https://github.com/gabrielcarlossl/loomi/compare/v1.0.0...v1.1.0) (2025-10-22)

### Features

- add ChartKpi component for KPI visualization in dashboard ([6664252](https://github.com/gabrielcarlossl/loomi/commit/6664252d744c8e2b9811e315862436e6cbfb0d18))
- add ChartSegment component and integrate ApexChart for segment visualization ([31c3a02](https://github.com/gabrielcarlossl/loomi/commit/31c3a02d3123c1704780e61e539570586d6a4095))
- add ClientMap component with dynamic import to handle SSR issues ([f5e425c](https://github.com/gabrielcarlossl/loomi/commit/f5e425c6ef6fba7b028ccc70f4b0909bf595b6b3))
- add dynamic ApexChart component to handle SSR issues and loading state ([bc0a34b](https://github.com/gabrielcarlossl/loomi/commit/bc0a34b5b65698625e131a5bd99c168011d56b4a))
- add MapLocation and MapData interfaces for client map types ([a8764c2](https://github.com/gabrielcarlossl/loomi/commit/a8764c2645ece18ec100d7541f61d27ad9fed8c2))
- implement getMapData function to fetch map location data ([64dfe32](https://github.com/gabrielcarlossl/loomi/commit/64dfe32e05f9059a23996b2a2aec70d70f076a06))
- integrate ClientMap component to display customer map in dashboard ([47adec7](https://github.com/gabrielcarlossl/loomi/commit/47adec7bf73c851e4935229e76e06db50d68d20e))
- update package dependencies and add Leaflet map component with custom markers ([88be1bb](https://github.com/gabrielcarlossl/loomi/commit/88be1bb754fe89b165eb56c29d5357878da4dc84))

# 1.0.0 (2025-10-22)

### Bug Fixes

- remove unnecessary shebang and husky script sourcing from pre-push hook ([87ddb5d](https://github.com/gabrielcarlossl/loomi/commit/87ddb5dd50a3f6eaf6d5d3efdc72ccf7dd2f7c74))
- replaced deprecated zod email validation with new format ([28f22c8](https://github.com/gabrielcarlossl/loomi/commit/28f22c8c611c2380024ec71790d5142997c9154c))
- zod errors message ([05ea45f](https://github.com/gabrielcarlossl/loomi/commit/05ea45f7b40feb832623e5e36279701ed2f0075c))

### Features

- add CI and Release workflows for automated linting and deployment ([4172984](https://github.com/gabrielcarlossl/loomi/commit/41729846265c111585f2cfbc2d0d1125a13eda13))
- Add Client360, Dashboard, Simulator, and Tickets pages with initial layout ([2a9bfcd](https://github.com/gabrielcarlossl/loomi/commit/2a9bfcd14ea840ffb5e0c27acc1d7c801cfce126))
- add example environment configuration file ([b1f5e20](https://github.com/gabrielcarlossl/loomi/commit/b1f5e205fa171bd40b306898d71caa86cb2954c9))
- Implement LoginPage with form validation and user feedback ([4d6eaf0](https://github.com/gabrielcarlossl/loomi/commit/4d6eaf0026f11474916bd50e79238c32d65677f6))
- Implement Redux setup with authentication service, hooks, and schemas ([484b437](https://github.com/gabrielcarlossl/loomi/commit/484b43771dde2367b3ba73742c587a60cb99a2bf))
- Implemented base layout with Sidebar and Header components ([9718589](https://github.com/gabrielcarlossl/loomi/commit/971858919bf8e18b5a5b60dafe7e55e24024ddcd))

# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Adicionado

- Configuração inicial do projeto Next.js 14+
- Sistema de autenticação com JWT
- Página de login com validação Zod
- Dashboard com sidebar e header fixos
- Redux Toolkit para gerenciamento de estado
- Middleware de autenticação Next.js
- Integração com API mockada
- Husky para git hooks
- Commitlint para validação de commits
- Lint-staged para formatação automática
- Semantic Release para versionamento automático
- Workflows do GitHub Actions (CI/CD)

### Funcionalidades

- ✅ Login com validação de email e senha
- ✅ Toggle para mostrar/ocultar senha
- ✅ Feedback visual com Sonner (toast notifications)
- ✅ Animações CSS customizadas
- ✅ Layout responsivo com Tailwind CSS
- ✅ Proteção de rotas autenticadas
- ✅ Armazenamento de token em cookies
- ✅ Dados do usuário em localStorage

---

_Este changelog é gerado automaticamente pelo Semantic Release_
