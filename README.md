# MeuProjeto Web

## Como iniciar o projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm

### Rodando em desenvolvimento

```powershell
npm install
npm run dev
```

Depois, abra no navegador o endereço exibido pelo Vite, normalmente:

```text
http://localhost:5173
```

### Gerando build de produção

```powershell
npm run build
```

Os arquivos finais serão gerados na pasta `dist/`.

## Descrição

Projeto front-end com múltiplas páginas desenvolvido com HTML, JavaScript modular, SCSS e Vite. A aplicação simula uma pequena vitrine de produtos com carrinho de compras, exibição de depoimentos e formulário de contato.

## Páginas do projeto

- `index.html`: página inicial com mensagem de boas-vindas e depoimentos carregados de API externa.
- `produtos.html`: catálogo de produtos com seleção de quantidade, modal de detalhes e integração com carrinho.
- `contatos.html`: formulário de contato com validação no navegador e envio para API de teste.

## Funcionalidades

- Navegação entre páginas com barra fixa no topo.
- Carrinho lateral com adição, alteração de quantidade, remoção, limpeza completa e cálculo automático do total.
- Persistência do carrinho em `localStorage`.
- Listagem dinâmica de produtos.
- Filtro de exibição com opções `3`, `6`, `9` ou `Todos`.
- Modal de detalhes do produto.
- Depoimentos carregados dinamicamente da API JSONPlaceholder.
- Formulário de contato com validação de campos obrigatórios e e-mail.
- Notificações visuais para feedback do usuário.
- Estrutura preparada para build com Vite e organização de estilos em SCSS.

## Tecnologias utilizadas

- HTML5
- JavaScript ES Modules
- SCSS
- Bootstrap 5 via CDN
- Vite
- ESLint
- Prettier
- Husky
- JSONPlaceholder para simulação de API
- `localStorage` do navegador

## Scripts disponíveis

- `npm run dev`: inicia o servidor de desenvolvimento com recarregamento automático.
- `npm run build`: gera a versão de produção na pasta `dist`.
- `npm run lint`: executa a análise estática com ESLint.

## Estrutura do projeto

```text
meu-projeto-web/
|-- contatos.html
|-- index.html
|-- produtos.html
|-- package.json
|-- vite.config.js
|-- js/
|   |-- api.js
|   |-- main.js
|   |-- theme.js
|   `-- ui.js
`-- scss/
    |-- _base.scss
    |-- _cart.scss
    |-- _layout.scss
    |-- _responsive.scss
    |-- _themes.scss
    |-- _tokens.scss
    `-- main.scss
```

## Organização dos arquivos

### HTML

- `index.html`: estrutura da página inicial.
- `produtos.html`: estrutura da vitrine e do modal de produto.
- `contatos.html`: estrutura do formulário de contato.

### JavaScript

- `js/api.js`: centraliza chamadas HTTP para depoimentos e envio do formulário.
- `js/main.js`: inicializa a aplicação, produtos, carrinho, modal e formulário.
- `js/theme.js`: controla comportamento relacionado a tema visual.
- `js/ui.js`: concentra renderizações e componentes visuais de apoio.

### Estilos

- `scss/main.scss`: ponto de entrada dos estilos.
- arquivos parciais em `scss/`: organização por base, layout, responsividade, carrinho, temas e tokens visuais.

## Dependências externas

O projeto depende de recursos carregados pela internet:

- Bootstrap CSS e JS via CDN.
- API `https://jsonplaceholder.typicode.com` para depoimentos e envio do contato.

Sem conexão com a internet, parte das funcionalidades visuais e dinâmicas pode não funcionar corretamente.

## Observações

- O projeto não possui back-end próprio.
- O formulário usa endpoint de teste e não grava contatos reais.
- Os depoimentos vêm de uma API pública de demonstração.
- O carrinho é compartilhado entre as páginas por meio de `localStorage`.

## Melhorias futuras sugeridas

- Integrar os produtos a uma API real.
- Adicionar página de checkout.
- Criar testes automatizados para os módulos JavaScript.
- Refinar a separação entre estado, API e renderização.

## Autor

Projeto acadêmico para estudo de HTML, JavaScript, SCSS e build com Vite.
