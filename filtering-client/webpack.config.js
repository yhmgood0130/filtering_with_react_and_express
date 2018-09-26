var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.join(__dirname, 'dist');
var APP_DIR = path.join(__dirname, 'src');

const VENDOR_LIBS = [
    'react', 'react-dom', 'react-router-dom'
];

var config = {
    entry: {
        bundle: APP_DIR + '/main.jsx',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
		resolve: {
			extensions: ['.js', '.jsx'],
			alias: {
				'@': path.resolve(__dirname,'src'),
				common: path.resolve(__dirname,'src/components/common')
			}
		},
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ["babel-preset-env", "react", "stage-2"],
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: [BUILD_DIR, path.join(__dirname, "assets")],
        compress: true,
        port: 9000,
        disableHostCheck: false,
				historyApiFallback: true,
        open: true,
        hot: true
    },
		devtool: '#cheap-module-source-map',
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;