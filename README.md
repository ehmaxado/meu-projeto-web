# MeuProjeto Web

Projeto front-end estático desenvolvido com HTML, CSS, Bootstrap e JavaScript modular. A aplicação simula uma pequena vitrine de produtos com carrinho de compras, exibição de depoimentos e formulário de contato.

## Visão geral

O projeto é composto por três páginas principais:

- `index.html`: página inicial com mensagem de boas-vindas e depoimentos carregados de uma API externa.
- `produtos.html`: catálogo de produtos com seleção de quantidade, modal de detalhes e integração com carrinho.
- `contatos.html`: formulário de contato com validação no navegador e envio para API de teste.

O carrinho é compartilhado entre as páginas por meio do `localStorage`, então os itens permanecem disponíveis durante a navegação no mesmo navegador.

## Funcionalidades

- Navegação entre páginas com barra fixa no topo.
- Carrinho lateral com:
  - adição de produtos;
  - alteração de quantidade;
  - remoção de itens;
  - limpeza completa;
  - cálculo automático do total;
  - persistência em `localStorage`.
- Listagem dinâmica de produtos na página de produtos.
- Filtro de quantidade de produtos exibidos: `3`, `6`, `9` ou `Todos`.
- Modal de detalhes do produto.
- Depoimentos carregados dinamicamente da API JSONPlaceholder.
- Formulário de contato com validação de campos obrigatórios e e-mail.
- Notificações visuais do tipo toast para feedback ao usuário.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript ES Modules
- Bootstrap 5 via CDN
- JSONPlaceholder para simulação de API
- `localStorage` do navegador

## Estrutura do projeto

```text
meu-projeto-web/
|-- contatos.html
|-- index.html
|-- produtos.html
|-- style.css
|-- README.md
`-- js/
    |-- api.js
    |-- main.js
    `-- ui.js
```

## Responsabilidade dos arquivos

### Páginas HTML

- `index.html`: renderiza a home e o container de depoimentos.
- `produtos.html`: contém o seletor de quantidade de produtos, o container dos cards e o modal de detalhes.
- `contatos.html`: contém o formulário de contato.

### JavaScript

- `js/api.js`
  - centraliza as chamadas HTTP;
  - busca depoimentos com `getDepoimentos(numero)`;
  - envia dados do formulário com `postContato(dados)`.

- `js/main.js`
  - mantém o estado do carrinho;
  - inicializa eventos da aplicação;
  - renderiza depoimentos;
  - popula produtos;
  - controla modal, carrinho e formulário de contato.

- `js/ui.js`
  - gera notificações toast;
  - monta o HTML dos cards de produto;
  - recalcula o total do card com base na quantidade selecionada.

### CSS

- `style.css`
  - ajusta a navbar fixa;
  - estiliza o carrinho lateral;
  - estiliza notificações toast;
  - define espaçamentos e ajustes visuais dos cards.

## Como executar

Como o projeto é estático, há duas formas simples de abrir:

### Opção 1: abrir diretamente no navegador

Abra o arquivo `index.html` em um navegador moderno.

### Opção 2: usar um servidor local

Recomendado para desenvolvimento.

Exemplos:

```powershell
cd "c:\Users\Emerson\Documents\Pessoal\Faculdade\Semestre 3\Front\ProjetoFront\meu-projeto-web"
python -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

## Dependências externas

O projeto depende de recursos carregados pela internet:

- Bootstrap CSS e JS via CDN.
- API `https://jsonplaceholder.typicode.com` para depoimentos e envio do contato.
- Imagens aleatórias de produtos via `https://picsum.photos`.

Sem conexão com a internet, parte das funcionalidades visuais e dinâmicas pode não funcionar corretamente.

## Fluxo principal da aplicação

### 1. Inicialização

Quando o `DOMContentLoaded` é disparado, a aplicação:

- carrega o carrinho salvo no navegador;
- ativa o comportamento de abrir e fechar o carrinho;
- configura o modal de detalhes de produto, quando existir na página;
- configura o seletor de quantidade de produtos, quando existir;
- carrega depoimentos, quando existir o container correspondente;
- configura o formulário de contato, quando existir um formulário compatível.

### 2. Produtos

Na página `produtos.html`:

- os produtos exibidos são gerados em JavaScript;
- ao selecionar `3`, `6` ou `9`, são escolhidos produtos aleatórios da lista interna;
- ao selecionar `Todos`, a lista completa é exibida;
- cada card permite alterar quantidade, ver detalhes e adicionar ao carrinho.

### 3. Carrinho

O carrinho:

- salva os itens em `localStorage` na chave `carrinho`;
- soma quantidades quando o mesmo item é adicionado novamente;
- recalcula o total a cada alteração;
- pode ser acessado em qualquer página do site.

### 4. Contato

Na página `contatos.html`:

- os campos são validados antes do envio;
- o e-mail precisa estar em formato válido;
- os dados são enviados para uma API de testes;
- o usuário recebe feedback visual de sucesso ou erro.

## Observações importantes

- O projeto não possui back-end próprio.
- O envio do formulário usa um endpoint de teste e não grava dados reais de contato.
- Os depoimentos também vêm de uma API pública de demonstração.
- As imagens exibidas nos cards de produtos são geradas aleatoriamente via Picsum, mesmo que exista uma lista de URLs de imagens definida no código.

## Melhorias futuras sugeridas

- Integrar os produtos a uma API real.
- Exibir imagens reais dos produtos cadastrados.
- Adicionar página de checkout.
- Implementar máscara e mensagens de validação mais detalhadas no formulário.
- Criar testes para os módulos JavaScript.
- Separar melhor as responsabilidades entre estado, API e renderização.

## Autor

Projeto acadêmico/front-end para estudo de HTML, CSS, Bootstrap e JavaScript.