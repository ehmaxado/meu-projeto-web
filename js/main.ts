import '../scss/style.scss';
import { getDepoimentos, postContato } from './api';
import { initTheme } from './theme';
import { atualizarTotalCard, gerarCardHTML, mostrarNotificacao } from './ui';
import type {
  CarrinhoItem,
  ContatoPayload,
  Depoimento,
  Produto,
} from './types';

type ProdutosFiltro = number | 'all';
type BootstrapModalShowEvent = Event & { relatedTarget: EventTarget | null };

declare global {
  interface Window {
    toggleCarrinho: () => void;
    limparCarrinho: () => void;
    finalizarCompra: () => void;
    removerDoCarrinho: (index: number) => void;
    alterarQuantidade: (index: number, valor: number) => void;
  }
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const produtos: Produto[] = [
  {
    nome: 'Apple iPhone 15 (128GB)',
    valor: 4999,
    imagem:
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-hero-select-202309?wid=470&hei=556&fmt=png-alpha',
  },
  {
    nome: 'Sony PlayStation 5 (Console)',
    valor: 3899,
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/1/10/PS5_console_and_DualSense_controller.png',
  },
  {
    nome: 'Microsoft Xbox Series X',
    valor: 3499,
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/4/43/Xbox_Series_X.png',
  },
  {
    nome: 'Nintendo Switch OLED',
    valor: 2399,
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/8/83/Nintendo_Switch_OLED_model.png',
  },
  {
    nome: 'Apple Watch Series 9',
    valor: 3999,
    imagem:
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-s9-hero-202309',
  },
  {
    nome: 'Samsung Galaxy A55 5G',
    valor: 2499,
    imagem:
      'https://images.samsung.com/is/image/samsung/br-galaxy-a55-5g-a556-sm-a556elbgzto-534951766?$650_519_PNG$',
  },
  {
    nome: 'Amazon Kindle 11a Geracao',
    valor: 499,
    imagem: 'https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_SL1000_.jpg',
  },
  {
    nome: 'GoPro HERO12 Black',
    valor: 2999,
    imagem: 'https://gopro.com/content/dam/help/hero12-black/hero12-black.png',
  },
  {
    nome: 'Camera Canon EOS Rebel T7',
    valor: 3299,
    imagem: 'https://m.media-amazon.com/images/I/71EWRyqzw0L._AC_SL1500_.jpg',
  },
  {
    nome: 'Monitor LG 27" Full HD',
    valor: 1199,
    imagem:
      'https://www.lg.com/br/images/monitores/md07508427/gallery/large01.jpg',
  },
  {
    nome: 'Teclado Mecanico Logitech G413',
    valor: 599,
    imagem:
      'https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_auto/content/dam/gaming/en/products/g413/gallery/g413-gallery-1.png',
  },
  {
    nome: 'Mouse Logitech G502 Hero',
    valor: 349,
    imagem:
      'https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_auto/content/dam/gaming/en/products/g502-hero/gallery/g502-hero-gallery-1.png',
  },
  {
    nome: 'Caixa de Som JBL Flip 6',
    valor: 699,
    imagem:
      'https://jblstore.com.br/media/catalog/product/f/l/flip6_preto_1.jpg',
  },
  {
    nome: 'Fone JBL Tune 510BT',
    valor: 249,
    imagem:
      'https://jblstore.com.br/media/catalog/product/t/u/tune510bt_preto_1.jpg',
  },
  {
    nome: 'SSD Kingston NV2 1TB',
    valor: 399,
    imagem:
      'https://media.kingston.com/kingston/product/ktc-product-ssd-nv2-pcie-4-nvme-m2-2280-1tb-2-zm-lg.jpg',
  },
  {
    nome: 'Placa de Video NVIDIA GeForce RTX 4060',
    valor: 2199,
    imagem:
      'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4060/gallery/rtx-4060-gallery-1.jpg',
  },
  {
    nome: 'Samsung Smart TV 55" 4K',
    valor: 2899,
    imagem:
      'https://images.samsung.com/is/image/samsung/br-uhd-4k-tv-au7700-un55au7700gxzd-frontblack-368893188',
  },
  {
    nome: 'Apple AirPods Pro (2a geracao)',
    valor: 2499,
    imagem:
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83',
  },
  {
    nome: 'Tablet Samsung Galaxy Tab S9',
    valor: 4599,
    imagem:
      'https://images.samsung.com/is/image/samsung/br-galaxy-tab-s9-highlights-kv-530245183?$650_519_PNG$',
  },
  {
    nome: 'Samsung Galaxy S24 (mockup)',
    valor: 4299,
    imagem:
      'https://images.samsung.com/is/image/samsung/assets/levant/galaxy-s24/gallery/levant-galaxy-s24-purple-01.png',
  },
];

let carrinho: CarrinhoItem[] = [];

const parseCurrencyValue = (value: string): number =>
  Number.parseFloat(
    value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
  );

const getInputValue = (id: string): string => {
  const field = document.getElementById(id);

  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement
  ) {
    return field.value.trim();
  }

  return '';
};

