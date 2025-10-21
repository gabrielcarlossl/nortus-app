# 💡 Dicas de Desenvolvimento - Nortus

## 🎯 Começando

### Primeira Vez?
1. Leia o **QUICKSTART.md** primeiro
2. Execute `npm install`
3. Execute `npm run dev`
4. Abra http://localhost:3000

---

## 🔧 Desenvolvimento

### Adicionando Nova Página

1. **Criar arquivo de página:**
```tsx
// src/app/nova-pagina/page.tsx
'use client';

export default function NovaPaginaPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-white">Nova Página</h1>
      {/* Conteúdo */}
    </div>
  );
}
```

2. **Adicionar rota em constants:**
```typescript
// src/constants/index.ts
export const ROUTES = {
  // ... outras rotas
  NOVA_PAGINA: '/dashboard/nova-pagina',
} as const;
```

3. **Adicionar no menu (se necessário):**
```tsx
// src/components/layout/Sidebar.tsx
const menuItems: MenuItem[] = [
  // ... outros itens
  {
    icon: <Icon size={20} />,
    label: 'Nova Página',
    href: ROUTES.NOVA_PAGINA,
  },
];
```

---

### Criando Novo Componente

```tsx
// src/components/MeuComponente.tsx
'use client';

interface MeuComponenteProps {
  titulo: string;
  descricao?: string;
}

/**
 * @description Descrição do componente
 */
export function MeuComponente({ titulo, descricao }: MeuComponenteProps) {
  return (
    <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-semibold text-white">{titulo}</h3>
      {descricao && <p className="text-gray-400 mt-2">{descricao}</p>}
    </div>
  );
}
```

---

### Criando Novo Schema Zod

```typescript
// src/schemas/meu-schema.ts
import { z } from 'zod';

export const meuSchema = z.object({
  campo: z.string().min(1, 'Campo obrigatório'),
  email: z.string().email('Email inválido'),
  numero: z.number().min(0).max(100),
});

export type MeuFormData = z.infer<typeof meuSchema>;
```

---

### Criando Novo Serviço

```typescript
// src/services/meu.service.ts
import apiClient from '@/lib/axios';

class MeuService {
  async buscarDados() {
    const response = await apiClient.get('/endpoint.json');
    return response.data;
  }
}

export const meuService = new MeuService();
```

---

### Adicionando Redux Slice

```typescript
// src/store/slices/meuSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MeuState {
  dados: any[];
}

const initialState: MeuState = {
  dados: [],
};

const meuSlice = createSlice({
  name: 'meu',
  initialState,
  reducers: {
    setDados: (state, action: PayloadAction<any[]>) => {
      state.dados = action.payload;
    },
  },
});

export const { setDados } = meuSlice.actions;
export default meuSlice.reducer;
```

```typescript
// src/store/index.ts
import meuReducer from './slices/meuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meu: meuReducer, // Adicione aqui
  },
});
```

---

## 🎨 Estilização

### Classes Tailwind Comuns

```tsx
// Card
<div className="bg-[#1a2332] rounded-xl p-6 border border-gray-800">

// Botão Primário
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">

// Input
<input className="w-full px-4 py-3 bg-[#1a2332] border border-gray-700 rounded-lg text-white" />

// Título
<h1 className="text-3xl font-bold text-white">

// Texto
<p className="text-gray-400">
```

### Animações Disponíveis

```css
.animate-fade-in    /* Fade in suave */
.animate-slide-in   /* Slide da esquerda */
```

---

## 🔒 Autenticação

### Protegendo Rota

As rotas dentro de `/dashboard` já estão protegidas pelo middleware.

### Acessando Usuário

```tsx
import { useAppSelector } from '@/store/hooks';

const { user, isAuthenticated } = useAppSelector(state => state.auth);
```

### Logout

```tsx
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { authService } from '@/services/auth.service';

const dispatch = useAppDispatch();

const handleLogout = () => {
  authService.logout();
  dispatch(logout());
  router.push('/login');
};
```

---

## 📝 Boas Práticas

### 1. Sempre use TypeScript
```tsx
// ✅ Bom
interface Props {
  titulo: string;
}

// ❌ Evite
// props: any
```

### 2. Documente componentes
```tsx
/**
 * @description O que o componente faz
 */
export function MeuComponente() {
  // ...
}
```

### 3. Use constantes
```tsx
// ✅ Bom
import { ROUTES } from '@/constants';
router.push(ROUTES.DASHBOARD);

// ❌ Evite
router.push('/dashboard');
```

### 4. Valide formulários
```tsx
// ✅ Bom
const validatedData = schema.parse(formData);

// ❌ Evite
// Sem validação
```

### 5. Trate erros
```tsx
// ✅ Bom
try {
  await api.call();
  toast.success('Sucesso!');
} catch (error) {
  toast.error('Erro ao processar');
}
```

---

## 🐛 Debug

### Ver estado Redux
Use Redux DevTools no navegador

### Ver cookies
```javascript
// No console do navegador
document.cookie
```

### Ver localStorage
```javascript
// No console do navegador
localStorage.getItem('nortus_user')
```

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview produção
npm run start

# Lint
npm run lint

# Limpar cache
rm -rf .next

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Links Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Zod](https://zod.dev/)
- [Lucide Icons](https://lucide.dev/)

---

## 💬 Dicas Gerais

1. **Commits frequentes** - Faça commits pequenos e descritivos
2. **Teste localmente** - Sempre teste antes de commitar
3. **Leia erros** - Mensagens de erro geralmente dizem o problema
4. **Console.log** - Use para debug rápido
5. **Google** - Busque erros específicos

---

**🚀 Feliz desenvolvimento!**
