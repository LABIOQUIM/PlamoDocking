// src/services/authService.ts
import axios from 'axios';

// Função para autenticar o usuário
export const authenticateUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/authenticate', {  // Usar o proxy com a rota definida
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Erro durante a autenticação', error);
    throw new Error('Falha na autenticação.');
  }
};
