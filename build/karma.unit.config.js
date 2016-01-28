const base = require('./karma.base.config.js')

module.exports = (config) => {
    config.set(Object.assign({}, base, {
        browsers: ['PhantomJS'],
        reporters: ['progress']
    }))
}
