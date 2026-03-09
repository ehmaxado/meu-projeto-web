// =====================================
// DADOS - Produtos
// =====================================
const produtos = [
    { nome: 'Apple iPhone 15 (128GB)', valor: 4999.00, imagem: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-hero-select-202309?wid=470&hei=556&fmt=png-alpha' },
    { nome: 'Sony PlayStation 5 (Console)', valor: 3899.00, imagem: 'https://upload.wikimedia.org/wikipedia/commons/1/10/PS5_console_and_DualSense_controller.png' },
    { nome: 'Microsoft Xbox Series X', valor: 3499.00, imagem: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Xbox_Series_X.png' },
    { nome: 'Nintendo Switch OLED', valor: 2399.00, imagem: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Nintendo_Switch_OLED_model.png' },
    { nome: 'Apple Watch Series 9', valor: 3999.00, imagem: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-s9-hero-202309' },
    { nome: 'Samsung Galaxy A55 5G', valor: 2499.00, imagem: 'https://images.samsung.com/is/image/samsung/br-galaxy-a55-5g-a556-sm-a556elbgzto-534951766?$650_519_PNG$' },
    { nome: 'Amazon Kindle 11ª Geração', valor: 499.00, imagem: 'https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_SL1000_.jpg' },
    { nome: 'GoPro HERO12 Black', valor: 2999.00, imagem: 'https://gopro.com/content/dam/help/hero12-black/hero12-black.png' },
    { nome: 'Câmera Canon EOS Rebel T7', valor: 3299.00, imagem: 'https://m.media-amazon.com/images/I/71EWRyqzw0L._AC_SL1500_.jpg' },
    { nome: 'Monitor LG 27" Full HD', valor: 1199.00, imagem: 'https://www.lg.com/br/images/monitores/md07508427/gallery/large01.jpg' },
    { nome: 'Teclado Mecânico Logitech G413', valor: 599.00, imagem: 'https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_auto/content/dam/gaming/en/products/g413/gallery/g413-gallery-1.png' },
    { nome: 'Mouse Logitech G502 Hero', valor: 349.00, imagem: 'https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_auto/content/dam/gaming/en/products/g502-hero/gallery/g502-hero-gallery-1.png' },
    { nome: 'Caixa de Som JBL Flip 6', valor: 699.00, imagem: 'https://jblstore.com.br/media/catalog/product/f/l/flip6_preto_1.jpg' },
    { nome: 'Fone JBL Tune 510BT', valor: 249.00, imagem: 'https://jblstore.com.br/media/catalog/product/t/u/tune510bt_preto_1.jpg' },
    { nome: 'SSD Kingston NV2 1TB', valor: 399.00, imagem: 'https://media.kingston.com/kingston/product/ktc-product-ssd-nv2-pcie-4-nvme-m2-2280-1tb-2-zm-lg.jpg' },
    { nome: 'Placa de Vídeo NVIDIA GeForce RTX 4060', valor: 2199.00, imagem: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4060/gallery/rtx-4060-gallery-1.jpg' },
    { nome: 'Samsung Smart TV 55" 4K', valor: 2899.00, imagem: 'https://images.samsung.com/is/image/samsung/br-uhd-4k-tv-au7700-un55au7700gxzd-frontblack-368893188' },
    { nome: 'Apple AirPods Pro (2ª geração)', valor: 2499.00, imagem: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83' },
    { nome: 'Tablet Samsung Galaxy Tab S9', valor: 4599.00, imagem: 'https://images.samsung.com/is/image/samsung/br-galaxy-tab-s9-highlights-kv-530245183?$650_519_PNG$' },
    { nome: 'Samsung Galaxy S24 (mockup)', valor: 4299.00, imagem: 'https://images.samsung.com/is/image/samsung/assets/levant/galaxy-s24/gallery/levant-galaxy-s24-purple-01.png' }
];

// =====================================
// ESTADO - Carrinho
// =====================================
let carrinho = [];

// =====================================
// NOTIFICAÇÕES
// =====================================
function mostrarNotificacao(mensagem) {
    const container = document.getElementById('toast-container') || criarContainerToast();
    const toast = document.createElement('div');
    toast.className = 'toast-notificacao';
    toast.textContent = mensagem;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('sair');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function criarContainerToast() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// =====================================
// GERENCIAMENTO DO CARRINHO
// =====================================
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    carrinho = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
    atualizarCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function adicionarAoCarrinho(card) {
    const nome = card.querySelector('.card-title').textContent;
    const precoText = card.querySelector('.card-text').textContent;
    let preco = precoText.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    preco = parseFloat(preco);
    const quantidade = parseInt(card.querySelector('.qtd-produto').value, 10);
    
    if (quantidade <= 0) {
        mostrarNotificacao('Selecione uma quantidade maior que 0.');
        return;
    }
    
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome, preco, quantidade });
    }
    
    salvarCarrinho();
    mostrarNotificacao(`✓ Adicionado ao carrinho: ${quantidade}x ${nome}`);
    card.querySelector('.qtd-produto').value = '0';
}

function alterarQuantidade(index, valor) {
    carrinho[index].quantidade += valor;
    if (carrinho[index].quantidade <= 0) {
        removerDoCarrinho(index);
    } else {
        salvarCarrinho();
    }
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
}

function limparCarrinho() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        carrinho = [];
        salvarCarrinho();
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        mostrarNotificacao('Carrinho vazio!');
        return;
    }
    mostrarNotificacao('✓ Compra realizada com sucesso!');
    carrinho = [];
    salvarCarrinho();
}

// =====================================
// INTERFACE DO CARRINHO
// =====================================
function atualizarCarrinho() {
    const botaoCarrinho = document.getElementById('botao-carrinho');
    
    if (carrinho.length === 0) {
        botaoCarrinho.innerHTML = '🛒';
    } else {
        botaoCarrinho.innerHTML = `🛒<span class="cart-badge">${carrinho.length}</span>`;
    }
    
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    
    if (!listaCarrinho) return;
    
    listaCarrinho.innerHTML = '';
    let total = 0;
    
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p class="text-center text-muted">Carrinho vazio</p>';
        totalCarrinho.textContent = 'R$ 0,00';
    } else {
        const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
        
        carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            
            const linha = document.createElement('div');
            linha.className = 'card mb-3';
            linha.innerHTML = `
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h6 class="card-title mb-0">${item.nome}</h6>
                        <button class="btn btn-sm btn-link text-danger p-0" onclick="removerDoCarrinho(${index})" title="Remover item">🗑️</button>
                    </div>
                    <p class="card-text mb-2">
                        <small class="text-muted">Preço: ${fmt.format(item.preco)}</small>
                    </p>
                    <div class="mb-2">
                        <label class="form-label mb-1"><small>Quantidade:</small></label>
                        <div class="input-group input-group-sm">
                            <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${index}, -1)">−</button>
                            <input type="number" class="form-control text-center" value="${item.quantidade}" readonly>
                            <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${index}, 1)">+</button>
                        </div>
                    </div>
                    <p class="cart-item-subtotal mb-0">
                        <strong>Subtotal: ${fmt.format(subtotal)}</strong>
                    </p>
                </div>
            `;
            listaCarrinho.appendChild(linha);
        });
        
        totalCarrinho.textContent = fmt.format(total);
    }
}

