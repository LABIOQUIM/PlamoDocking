import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/authenticate',  // Rota do frontend para autenticação
        destination: 'http://computacao.unir.br/Plasmodocking/back/authenticate',  // API Django para autenticação
      },
      {
        source: '/api/create-user',  // Rota do frontend para criação de usuário
        destination: 'http://computacao.unir.br/Plasmodocking/back/create-user/',  // API Django para criar usuário
      },
      {
        source: '/api/process-plasmodocking',  // Rota do frontend para processar o Plasmodocking
        destination: 'http://computacao.unir.br/Plasmodocking/back/process-plasmodocking/',  // API Django para o processamento
      },
    ];
  },
};

export default withNextIntl(nextConfig);