const carregarCarrinho = (): void => {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  carrinho = carrinhoSalvo ? (JSON.parse(carrinhoSalvo) as CarrinhoItem[]) : [];
  atualizarCarrinho();
};

const salvarCarrinho = (): void => {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
};

const adicionarItemAoCarrinho = (item: CarrinhoItem): void => {
  const itemExistente = carrinho.find(({ nome }) => nome === item.nome);

  if (itemExistente) {
    itemExistente.quantidade += item.quantidade;
  } else {
    carrinho = [...carrinho, item];
  }

  salvarCarrinho();
};

const adicionarAoCarrinho = (card: Element | null): void => {
  const nome = card
    ?.querySelector<HTMLElement>('.card-title')
    ?.textContent?.trim();
  const precoText =
    card?.querySelector<HTMLElement>('.card-text')?.textContent ?? '';
  const quantidade = Number.parseInt(
    card?.querySelector<HTMLInputElement>('.qtd-produto')?.value ?? '0',
    10
  );

  if (!nome) {
    return;
  }

  if (quantidade <= 0) {
    mostrarNotificacao('Selecione uma quantidade maior que 0.');
    return;
  }

  adicionarItemAoCarrinho({
    nome,
    preco: parseCurrencyValue(precoText),
    quantidade,
  });

  mostrarNotificacao(`Item adicionado ao carrinho: ${quantidade}x ${nome}`);

  const quantidadeInput = card?.querySelector<HTMLInputElement>('.qtd-produto');
  if (quantidadeInput) {
    quantidadeInput.value = '0';
  }
};

const alterarQuantidade = (index: number, valor: number): void => {
  const item = carrinho[index];

  if (!item) {
    return;
  }

  item.quantidade += valor;

  if (item.quantidade <= 0) {
    removerDoCarrinho(index);
    return;
  }

  salvarCarrinho();
};

const removerDoCarrinho = (index: number): void => {
  const item = carrinho[index];

  if (item && window.confirm(`Deseja remover "${item.nome}" do carrinho?`)) {
    carrinho.splice(index, 1);
    salvarCarrinho();
  }
};

const limparCarrinho = (): void => {
  if (window.confirm('Tem certeza que deseja limpar o carrinho?')) {
    carrinho = [];
    salvarCarrinho();
  }
};

const finalizarCompra = (): void => {
  if (carrinho.length === 0) {
    mostrarNotificacao('Carrinho vazio!');
    return;
  }

  mostrarNotificacao('Compra realizada com sucesso!');
  carrinho = [];
  salvarCarrinho();
};

