var webpack = require('webpack')
var npmCfg = require('../package.json')

var banner = [
    'DoSlide v' + npmCfg.version,
    '(c) ' + (new Date().getFullYear()) + ' ' + npmCfg.author,
    'Released under the ' + npmCfg.license + ' License.',
    'Homepage - ' + npmCfg.homepage
].join('\n')

module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'do-slide.min.js',
        library: 'DoSlide',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-object-assign']
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ],
    devtool: 'source-map'
}