'use strict';

process.noDeprecation = true;

module.exports = function (env) {
    env = env || {};

    const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
    const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
    const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

    const path = require('path');
    const include = path.resolve(__dirname, 'src');

    let config = {
        mode: env.production ? 'production' : 'development',
        entry: {
            index: './src/index.view.ts',
            library: './src/library/library.view.ts',
            edit: './src/edit/edit.view.ts',
            'auth-success': './src/auth-success/auth-success.view.ts',
            'not-authorized': './src/not-authorized/not-authorized.view.ts',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include,
                    loader: 'ts-loader'
                },
                {
                    test: /\.(css|s[ac]ss)$/,
                    include,
                    use: [
                        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    include,
                    loader: 'file-loader',
                    options: {
                        name: (file) => {
                            const root = path.join('/', 'src', '/');
                            return file.split(root)[1].replace(/[\/\\]/g, '.')
                        },
                        esModule: false
                    }
                }
            ]
        },
        plugins: []
    };

    if (env.production) {
        config.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false
                }),
                new OptimizeCSSAssetsPlugin()
            ]
        };

        config.plugins.push(new MiniCssExtractPlugin());
    }
    else {
        config.watch = true;
    }

    config.plugins = config.plugins.concat(Object.keys(config.entry).map((entryName) => {
        return new HtmlWebpackPlugin({
            filename: entryName + '.html',
            template: config.entry[entryName].replace('.ts', '.html'),
            inject: 'head',
            chunks: [entryName],
            minify: !!env.production
        });
    }));

    config.plugins.push(new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
    }));

    return config;
};