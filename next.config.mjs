import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/authenticate',  // Rota do frontend para autenticação
        destination: 'http://computacao.unir.br/Plasmodocking/back/authenticate',
      },
      {
        source: '/api/create-user',  // Rota do frontend para criação de usuário
        destination: 'http://computacao.unir.br/Plasmodocking/back/create-user/',
      },
      {
        source: '/api/process-plasmodocking',  // Rota do frontend para processamento do Plasmodocking
        destination: 'http://computacao.unir.br/Plasmodocking/back/process-plasmodocking/',
      },
      {
        source: '/api/api_delete/:idItem',  // Rota do frontend para deletar item
        destination: 'http://computacao.unir.br/Plasmodocking/back/api_delete/:idItem',
      },
      {
        source: '/api/get_resultado/:idFromUrl',  // Rota do frontend para obter resultado
        destination: 'http://computacao.unir.br/Plasmodocking/back/get_resultado/:idFromUrl',
      },
      {
        source: '/api/process-plasmodocking/by-user',  // Rota do frontend para processar por usuário
        destination: 'http://computacao.unir.br/Plasmodocking/back/process-plasmodocking/by-user',
      },
      {
        source: '/api/api_download/:idItem',  // Rota do frontend para baixar item
        destination: 'http://computacao.unir.br/Plasmodocking/back/api_download/:idItem',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
