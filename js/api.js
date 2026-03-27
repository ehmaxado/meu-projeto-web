// funções responsáveis por comunicação com APIs

export async function getDepoimentos(numero) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_limit=${numero}`
  );
  if (!response.ok) {
    throw new Error(`Erro ao buscar depoimentos: ${response.status}`);
  }
  return response.json();
}

export async function postContato(dados) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return res;
}