function toggleCarrinho() {
    const popup = document.getElementById('popup-carrinho');
    popup.classList.toggle('ativo');
}

// =====================================
// PRODUTOS E CARDS
// =====================================
function atualizarTotalCard(inputElement) {
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

function gerarCardHTML(produto) {
    const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}" class="card-img-top" alt="${produto.nome}">
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

function gerarNomeValorRandomico() {
    const indice = Math.floor(Math.random() * produtos.length);
    return produtos[indice];
}

function popularProdutos(num) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';
    let produtosParaMostrar = [];
    
    if (num === 'all') {
        produtosParaMostrar = produtos;
    } else {
        for (let i = 0; i < num; i++) {
            produtosParaMostrar.push(gerarNomeValorRandomico());
        }
    }
    
    produtosParaMostrar.forEach(prod => {
        container.innerHTML += gerarCardHTML(prod);
    });
    
    const quantidades = container.querySelectorAll('.qtd-produto');
    quantidades.forEach(q => {
        q.addEventListener('input', function() {
            atualizarTotalCard(this);
        });
        q.addEventListener('change', function() {
            atualizarTotalCard(this);
        });
        q.addEventListener('keyup', function() {
            atualizarTotalCard(this);
        });
    });
    
    const botoes = container.querySelectorAll('.adicionar-carrinho');
    botoes.forEach(btn => btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        adicionarAoCarrinho(card);
    }));
}

// =====================================
// INICIALIZAÇÃO
// =====================================
document.addEventListener('DOMContentLoaded', () => {
    carregarCarrinho();
    
    const popup = document.getElementById('popup-carrinho');
    if (popup) {
        popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    document.addEventListener('click', (e) => {
        const popup = document.getElementById('popup-carrinho');
        const botao = document.getElementById('botao-carrinho');
        if (popup && botao && !popup.contains(e.target) && !botao.contains(e.target)) {
            popup.classList.remove('ativo');
        }
    });
    
    const select = document.getElementById('num-produtos');
    if (select) {
        popularProdutos(3);
        select.addEventListener('change', () => {
            const value = select.value === 'all' ? 'all' : parseInt(select.value);
            popularProdutos(value);
        });
    }
});

