/*
 * DoSlide
 *
 * MopTym <moptym@163.com>
 *
 */

import { DEFAULT_INIT_CONFIG, DEFAULT_CONFIG, DATA_DESCRIPTOR } from './config.js'
import $ from './util'
import { init } from './init'
import { startListen, executeEventCallbacks } from './event'
import { change } from './show'
import keyboard from './plugins/keyboard'


class DoSlide {

    constructor(selector = document.createElement('div'), config = {}) {
        Object.defineProperty(this, '_data', DATA_DESCRIPTOR)
        this.$ = $
        this.callbacks = {
            onChanged: [],
            onBeforeChange: [],
            onOverRange: [],
            onUserMouseWheel: [],
            onUserSwipe: []
        }
        this.userEvent = null
        this.isChanging = false
        this.el = selector.nodeType? selector: document.querySelector(selector)
        this.eventEl = null
        this.sections = this.el.children
        this.currentIndex = config.initIndex || 0
        this.currentSection = this.sections[this.currentIndex]
        this.config = Object.assign({}, DEFAULT_CONFIG, DEFAULT_INIT_CONFIG)
        this.set(config)
        init(this)
    }

    set(name, value) {
        let config = this.config
        if (typeof name === 'string') {
            config[name] = value
        } else {
            Object.assign(config, name)
        }
        return this
    }

    get(name) {
        return this.config[name]
    }

    next() {
        let index = this.config.infinite?
                    ((this.currentIndex + 1) % this.el.children.length):
                    (this.currentIndex + 1)
        this.go(index)
        return this
    }

    prev() {
        let index = this.config.infinite?
                    ((this.currentIndex || this.el.children.length) - 1):
                    (this.currentIndex - 1)
        this.go(index)
        return this
    }

    go(index) {
        change(this, +index || 0)
        return this
    }

    do(callback) {
        callback.call(this, this.currentIndex, this.currentSection)
        return this
    }

    onChanged(callback) {
        this.callbacks.onChanged.push(callback)
        return this
    }

    onBeforeChange(callback) {
        this.callbacks.onBeforeChange.push(callback)
        return this
    }

    onOverRange(callback) {
        this.callbacks.onOverRange.push(callback)
        return this
    }

    onUserMouseWheel(callback) {
        this.callbacks.onUserMouseWheel.push(callback)
        return this
    }

    onUserSwipe(callback) {
        this.callbacks.onUserSwipe.push(callback)
        return this
    }

    initSpaceByKey(key) {
        Object.defineProperty(this._data, key, {
            enumerable: false,
            configurable: true,
            writable: false,
            value: {}
        })
        return this._data[key]
    }

    getSpaceByKey(key) {
        return this._data[key]
    }

}

DoSlide.from = (doSlide, selector, config) => {
    return new DoSlide(selector, Object.assign({}, doSlide.config, config))
}

DoSlide.applyNewKey = () => {
    let key = 'key' + Date.now() + ~~(Math.random() * 10000)
    return key
}

// install a plugin
// the plugin should provide an 'install' function
// which will be called with the DoSlide as the first argument,
// along with possible config
DoSlide.use = (plugin, config) => {
    if (plugin && plugin.install) {
        plugin.install(DoSlide, config)
    }
}

// install build-in plugins
DoSlide.use(keyboard)

// inner tool library
DoSlide.$ = $

// supported CSS property name
// compatibility: transform > transition
DoSlide.supportedTransition = $.getSupportedCSS('transition')
DoSlide.supportedTransform = $.getSupportedCSS('transform')


// for webpack with babel
// if use 'export default' the final output will be [ moduleObject.default = DoSlide ]
// but we need [ moduleObject = DoSlide ]
module.exports = DoSlide
