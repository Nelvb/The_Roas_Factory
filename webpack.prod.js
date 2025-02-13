const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/The_Roas_Factory/'  // Ruta base para GitHub Pages
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'public', 'posts.json'), to: 'posts.json' }, // Copia el JSON a dist
                { from: path.resolve(__dirname, 'public', '_redirects'), to: '.' }, // Redirección para React Router en GitHub Pages
                { from: path.resolve(__dirname, 'public', '404.html'), to: '.' }, // Copia 404.html para manejar rutas
                { from: path.resolve(__dirname, 'public/favicon.ico'), to: '.' }, // Copia el favicon
                { from: path.resolve(__dirname, 'public/Logo_sin_fondo.png'), to: '.' } // Copia el logo
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'template.html', // Usa template.html para generar index.html
            filename: 'index.html'
        }),
        new Dotenv({
            safe: true,
            systemvars: true
        })
    ]
});
