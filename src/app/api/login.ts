// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Simule uma verificação com o banco de dados aqui
    if (email === 'test@example.com' && password === 'password123') {
      res.status(200).json({ email, name: 'Test User' });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
