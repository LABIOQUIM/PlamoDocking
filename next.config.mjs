import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/authenticate',  // Rota do frontend para autenticação
        destination: 'http://localhost:8000/Plasmodocking/back/authenticate',
      },
      {
        source: '/api/create-user',  // Rota do frontend para criação de usuário
        destination: 'http://localhost:8000/Plasmodocking/back/create-user/',
      },
      {
        source: '/api/process-plasmodocking',  // Rota do frontend para processamento do Plasmodocking
        destination: 'http://localhost:8000/Plasmodocking/back/process-plasmodocking/',
      },
      {
        source: '/api/api_delete/:idItem',  // Rota do frontend para deletar item
        destination: 'http://localhost:8000/Plasmodocking/back/api_delete/:idItem/',
      },
      {
        source: '/api/get_resultado/:idFromUrl',  // Rota do frontend para obter resultado
        destination: 'http://localhost:8000/Plasmodocking/back/get_resultado/:idFromUrl/',
      },
      {
        source: '/api/process-plasmodocking/by-user',  // Rota do frontend para processar por usuário
        destination: 'http://localhost:8000/Plasmodocking/back/process-plasmodocking/by-user/',
      },
      {
        source: '/api/api_download/:idItem',  // Rota do frontend para baixar item
        destination: 'http://localhost:8000/Plasmodocking/back/api_download/:idItem/',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