const atualizarCarrinho = (): void => {
  const botaoCarrinho = document.getElementById('botao-carrinho');
  const listaCarrinho = document.getElementById('lista-carrinho');
  const totalCarrinho = document.getElementById('total-carrinho');

  if (botaoCarrinho) {
    botaoCarrinho.innerHTML =
      carrinho.length === 0
        ? 'Carrinho'
        : `Carrinho <span class="cart-badge">${carrinho.length}</span>`;
  }

  if (!listaCarrinho || !totalCarrinho) {
    return;
  }

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML =
      '<p class="text-center text-muted">Carrinho vazio</p>';
    totalCarrinho.textContent = 'R$ 0,00';
    return;
  }

  let total = 0;
  listaCarrinho.innerHTML = '';

  carrinho.forEach(({ nome, preco, quantidade }, index) => {
    const subtotal = preco * quantidade;
    total += subtotal;

    const linha = document.createElement('div');
    linha.className = 'card mb-3';
    linha.innerHTML = `
      <div class="card-body p-3">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h6 class="card-title mb-0">${nome}</h6>
          <button class="btn btn-sm btn-link text-danger p-0" onclick="removerDoCarrinho(${index})" title="Remover item">Remover</button>
        </div>
        <p class="card-text mb-2">
          <small class="text-muted">Preco: ${currencyFormatter.format(preco)}</small>
        </p>
        <div class="mb-2">
          <label class="form-label mb-1"><small>Quantidade:</small></label>
          <div class="input-group input-group-sm">
            <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${index}, -1)">-</button>
            <input type="number" class="form-control text-center" value="${quantidade}" readonly>
            <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${index}, 1)">+</button>
          </div>
        </div>
        <p class="cart-item-subtotal mb-0">
          <strong>Subtotal: ${currencyFormatter.format(subtotal)}</strong>
        </p>
      </div>
    `;
    listaCarrinho.appendChild(linha);
  });

  totalCarrinho.textContent = currencyFormatter.format(total);
};

const toggleCarrinho = (): void => {
  document.getElementById('popup-carrinho')?.classList.toggle('ativo');
};

