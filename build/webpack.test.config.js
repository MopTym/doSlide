module.exports = {
    entry: './test/spec/index.js',
    output: {
        path: './test',
        filename: 'test.js'
    },
    cache: true,
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
    }
}