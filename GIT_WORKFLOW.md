# Git Hooks e Semantic Release

Este projeto utiliza ferramentas automatizadas para garantir qualidade de código e padronização de commits.

## 🔧 Ferramentas Configuradas

### 1. **Husky** - Git Hooks

Automatiza tarefas em momentos específicos do fluxo Git.

### 2. **Commitlint** - Validação de Commits

Garante que as mensagens de commit seguem o padrão Conventional Commits.

### 3. **Lint-staged** - Lint em Staged Files

Executa lint e formatação apenas nos arquivos que estão sendo commitados.

### 4. **Semantic Release** - Versionamento Automático

Gera versões automaticamente baseado nos commits.

## 📝 Padrão de Commits (Conventional Commits)

### Formato

```
<tipo>(<escopo>): <mensagem>

[corpo opcional]

[rodapé opcional]
```

### Tipos Permitidos

- **feat**: Nova funcionalidade

  ```bash
  git commit -m "feat: adiciona página de simulador de planos"
  ```

- **fix**: Correção de bug

  ```bash
  git commit -m "fix: corrige validação de email no formulário"
  ```

- **docs**: Documentação

  ```bash
  git commit -m "docs: atualiza README com instruções de deploy"
  ```

- **style**: Formatação (não afeta lógica)

  ```bash
  git commit -m "style: formata código com prettier"
  ```

- **refactor**: Refatoração de código

  ```bash
  git commit -m "refactor: reorganiza estrutura de componentes"
  ```

- **perf**: Melhoria de performance

  ```bash
  git commit -m "perf: otimiza carregamento de imagens"
  ```

- **test**: Adição de testes

  ```bash
  git commit -m "test: adiciona testes unitários para authService"
  ```

- **chore**: Tarefas de manutenção

  ```bash
  git commit -m "chore: atualiza dependências"
  ```

- **ci**: Integração contínua

  ```bash
  git commit -m "ci: adiciona workflow do GitHub Actions"
  ```

- **build**: Sistema de build

  ```bash
  git commit -m "build: configura webpack para produção"
  ```

- **revert**: Reverter commit
  ```bash
  git commit -m "revert: reverte commit abc123"
  ```

### Exemplos com Escopo

```bash
git commit -m "feat(auth): adiciona autenticação com Google"
git commit -m "fix(dashboard): corrige gráfico de KPIs"
git commit -m "docs(readme): adiciona seção de instalação"
```

### Breaking Changes

Para mudanças que quebram compatibilidade:

```bash
git commit -m "feat!: muda estrutura da API de autenticação

BREAKING CHANGE: endpoint /login agora retorna objeto diferente"
```

## 🔒 Pre-commit Hook

Executado **antes** de cada commit:

1. ✅ Executa ESLint nos arquivos modificados
2. ✅ Formata código com Prettier
3. ✅ Valida mensagem de commit

### O que acontece:

```bash
git add .
git commit -m "feat: nova funcionalidade"

# Automaticamente:
# 1. ESLint verifica erros
# 2. Prettier formata código
# 3. Commitlint valida mensagem
# 4. Se tudo OK → commit é criado
# 5. Se houver erro → commit é bloqueado
```

## 🚀 Pre-push Hook

Executado **antes** de cada push:

1. ✅ Executa lint completo
2. ✅ Verifica build de produção

### O que acontece:

```bash
git push origin main

# Automaticamente:
# 1. Executa 'npm run lint'
# 2. Executa 'npm run build'
# 3. Se tudo OK → push é realizado
# 4. Se houver erro → push é bloqueado
```

## 📦 Semantic Release

### Versionamento Automático

O Semantic Release gera versões automaticamente baseado nos commits:

| Tipo de Commit                 | Versão        | Exemplo       |
| ------------------------------ | ------------- | ------------- |
| `fix:`                         | Patch (0.0.x) | 1.0.0 → 1.0.1 |
| `feat:`                        | Minor (0.x.0) | 1.0.0 → 1.1.0 |
| `feat!:` ou `BREAKING CHANGE:` | Major (x.0.0) | 1.0.0 → 2.0.0 |

### Como funciona:

1. Você faz commits seguindo o padrão
2. Ao fazer push para `main` ou `develop`
3. O Semantic Release:
   - Analisa os commits desde a última versão
   - Determina o tipo de versão (patch/minor/major)
   - Gera CHANGELOG.md automaticamente
   - Cria tag Git
   - Publica release no GitHub

### Executar manualmente:

```bash
npm run semantic-release
```

## 🛠️ Comandos Úteis

### Verificar se commit está no padrão

```bash
echo "feat: minha mensagem" | npx commitlint
```

### Pular validação (não recomendado)

```bash
git commit -m "mensagem qualquer" --no-verify
```

### Listar hooks ativos

```bash
ls -la .husky/
```

### Testar lint-staged manualmente

```bash
npx lint-staged
```

## ❌ O que NÃO fazer

```bash
# ❌ Commits vagos
git commit -m "fix"
git commit -m "mudanças"
git commit -m "wip"

# ✅ Commits descritivos
git commit -m "fix: corrige validação de CPF no formulário"
git commit -m "feat: adiciona campo de data de nascimento"
git commit -m "docs: atualiza guia de contribuição"
```

## 🔄 Workflow Recomendado

1. Fazer alterações no código

   ```bash
   # Editar arquivos...
   ```

2. Adicionar arquivos ao stage

   ```bash
   git add .
   ```

3. Commit com mensagem padronizada

   ```bash
   git commit -m "feat: adiciona validação de senha forte"
   ```

   - Pre-commit hook executa automaticamente
   - Lint e formatação são aplicados
   - Commit é validado

4. Push para repositório
   ```bash
   git push origin feat/minha-feature
   ```

   - Pre-push hook executa automaticamente
   - Build é verificado
   - Push é realizado

## 🆘 Troubleshooting

### Commit bloqueado por lint

```bash
# Corrija os erros apontados pelo ESLint
npm run lint

# Ou corrija manualmente os arquivos
```

### Push bloqueado por build

```bash
# Verifique erros de compilação
npm run build

# Corrija os erros e tente novamente
```

### Mensagem de commit inválida

```bash
# Use o formato correto:
# tipo(escopo): mensagem

# Exemplos:
git commit -m "feat: nova funcionalidade"
git commit -m "fix(auth): corrige login"
```

## 📚 Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [Husky](https://typicode.github.io/husky/)
- [Commitlint](https://commitlint.js.org/)

---