const carregarDepoimentos = async (): Promise<void> => {
  try {
    const numero = Math.floor(Math.random() * 20) + 1;
    const dados = await getDepoimentos(numero);
    const container = document.getElementById('lista-depoimentos');

    if (!container) {
      return;
    }

    container.innerHTML = '';
    dados.forEach(({ name, body, email }: Depoimento) => {
      container.innerHTML += `
        <div class="col-md-4 mb-3">
          <div class="card card-depoimento h-100">
            <div class="card-body card-depoimento__body">
              <h5 class="card-title card-depoimento__titulo">${name}</h5>
              <p class="card-text card-depoimento__texto">${body}</p>
              <br>
              <p class="card-subtitle text-muted card-depoimento__meta">&nbsp;- ${email}</p>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error('Nao foi possivel carregar depoimentos', error);
  }
};

const gerarNomeValorRandomico = (): Produto => {
  const indice = Math.floor(Math.random() * produtos.length);
  return produtos[indice] ?? produtos[0];
};

const popularProdutos = (num: ProdutosFiltro): void => {
  const container = document.getElementById('produtos-container');

  if (!container) {
    return;
  }

  const produtosParaMostrar =
    num === 'all'
      ? produtos
      : Array.from({ length: num }, () => gerarNomeValorRandomico());

  container.innerHTML = produtosParaMostrar.map(gerarCardHTML).join('');

  container
    .querySelectorAll<HTMLInputElement>('.qtd-produto')
    .forEach((qtd) => {
      ['input', 'change', 'keyup'].forEach((eventName) => {
        qtd.addEventListener(eventName, () => atualizarTotalCard(qtd));
      });
    });

  container
    .querySelectorAll<HTMLButtonElement>('.adicionar-carrinho')
    .forEach((botao) => {
      botao.addEventListener('click', ({ currentTarget }) => {
        const button = currentTarget as HTMLButtonElement | null;
        const card = button ? button.closest('.card') : null;
        adicionarAoCarrinho(card);
      });
    });
};

const coletarDadosContato = (): ContatoPayload => ({
  nome: getInputValue('nome'),
  email: getInputValue('email'),
  mensagem: getInputValue('mensagem'),
});

const validarDadosContato = ({
  nome,
  email,
  mensagem,
}: ContatoPayload): boolean => {
  if (!nome || !email || !mensagem) {
    mostrarNotificacao('Preencha todos os campos.', 'danger');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    mostrarNotificacao('Informe um e-mail valido.', 'danger');
    return false;
  }

  return true;
};

const configurarFormularioContato = (): void => {
  const formContato = document.querySelector<HTMLFormElement>('form');

  if (
    !formContato ||
    !(document.getElementById('nome') instanceof HTMLInputElement)
  ) {
    return;
  }

  formContato.addEventListener('submit', async (event) => {
    event.preventDefault();
    const dados = coletarDadosContato();

    if (!validarDadosContato(dados)) {
      return;
    }

    try {
      const response = await postContato(dados);

      if (response.ok && response.status === 201) {
        mostrarNotificacao('Mensagem enviada com sucesso!', 'success');
      } else {
        mostrarNotificacao('Erro ao enviar a mensagem.', 'danger');
      }
    } catch (error) {
      console.error('Falha no envio do contato', error);
      mostrarNotificacao('Erro ao enviar a mensagem.', 'danger');
    }
  });
};

const configurarFechamentoCarrinho = (): void => {
  document
    .getElementById('popup-carrinho')
    ?.addEventListener('click', (event) => {
      event.stopPropagation();
    });

  document.addEventListener('click', ({ target }) => {
    const popup = document.getElementById('popup-carrinho');
    const botao = document.getElementById('botao-carrinho');

    if (
      popup &&
      botao &&
      target instanceof Node &&
      !popup.contains(target) &&
      !botao.contains(target)
    ) {
      popup.classList.remove('ativo');
    }
  });
};

const configurarModalProduto = (): void => {
  const modalDetalhes = document.getElementById('modalDetalhesProduto');

  if (!modalDetalhes) {
    return;
  }

  modalDetalhes.addEventListener('show.bs.modal', (event: Event) => {
    const { relatedTarget } = event as BootstrapModalShowEvent;
    const botao = relatedTarget instanceof HTMLElement ? relatedTarget : null;
    const modalTitulo = modalDetalhes.querySelector<HTMLElement>(
      '#modalDetalhesProdutoLabel'
    );
    const modalDescricao = modalDetalhes.querySelector<HTMLElement>(
      '#modal-produto-descricao'
    );
    const modalPreco = modalDetalhes.querySelector<HTMLElement>(
      '#modal-produto-preco'
    );
    const modalImagem = modalDetalhes.querySelector<HTMLImageElement>(
      '#modal-produto-imagem'
    );
    const modalQuantidade = modalDetalhes.querySelector<HTMLInputElement>(
      '#modal-produto-quantidade'
    );
    const btnAdicionar = modalDetalhes.querySelector<HTMLButtonElement>(
      '#modal-adicionar-carrinho'
    );

    if (
      !botao ||
      !modalTitulo ||
      !modalDescricao ||
      !modalPreco ||
      !modalImagem ||
      !modalQuantidade ||
      !btnAdicionar
    ) {
      return;
    }

    const {
      nome = '',
      preco = '0',
      descricao = '',
      imagem = '',
    } = botao.dataset;
    const precoNumerico = Number.parseFloat(preco);

    modalTitulo.textContent = nome;
    modalDescricao.textContent = descricao;
    modalPreco.textContent = currencyFormatter.format(precoNumerico);
    modalImagem.src = imagem;
    modalImagem.alt = nome;
    modalQuantidade.value = '1';

    btnAdicionar.onclick = () => {
      const quantidade = Number.parseInt(modalQuantidade.value, 10);

      if (quantidade <= 0) {
        mostrarNotificacao('Selecione uma quantidade maior que 0.');
        return;
      }

      adicionarItemAoCarrinho({
        nome,
        preco: precoNumerico,
        quantidade,
      });

      mostrarNotificacao(`Item adicionado ao carrinho: ${quantidade}x ${nome}`);
    };
  });
};

window.toggleCarrinho = toggleCarrinho;
window.limparCarrinho = limparCarrinho;
window.finalizarCompra = finalizarCompra;
window.removerDoCarrinho = removerDoCarrinho;
window.alterarQuantidade = alterarQuantidade;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  carregarCarrinho();
  configurarFechamentoCarrinho();
  configurarModalProduto();

  const select = document.getElementById('num-produtos');
  if (select instanceof HTMLSelectElement) {
    popularProdutos(3);
    select.addEventListener('change', () => {
      const value =
        select.value === 'all' ? 'all' : Number.parseInt(select.value, 10);
      popularProdutos(value);
    });
  }

  carregarDepoimentos();
  configurarFormularioContato();
});
