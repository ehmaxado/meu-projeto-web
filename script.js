function atualizarTotal() {
            const itens = document.querySelectorAll('.item-produto');
            let total = 0;
            itens.forEach((checkbox) => {
                if (checkbox.checked) {
                    const valor = parseFloat(checkbox.value) || 0;
                    
                    const qtdId = 'qtd' + checkbox.id.replace('produto', '');
                    const qtdInput = document.getElementById(qtdId);
                    const quantidade = qtdInput ? parseInt(qtdInput.value, 10) : 1;
                    total += valor * quantidade;
                }
            });
            
            const valorSpan = document.getElementById('valor-total');
            if (valorSpan) {
                valorSpan.textContent = total.toFixed(2).replace('.', ',');
            }
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            const checkboxes = document.querySelectorAll('.item-produto');
            const quantidades = document.querySelectorAll('.qtd-produto');
            checkboxes.forEach(cb => cb.addEventListener('change', atualizarTotal));
            quantidades.forEach(q => q.addEventListener('input', atualizarTotal));
        });


 function gerarNomeValorRandomico() {
            const produtos = [
                { nome: 'Produto aleatório 1', valor: 50.00 },
                { nome: 'Produto aleatório 2', valor: 75.00 },
                { nome: 'Produto aleatório 3', valor: 100.00 }
            ];
            const indice = Math.floor(Math.random() * produtos.length);
            return produtos[indice];
        }