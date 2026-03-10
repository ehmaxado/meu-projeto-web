// funções de manipulação do DOM e exibição

export function criarContainerToast() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

export function mostrarNotificacao(mensagem, tipo = 'success') {
    const container = document.getElementById('toast-container') || criarContainerToast();
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
    const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="https://picsum.photos/300/250?random=${Math.floor(Math.random() * 1000)}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">${fmt.format(produto.valor)}</p>
                    <div class="mb-2">
                        <label class="form-label">Quantidade:</label>
                        <input type="number" class="form-control qtd-produto" value="1" min="0">
                    </div>
                    <p>Total: <span class="total-produto">R$ 0,00</span></p>
                    <button class="btn btn-primary adicionar-carrinho">Adicionar ao Carrinho</button>
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
    let preco = precoText.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    preco = parseFloat(preco);

    const quantidade = parseInt(inputElement.value, 10) || 0;
    const total = preco * quantidade;

    const totalSpan = card.querySelector('.total-produto');
    if (totalSpan) {
        const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
        totalSpan.textContent = fmt.format(total);
    }
}