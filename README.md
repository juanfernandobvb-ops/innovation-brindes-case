# 🛍️ Innovation Brindes - Front-end Case

## 📌 Visão Geral

Este projeto consiste em uma aplicação front-end desenvolvida como teste técnico, com foco em autenticação, consumo de API e experiência do usuário na listagem de produtos.

A aplicação permite:

- Login via API
- Acesso a uma área protegida
- Listagem de produtos
- Busca, ordenação e favoritos
- Visualização detalhada via modal
- Paginação incremental
- Tratamento de estados (loading, erro, vazio)

---

## 🚀 Tecnologias Utilizadas

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Query (@tanstack/react-query)**
- **Zustand**
- **Docker**

---

## 🧠 Arquitetura e Decisões Técnicas

### 1. Estrutura base com Next.js

Foi utilizada a abordagem com **App Router**, por ser a forma mais moderna do Next.js e facilitar:

- Code splitting automático
- Organização por rotas
- Uso de Server/Client Components

---

### 2. Autenticação e proteção de rotas

- Login realizado via API externa

- Token armazenado em:
  - `localStorage` (quando "manter logado")
  - `sessionStorage` (caso contrário)

- Middleware implementado para:
  - Bloquear acesso à rota `/produtos` sem autenticação
  - Redirecionar para `/login` automaticamente

---

### 3. Consumo de API

- Utilização de **React Query** para:
  - Cache automático
  - Estados de loading e erro
  - Revalidação

- Endpoints utilizados:
  - Login
  - Listagem de produtos (GET)
  - Busca de produtos (POST)

---

### 4. Gerenciamento de estado global

Foi utilizado **Zustand** para controle de favoritos:

- Armazena os IDs dos produtos favoritos
- Persistência em `localStorage`
- Permite acesso global ao estado
- Simplifica lógica comparado ao uso exclusivo de `useState`

---

### 5. Listagem de produtos

A listagem foi construída com:

- Grid responsivo (Tailwind)
- Cards consistentes (altura e alinhamento padronizados)
- Imagens com `object-contain`
- Formatação de preço em BRL

---

### 6. Busca com debounce

- Implementado debounce de 400ms
- Evita chamadas excessivas à API
- Melhor experiência do usuário

---

### 7. Ordenação

Permite ordenar por:

- Nome (A → Z / Z → A)
- Preço (menor → maior / maior → menor)

A ordenação é feita em memória após o fetch.

---

### 8. Favoritos

- Toggle via ícone de coração ❤️
- Persistência local
- Filtro “Só favoritos”
- Sincronização com Zustand

---

### 9. Paginação incremental (client-side)

A API não fornece paginação server-side, então foi adotada a estratégia:

- Carregar todos os dados
- Exibir em lotes (8 itens por vez)
- Botão **“Carregar mais”**
- Loading incremental simulado

Isso atende o requisito de paginação sem depender da API.

---

### 10. Modal de detalhes

- Abre ao clicar em “CONFIRA”

- Fecha por:
  - clique fora
  - botão fechar
  - tecla `Esc`

- Acessibilidade:
  - `role="dialog"`
  - `aria-modal`
  - `aria-labelledby`

---

### 11. Estados da UI

#### Loading (Skeleton)

- Skeleton completo na primeira carga

#### Erro

- Mensagem amigável
- Botão “Tentar novamente”

#### Estado vazio

- Exibido quando não há resultados

---

### 12. Responsividade e UX

- Abordagem mobile-first
- Layout adaptativo com Tailwind
- Componentes reorganizam corretamente em telas menores

---

### 13. SEO

- Definição de:
  - `<title>`
  - `<meta description>`

- Configuração via `metadata` do Next.js

---

### 14. Docker

A aplicação foi dockerizada para garantir:

- Portabilidade
- Facilidade de execução
- Ambiente consistente

---

## 🧪 Como rodar o projeto

### 🔹 Localmente

```bash
npm install
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

### 🐳 Com Docker

```bash
docker build -t innovation-case .
docker run -p 3000:3000 innovation-case
```

Acesse:

```
http://localhost:3000
```

---

## 📂 Estrutura do Projeto (resumo)

```
app/
  login/
  produtos/
services/
store/
components/
middleware.ts
```

---

## 📈 Possíveis melhorias futuras

- Implementar **focus trap completo** no modal
- Adicionar testes automatizados (unitários e integração)
- Utilizar `next/image` com fallback de imagem
- Melhorar tratamento global de erros (ex: interceptor)
- Implementar paginação server-side (se API suportar)

---

## 🎯 Conclusão

O projeto foi desenvolvido com foco em:

- Clareza de código
- Separação de responsabilidades
- Boa experiência do usuário
- Aderência aos requisitos técnicos

A solução busca equilibrar simplicidade e boas práticas, respeitando as limitações da API fornecida.

---
