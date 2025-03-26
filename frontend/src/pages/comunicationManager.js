// src/communicationManager.js

const BASE_URL = 'http://localhost:4000/api';

export async function getJugadors() {
  const response = await fetch(`${BASE_URL}/usuaris`);
  if (!response.ok) throw new Error('Failed to fetch jugadors');
  return await response.json();
}

export async function deleteJugador(id) {
  const response = await fetch(`${BASE_URL}/usuaris/${id}`, {
    method: 'DELETE',
  });
  console.log(response);
  if (!response.ok) throw new Error('Failed to delete jugador');
}

export async function getPersonatge() {
  const response = await fetch(`${BASE_URL}/personatges`);
  if (!response.ok) throw new Error('Failed to fetch jugadors');
  return await response.json();
}

export async function deletePersonatge(id) {
  const response = await fetch(`${BASE_URL}/personatges/${id}`, {
    method: 'DELETE',
  });
  console.log(response);
  if (!response.ok) throw new Error('Failed to delete jugador');
}

export async function updatePersonatge(id, data) {
  const response = await fetch(`http://localhost:4000/api/personatges/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Error actualitzant personatge')
  return await response.json()
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
