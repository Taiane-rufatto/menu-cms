# Menu CMS

Painel administrativo (CMS) do Cardápio Digital. Consome a API NestJS desenvolvida no 1º bimestre ([menu-backend](https://github.com/Taiane-rufatto/menu-backend)) e permite administrar o cardápio e acompanhar os pedidos do restaurante.

Desenvolvido por Taiane Rufatto, disciplina de Programação.

## Funcionalidades

- **Categorias**: listar (nome, ícone, ordem de exibição e situação), cadastrar, editar e excluir com confirmação.
- **Produtos**: listar (imagem, nome, categoria, preço em reais, vegetariano e novidade), filtrar por categoria, cadastrar, editar (categoria escolhida em um select alimentado pela API) e excluir com confirmação.
- **Mesas**: listar, cadastrar, editar e excluir com confirmação.
- **Comandas**: listar somente as comandas abertas (mesa, data de abertura e total acumulado) e abrir o detalhe.
- **Pedidos**: ver os pedidos de uma comanda (itens, quantidade, preço unitário, subtotal e total), com badge por status, e alterar o status (Novo, Em preparo, Pronto, Entregue).
- **Bônus: Kanban de pedidos**: uma coluna por status; ao arrastar o cartão para outra coluna o status é gravado na API.

## Tecnologias

Mesma stack do projeto `menu-frontend` trabalhado em aula: Vite, React, TypeScript, Tailwind CSS, shadcn/ui, Axios, TanStack Query e React Router.

## Como executar

Pré-requisito: o `menu-backend` rodando (por padrão em `http://localhost:3000`).

```bash
npm install
cp .env.example .env   # no Windows: copy .env.example .env
npm run dev
```

Depois é só abrir `http://localhost:5173`.

### Variáveis de ambiente

| Variável       | Descrição                    | Exemplo                 |
| -------------- | ---------------------------- | ----------------------- |
| `VITE_API_URL` | URL base da API NestJS       | `http://localhost:3000` |

## Organização do código

```
src/
  lib/axios.ts          -> instância única do Axios (baseURL = VITE_API_URL)
  cases/<entidade>/
    dtos/               -> tipos dos dados que vêm/vão para a API
    services/           -> funções que chamam a API usando a instância do Axios
    hooks/              -> useQuery (leituras) e useMutation (gravações) do TanStack Query
    components/         -> componentes da entidade (tabela, formulário, cartão...)
  components/
    ui/                 -> componentes do shadcn/ui
    layout/             -> cabeçalho, menu de navegação e layout
    shared/             -> estados de carregamento/erro/vazio, aviso de sucesso/erro e confirmação de exclusão
  pages/                -> uma página por área do CMS (rotas)
```

## Dependências adicionadas fora da stack obrigatória

| Dependência     | Justificativa |
| --------------- | ------------- |
| `@dnd-kit/core` | Usada somente no Kanban de pedidos (bônus), para arrastar e soltar os cartões entre as colunas. É a biblioteca indicada no enunciado. Uso só `DndContext`, `useDraggable` e `useDroppable`. |

As demais dependências são as mesmas do `package.json` do `menu-frontend`. Os componentes de interface (table, input, select, badge, alert, alert-dialog, checkbox, textarea, card) foram adicionados com `npx shadcn add` e não trazem bibliotecas novas.

## Ajustes feitos no backend

Para atender ao enunciado, o `menu-backend` recebeu:

- `Category`: campo `displayOrder` (ordem de exibição) e edição do ícone.
- `Product`: campos `vegetarian` e `isNew`, e filtro `GET /products?categoryId=`.
- `GuestCheck`: rota `GET /guest-checks?status=OPENED`, que traz a mesa e os pedidos com os itens.
- `Order`: correção da rota `PATCH /orders/:id/status`, transições de status livres, status `DELIVERED` e itens/produto/mesa no retorno de `GET /orders`.
