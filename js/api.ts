import type { ContatoPayload, Depoimento } from './types';

const JSON_PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

export const getDepoimentos = async (numero: number): Promise<Depoimento[]> => {
  const response = await fetch(
    `${JSON_PLACEHOLDER_URL}/comments?_limit=${numero}`
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar depoimentos: ${response.status}`);
  }

  return response.json() as Promise<Depoimento[]>;
};

export const postContato = async (dados: ContatoPayload): Promise<Response> =>
  fetch(`${JSON_PLACEHOLDER_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
