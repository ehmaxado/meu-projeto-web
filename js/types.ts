export interface Produto {
  nome: string;
  valor: number;
  imagem: string;
  descricao?: string;
}

export interface CarrinhoItem {
  nome: string;
  preco: number;
  quantidade: number;
}

export interface Depoimento {
  name: string;
  body: string;
  email: string;
}

export interface ContatoPayload {
  nome: string;
  email: string;
  mensagem: string;
}
