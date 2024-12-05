const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);

  webpack.chainWebpack((config) => {
    // Add any custom webpack configurations here
    config.resolve.alias.set('@', resolve(__dirname, 'app'));
    
    // Optimize bundle size
    config.optimization.splitChunks({
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: (module) => {
            return module.resource &&
              module.resource.includes('node_modules') &&
              module.resource.includes('.js');
          }
        }
      }
    });
  });

  return webpack.resolveConfig();
};