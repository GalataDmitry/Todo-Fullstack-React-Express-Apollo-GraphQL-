const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {

    const {mode = 'development'} = env
    const isProd = mode === 'production'
    const isDev = mode === 'development'

    const getStyleLoader = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
        ]
    }

    const getPlugins = () => {

        const plugins = [
            new HtmlWebpackPlugin({
                    template: 'public/index.html'
                }
            )
        ]

        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                    filename: 'main-[hash:8].css'
                }
                )
            )
        }
        return plugins
    }

    return {
        mode: isProd ? 'production' : isDev && 'development',
        output: {
            filename: isProd ? 'main-[hash:8].js' : undefined
        },
        module: {
            rules: [
                //loading babel
                {
                    test: /\.js$/i,
                    exclude: /node_modules/i,
                    loader: 'babel-loader'
                },
                // loading images
                {
                    test: /\.(png|svg|jpe?g|jpeg|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img',
                        name: '[name] - [sha1:hash:7].[ext]',
                    }
                },
                //loading fonts
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/i,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'font',
                        name: '[name].[ext]',
                    }
                },
                //Loading CSS
                {
                    test: /\.css$/i,
                    use: getStyleLoader()
                },
                //Loading SCSS/SASS
                {
                    test: /\.s[ca]ss$/i,
                    use: [...getStyleLoader(), 'sass-loader']
                },
            ]
        },
        plugins: getPlugins(),
        devServer: {
            open: true,
            port: 8000,
            historyApiFallback: true,
        }
    }
}