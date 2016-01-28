const webpackConfig = require('./webpack.test.config')

module.exports = {
    frameworks: ['jasmine'],
    files: [
        '../test/spec/index.js'
    ],
    preprocessors: {
        '../test/spec/index.js': ['webpack']
    },
    webpack: webpackConfig,
    singleRun: true
}
