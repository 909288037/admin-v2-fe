const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['./src/app.jsx'],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "js/app.js"
    },
    resolve: {
      alias: {
          page:path.resolve(__dirname, "src/page"),
          components:path.resolve(__dirname, "src/components")
      }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }],

                })
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 8086,
        historyApiFallback:{
            index: '/dist/index.html'
        }
    },
    plugins: [
        // 处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        //  独立css插件
        new ExtractTextPlugin("css/[name].css"),
        //    提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ]
}