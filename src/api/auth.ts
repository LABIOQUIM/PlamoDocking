// src/services/authService.ts
import api from '@/api/api'; // Importa a instância de axios ou API

// Função para autenticar o usuário
export const authenticateUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/Plasmodocking/back/authenticate', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Erro durante a autenticação', error);
    throw new Error('Falha na autenticação.');
  }
};
