/*
 * DoSlide
 *
 * MopTym <moptym@163.com>
 *
 */

import $ from './util'
import { init } from './init'
import { startListen, excuteEventCallbacks } from './event'
import { change } from './show'


const DEFAULT_INIT_CONFIG = {
    initIndex            : 0,
    initClass            : 'do-slide-init',
    
    parentClass          : 'do-slide-parent',
    containerClass       : 'do-slide-container',
    sectionClass         : 'do-slide-section',
    customCSS            : false,
    
    activeClass          : 'active',
    transitionInClass    : 'transition-in',
    transitionOutClass   : 'transition-out',
    
    silent               : false,
    
    horizontal           : false,
    infinite             : false,
    
    listenUserMouseWheel : true,
    listenUserSlide      : true,
    eventElemSelector    : null
}

const DEFAULT_CONFIG = {
    duration             : 1000,
    timingFunction       : 'ease',
    minInterval          : 50,

    stopPropagation      : false
}


class DoSlide {
    
    constructor(selector = document.createElement('div'), config = {}) {
        this.$ = $
        this.callbacks = {
            onChanged: [],
            onBeforeChange: [],
            onOverRange: [],
            onUserMouseWheel: [],
            onUserSlide: []
        }
        this.userEvent = null
        this.isChanging = false
        this.el = selector.nodeType? selector: document.querySelector(selector)
        this.eventEl = null
        this.currentIndex = config.initIndex || 0
        this.currentSection = this.el.children[this.currentIndex]
        this.config = Object.assign({}, DEFAULT_CONFIG, DEFAULT_INIT_CONFIG)
        this.set(config)
        init(this)
    }
    
    set(name, value) {
        if (typeof name === 'string') {
            this.config[name] = value
        } else {
            Object.assign(this.config, name)
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
        this.go(index, true)
        return this
    }
    
    prev() {
        let index = this.config.infinite?
                    ((this.currentIndex || this.el.children.length) - 1):
                    (this.currentIndex - 1)
        this.go(index, false)
        return this
    }
    
    go(index, isNext) {
        change(this, index, isNext)
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

    onUserSlide(callback) {
        this.callbacks.onUserSlide.push(callback)
        return this
    }

}

DoSlide.from = (doSlide, selector, config) => {
    return new DoSlide(selector, Object.assign({}, doSlide.config, config))
}

DoSlide.$ = $

// supported CSS property name
// compatibility: transform > transition
DoSlide.supportedTransition = $.getSupportedCSS('transition')
DoSlide.supportedTransform = $.getSupportedCSS('transform')


// for webpack with babel
// if use 'export default' the final output will be [ moduleObject.default = DoSlide ]
// but we need [ moduleObject = DoSlide ]
module.exports = DoSlide