# 🛍️ Innovation Brindes - Front-end Case

## 📌 Visão Geral

Aplicação front-end desenvolvida em **Next.js** como teste técnico, com foco em autenticação, consumo de API e experiência do usuário na listagem de produtos.

A aplicação permite:

* Login via API
* Rotas protegidas
* Listagem de produtos
* Busca com debounce
* Ordenação
* Favoritos persistidos
* Modal de detalhes
* Paginação incremental
* Tratamento de estados (loading, erro, vazio)

---

## 🔗 Deploy

Acesse a aplicação online:

👉 https://innovation-brindes-case.vercel.app/

---

## 🚀 Tecnologias Utilizadas

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* React Query
* Zustand
* Vitest + React Testing Library
* Playwright (E2E)
* Docker

---

## 🧠 Arquitetura e Decisões Técnicas

### 🔐 Autenticação e Proteção de Rotas

* Login via API externa
* Token armazenado em:

  * `localStorage` (manter logado)
  * `sessionStorage` (sessão)
* Middleware para:

  * bloquear `/produtos` sem autenticação
  * redirecionar automaticamente para `/login`

---

### 🌐 Consumo de API

* React Query para:

  * cache
  * loading
  * erro
  * revalidação

---

### 🧩 Gerenciamento de Estado

* Zustand para favoritos:

  * armazenamento global
  * persistência em `localStorage`
  * acesso simplificado

---

### 🔍 Busca com Debounce

* Delay de 400ms
* Evita chamadas excessivas
* Melhor UX

---

### 📊 Ordenação

* Nome (A-Z / Z-A)
* Preço (menor → maior / maior → menor)

---

### ❤️ Favoritos

* Toggle via botão
* Persistência local
* Filtro “somente favoritos”

---

### 📄 Paginação Incremental

Como a API não possui paginação:

* Dados carregados integralmente
* Exibição em lotes (8 itens)
* Botão "Carregar mais"

---

### 🪟 Modal de Detalhes

* Abre via botão "CONFIRA"
* Fecha com:

  * clique fora
  * botão
  * tecla `Esc`
* Acessibilidade com `role="dialog"` e atributos ARIA

---

### 🖼️ Tratamento de Imagens

* Fallback com `onError`
* Exibe placeholder caso imagem falhe

---

### 🎛️ Estados da UI

* Skeleton de carregamento
* Tela de erro com retry
* Estado vazio

---

### 📱 Responsividade

* Mobile-first
* Grid adaptativo com Tailwind

---

### 🔎 SEO

* `<title>` e `<meta description>` configurados

---

## 🧪 Testes (Diferencial)

### ✔ Teste Unitário

* Vitest + React Testing Library
* Valida renderização da tela de login

Rodar:

```bash
npm run test
```

---

### ✔ Teste E2E (Smoke)

* Playwright
* Fluxo validado:

  * login → redirecionamento → grid

Rodar:

```bash
npx playwright test
```

---

## 🐳 Docker

### Build:

```bash
docker build -t innovation-case .
```

### Run:

```bash
docker run -p 3000:3000 innovation-case
```

---

## 🧪 Lighthouse

Resultados (Desktop):

* Performance: 98
* Accessibility: 90
* Best Practices: 96
* SEO: 100

---

## 📂 Estrutura do Projeto

```
app/
  login/
  produtos/
services/
store/
e2e/
components/
middleware.ts
```

---

## 🚀 Como rodar localmente

```bash
npm install
npm run dev
```

---

## 📈 Possíveis melhorias futuras

* Uso de `next/image` para otimização de imagens
* Testes adicionais (integração e cobertura maior)
* Melhorias de acessibilidade (focus trap no modal)
* Paginação server-side (se API suportar)
* Retry/backoff automático na API

---

## 🎯 Conclusão

O projeto foi desenvolvido com foco em:

* Clareza e organização de código
* Experiência do usuário
* Boas práticas modernas do ecossistema React/Next.js
* Aderência aos requisitos técnicos

Além dos requisitos obrigatórios, foram implementados diferenciais como testes automatizados e melhorias de UX.

---
