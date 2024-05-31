const {merge, mergeWithCustomize} = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name:'marketing',
            filename:'remoteEntry.js',
            exposes:{
                './MarketingApp':'./src/bootstrap',
            },
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};

module.exports = merge(commonConfig,devConfig);
// By listing out devconfig second that means that devconfig is going to override over on options that we might 
// have assigned to commonConfig
// merge==> used to merge code from different webpack files