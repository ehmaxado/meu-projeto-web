# MeuProjeto Web

Projeto web front-end com catálogo de produtos, carrinho de compras, formulário de contato com auto-preenchimento de endereço por CEP e alternância de tema claro/escuro.

## Link de produção

- Site no ar: https://ehmaxado.github.io/meu-projeto-web/

## Tecnologias utilizadas

### Base da aplicação
- **HTML5** para estrutura das páginas (`index.html`, `produtos.html`, `contatos.html`)
- **CSS3** para estilos customizados e responsividade (`style.css`)
- **JavaScript (ES Modules)** para lógica de interface e integrações (`js/main.js`, `js/ui.js`, `js/api.js`)

### Framework e recursos visuais
- **Bootstrap 5.3.8 (CDN)** para grid, componentes, utilitários e sistema de tema com `data-bs-theme`

### APIs e integração externa
- **Fetch API** para chamadas HTTP assíncronas
- **ViaCEP API** (`https://viacep.com.br/ws/{cep}/json/`) para auto-preenchimento de endereço por CEP
- **JSONPlaceholder API** para simulação de depoimentos e envio de contato em ambiente de teste

### Persistência no cliente
- **localStorage** para:
  - manter o carrinho entre navegações
  - salvar preferência de tema (`light`/`dark`)

### Controle de versão e publicação
- **Git** para versionamento
- **GitHub** para repositório remoto
- **GitHub Pages** para hospedagem estática do site

## Funcionalidades principais

- Listagem dinâmica de produtos
- Carrinho de compras com:
  - adicionar/remover itens
  - alteração de quantidade
  - cálculo de subtotal e total
- Formulário de contato com validações básicas
- Busca automática de CEP com preenchimento de rua, bairro, cidade e estado
- Modo claro/escuro com persistência da preferência
- Layout responsivo para desktop e dispositivos móveis

## Estrutura do projeto

```text
.
├── index.html
├── produtos.html
├── contatos.html
├── style.css
└── js/
    ├── api.js
    ├── main.js
    └── ui.js
```

## Como executar localmente

1. Clone o repositório
2. Abra a pasta no VS Code
3. Execute com extensão de servidor local (ex.: Live Server) ou abra `index.html` no navegador

## Observações

- O endpoint de contato atual usa JSONPlaceholder, portanto é simulado (não persiste dados reais).
- As funcionalidades dependentes de API exigem conexão com internet.
