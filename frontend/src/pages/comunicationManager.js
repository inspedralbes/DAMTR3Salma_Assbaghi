// src/communicationManager.js

const BASE_URL = 'http://localhost:4000/api';

export async function getJugadors() {
  const response = await fetch(`${BASE_URL}/jugadors`);
  if (!response.ok) throw new Error('Failed to fetch jugadors');
  return await response.json();
}

export async function deleteJugador(id) {
  const response = await fetch(`${BASE_URL}/jugadors/${id}`, {
    method: 'DELETE',
  });
  console.log(response);
  if (!response.ok) throw new Error('Failed to delete jugador');
}

export async function login(usuari, contrassenya) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuari, contrassenya }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return await response.json(); // suponemos que retorna token o info del usuario
}
