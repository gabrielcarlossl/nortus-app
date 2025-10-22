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
