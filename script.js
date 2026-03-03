function atualizarTotal() {
            const itens = document.querySelectorAll('.item-produto');
            let total = 0;
            itens.forEach((checkbox) => {
                if (checkbox.checked) {
                    const valor = parseFloat(checkbox.value) || 0;
                    const qtdInput = checkbox.closest('.card-body').querySelector('.qtd-produto');
                    const quantidade = qtdInput ? parseInt(qtdInput.value, 10) : 1;
                    total += valor * quantidade;
                }
            });
            // formato BRL com Intl
            const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
            const valorSpan = document.getElementById('valor-total');
            if (valorSpan) {
                valorSpan.textContent = fmt.format(total);
            }
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            popularProdutos();

            const checkboxes = document.querySelectorAll('.item-produto');
            const quantidades = document.querySelectorAll('.qtd-produto');
            checkboxes.forEach(cb => cb.addEventListener('change', atualizarTotal));
            quantidades.forEach(q => q.addEventListener('input', atualizarTotal));
        });


function gerarNomeValorRandomico() {
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

    const indice = Math.floor(Math.random() * produtos.length);
    return produtos[indice];
}

function popularProdutos() {
    const cards = document.querySelectorAll('.card');
        const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
        cards.forEach(card => {
        const prod = gerarNomeValorRandomico();
        //const img = card.querySelector('img');
        const titulo = card.querySelector('.card-title');
        const text = card.querySelector('.card-text');
        const checkbox = card.querySelector('.item-produto');
        //if (img) img.src = prod.imagem;
        if (titulo) titulo.textContent = prod.nome;
        if (text) text.textContent = fmt.format(prod.valor);
        if (checkbox) checkbox.value = prod.valor.toFixed(2);
    });
}

