import type { Produto } from './types';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const parseCurrencyValue = (value: string): number =>
  Number.parseFloat(
    value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
  );

export const criarContainerToast = (): HTMLDivElement => {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
};

export const mostrarNotificacao = (
  mensagem: string,
  tipo = 'success'
): void => {
  const container =
    document.getElementById('toast-container') ?? criarContainerToast();
  const toast = document.createElement('div');
  toast.className = `toast-notificacao ${tipo}`;
  toast.textContent = mensagem;

  container.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add('sair');
    window.setTimeout(() => toast.remove(), 300);
  }, 2000);
};

export const gerarCardHTML = (produto: Produto): string => {
  const imagemRandom = `https://picsum.photos/300/250?random=${Math.floor(
    Math.random() * 1000
  )}`;
  const descricao =
    produto.descricao ??
    `Descricao detalhada do produto ${produto.nome}. Produto de alta qualidade com excelente custo-beneficio.`;
  const totalInicial = currencyFormatter.format(produto.valor);

  return `
        <div class="col-md-4 mb-4">
            <div class="card card-produto h-100">
                <img src="${imagemRandom}" class="card-img-top card-produto__imagem" alt="${produto.nome}">
                <div class="card-body card-produto__body d-flex flex-column">
                    <h5 class="card-title card-produto__titulo">${produto.nome}</h5>
                    <p class="card-text card-produto__preco">${currencyFormatter.format(produto.valor)}</p>
                    <div class="mb-2">
                        <label class="form-label">Quantidade:</label>
                        <input type="number" class="form-control qtd-produto" value="1" min="0">
                    </div>
                    <p class="card-produto__total">Total: <span class="total-produto">${totalInicial}</span></p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-info btn-ver-detalhes" 
                                data-bs-toggle="modal" 
                                data-bs-target="#modalDetalhesProduto"
                                data-nome="${produto.nome}"
                                data-preco="${produto.valor}"
                                data-descricao="${descricao}"
                                data-imagem="${imagemRandom}">
                            Ver Detalhes
                        </button>
                        <button class="btn btn-primary adicionar-carrinho">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const atualizarTotalCard = (
  inputElement: HTMLInputElement | null
): void => {
  const card = inputElement?.closest('.card');
  const precoElement = card?.querySelector<HTMLElement>('.card-text');
  const totalSpan = card?.querySelector<HTMLElement>('.total-produto');

  if (!inputElement || !precoElement || !totalSpan) {
    return;
  }

  const preco = parseCurrencyValue(precoElement.textContent?.trim() ?? '');
  const quantidade = Number.parseInt(inputElement.value, 10) || 0;
  totalSpan.textContent = currencyFormatter.format(preco * quantidade);
};
