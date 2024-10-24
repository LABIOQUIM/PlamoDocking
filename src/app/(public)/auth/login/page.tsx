'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store'; // Certifique-se de ajustar o caminho correto
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { login } = useAuthStore(); // Função para atualizar o estado de autenticação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null); // Limpa o erro ao tentar logar novamente

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Supondo que a API retorne o nome e email do usuário ao logar
        login({ email: data.email, name: data.name });
        
        // Redireciona para a página principal após o login
        router.push('/plasmodocking/falciparum/withredocking');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao tentar logar');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Erro na comunicação com o servidor');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default LoginPage;
