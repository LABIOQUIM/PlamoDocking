import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API;  // Captura a variável de ambiente
    return [
      {
        source: '/api/authenticate',  // Rota do frontend para autenticação
        destination: `${apiBase}/Plasmodocking/back/authenticate`,
      },
      {
        source: '/api/create-user',  // Rota do frontend para criação de usuário
        destination: `${apiBase}/Plasmodocking/back/create-user/`,
      },
      {
        source: '/api/process-plasmodocking',  // Rota do frontend para processamento do Plasmodocking
        destination: `${apiBase}/Plasmodocking/back/process-plasmodocking/`,
      },
      {
        source: '/api/api_delete/:idItem',  // Rota do frontend para deletar item
        destination: `${apiBase}/Plasmodocking/back/api_delete/:idItem/`,
      },
      {
        source: '/api/get_resultado/:idFromUrl',  // Rota do frontend para obter resultado
        destination: `${apiBase}/Plasmodocking/back/get_resultado/:idFromUrl/`,
      },
      {
        source: '/api/process-plasmodocking/by-user',  // Rota do frontend para processar por usuário
        destination: `${apiBase}/Plasmodocking/back/process-plasmodocking/by-user/`,
      },
      {
        source: '/api/api_download/:idItem',  // Rota do frontend para baixar item
        destination: `${apiBase}/Plasmodocking/back/api_download/:idItem/`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
