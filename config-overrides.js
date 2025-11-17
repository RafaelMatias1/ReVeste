const { override } = require('customize-cra');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = override(
  (config) => {
    // Encontrar e modificar o HtmlWebpackPlugin existente
    const htmlPluginIndex = config.plugins.findIndex(
      plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
    );
    
    if (htmlPluginIndex !== -1) {
      const htmlPlugin = config.plugins[htmlPluginIndex];
      
      // Substituir por nova instância com templateContent ao invés de template
      // para evitar avaliação de código
      config.plugins[htmlPluginIndex] = new HtmlWebpackPlugin({
        inject: true,
        templateContent: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="ReVeste - Plataforma de troca de roupas" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>ReVeste</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`,
        minify: false,
        scriptLoading: 'defer',
      });
    }
    
    return config;
  }
);
