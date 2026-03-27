// funções de manipulação do DOM e exibição

export function criarContainerToast() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

export function mostrarNotificacao(mensagem, tipo = 'success') {
  const container =
    document.getElementById('toast-container') || criarContainerToast();
  const toast = document.createElement('div');
  toast.className = `toast-notificacao ${tipo}`;
  toast.textContent = mensagem;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('sair');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

export function gerarCardHTML(produto) {
  const fmt = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const imagemRandom = `https://picsum.photos/300/250?random=${Math.floor(Math.random() * 1000)}`;
  const descricao =
    produto.descricao ||
    `Descrição detalhada do produto ${produto.nome}. Produto de alta qualidade com excelente custo-benefício.`;
  const totalInicial = fmt.format(produto.valor * 1); // Calcula total inicial com quantidade 1

  return `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${imagemRandom}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">${fmt.format(produto.valor)}</p>
                    <div class="mb-2">
                        <label class="form-label">Quantidade:</label>
                        <input type="number" class="form-control qtd-produto" value="1" min="0">
                    </div>
                    <p>Total: <span class="total-produto">${totalInicial}</span></p>
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
}

export function atualizarTotalCard(inputElement) {
  const card = inputElement.closest('.card');
  if (!card) return;

  const precoElement = card.querySelector('.card-text');
  if (!precoElement) return;

  const precoText = precoElement.textContent.trim();
  let preco = precoText
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();
  preco = parseFloat(preco);

  const quantidade = parseInt(inputElement.value, 10) || 0;
  const total = preco * quantidade;

  const totalSpan = card.querySelector('.total-produto');
  if (totalSpan) {
    const fmt = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    totalSpan.textContent = fmt.format(total);
  }
}
