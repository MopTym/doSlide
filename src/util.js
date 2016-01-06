const MAX_TOUCH_TIME = 800
const SLIDE_THRESHOLD = 50


let util = (selector) => {
    return new util.prototype.Init(selector)
};

util.prototype = {

    constructor: util,

    length: 0,

    Init(selector) {
        if (!selector) return this
        if (selector instanceof util) return selector
        if (selector.nodeType) {
            this[0] = selector
            this.length = 1
        } else {
            if (typeof selector === 'string') {
                selector = document.querySelectorAll(selector) || []
            }
            util.each(selector, (elem, index) => (this[index] = elem))
            this.length = selector.length
        }
        return this
    }

}

util.prototype.Init.prototype = util.prototype

Object.assign(util.prototype, {

    each(callback, isContext, isFalseBreak, breakValue) {
        return util.each(this, callback, isContext, isFalseBreak, breakValue)
    },

    eq(index) {
        if (!isNaN(index)) {
            return util(this[index < 0? (this.length + index): index])
        }
        return util()
    },

    on(type, listener, useCapture = false) {
        return this.each((elem) => util.on(elem, type, listener, useCapture))
    },

    off(type, listener, useCapture = false) {
        return this.each((elem) => util.off(elem, type, listener, useCapture))
    },

    attr(name, value) {
        return access(this, util.attr, name)
    },

    css(name, value) {
        return access(this, util.css, name, value)
    },

    removeAttr(name) {
        return this.each((elem) => util.removeAttr(elem, name))
    },

    addClass(name) {
        return this.each((elem) => util.addClass(elem, name))
    },

    removeClass(name) {
        return this.each((elem) => util.removeClass(elem, name))
    },

    hasClass(name) {
        return !this.each((elem) => !util.hasClass(elem, name), false, true, false)
    },

    onMouseWheel(callback, isStopPropFn) {
        return this.each((elem) => util.onMouseWheel(elem, callback, isStopPropFn))
    },

    onSwipe(callback, isStopPropFn) {
        return this.each((elem) => util.onSwipe(elem, callback, isStopPropFn))
    }

})

Object.assign(util, {

    each(elems, fn, isContext, isFalseBreak, breakValue) {
        if (isArrayLike(elems)) {
            for (let i = 0, len = elems.length, val; i < len; i++) {
                val = isContext? fn.call(elems[i], elems[i], i, elems): fn(elems[i], i, elems)
                if (val === false && isFalseBreak) {
                    return breakValue
                }
            }
        }
        return elems
    },

    on(elem, type, listener, useCapture = false) {
        if (elem) elem.addEventListener(type, listener, useCapture)
    },

    off(elem, type, listener, useCapture = false) {
        if (elem) elem.removeEventListener(type, listener, useCapture)
    },

    attr(elem, name, value) {
        if (elem) {
            if (typeof name === 'string') {
                if (isSet(value)) {
                    elem.setAttribute(name, value)
                } else {
                    return elem.getAttribute(name) || ''
                }
            } else {
                for (let key in name) {
                    elem.setAttribute(key, name[key])
                }
            }
        }
    },

    css(elem, name, value) {
        if (elem && name) {
            if (typeof name === 'string') {
                if (isSet(value)) {
                    elem.style[name] = value
                } else {
                    return elem.style[name]
                }
            } else {
                for (let key in name) {
                    elem.style[key] = name[key]
                }
            }
        }
    },

    removeAttr(elem, name) {
        if (elem) elem.removeAttribute(name)
    },

    addClass(elem, name) {
        if (elem && name && !this.hasClass(elem, name)) {
            let cur = this.attr(elem, 'class').trim()
            let res = (cur + ' ' + name).trim()
            this.attr(elem, 'class', res)
        }
    },

    removeClass(elem, name) {
        if (elem && name) {
            let reg = new RegExp('\\s*\\b' + name + '\\b\\s*', 'g')
            let res = this.attr(elem, 'class').replace(reg, ' ').trim()
            this.attr(elem, 'class', res)
        }
    },

    hasClass(elem, name) {
        return !!(elem && name) && (new RegExp('\\b' + name + '\\b')).test(this.attr(elem, 'class'))
    }

})

Object.assign(util, {

    /**
     * get supported CSS property name
     * example: if the browser only support '-webkit-transform', getSupportedCSS('transfrom') => '-webkit-transform'
     */
    getSupportedCSS: (() => {
        let prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-']
        let elem = document.createElement('div')
        let style = elem.style
        return (name, isAutoPrefix = true) => {
            let names = isAutoPrefix? prefixes.map((prefix) => prefix + name): [name]
            let supportedName = undefined
            forEach(names, (name) => {
                supportedName = style[name] !== undefined? name: supportedName
                return supportedName === undefined
            })
            return supportedName
        }
    })(),

    onMouseWheel(elem, callback, isStopPropFn = () => false) {
        if (!elem || !callback) return
        ['DOMMouseScroll', 'mousewheel'].map((mouseWheel) => {
            elem.addEventListener(mouseWheel, (event) => {
                event.preventDefault()
                if (isStopPropFn()) event.stopPropagation()
                let delta = event.detail? event.detail * (-120) : event.wheelDelta
                let direction = {
                    [delta < 0? 'down': 'up']: true
                }
                callback.call(elem, direction)
            }, false)
        })
    },

    onSwipe(elem, callback, isStopPropFn = () => false) {
        if (!elem || !callback) return
        let startX, startY, startTime, endX, endY
        elem.addEventListener('touchstart', (event) => {
            if (isStopPropFn()) event.stopPropagation()
            let touch = event.changedTouches[0]
            startX = touch.clientX
            startY = touch.clientY
            endX = touch.clientX
            endY = touch.clientY
            startTime = Date.now()
        }, false)
        elem.addEventListener('touchmove', (event) => {
            if (isStopPropFn()) event.stopPropagation()
            event.preventDefault()
            if (!(event.scale && event.scale !== 1) && event.changedTouches.length === 1) {
                let touch = event.changedTouches[0]
                endX = touch.clientX
                endY = touch.clientY
            }
        }, false)
        elem.addEventListener('touchend', (event) => {
            if (isStopPropFn()) event.stopPropagation()
            if (Date.now() - startTime < MAX_TOUCH_TIME) {
                let diffX = endX - startX, diffY = endY - startY
                let absDiffX = Math.abs(diffX), absDiffY = Math.abs(diffY)
                let direction = {}
                if (Math.max(absDiffX, absDiffY) > SLIDE_THRESHOLD) {
                    if (absDiffX > absDiffY) {
                        direction[diffX > 0? 'right': 'left'] = true
                    } else {
                        direction[diffY > 0? 'down': 'up'] = true
                    }
                    callback.call(elem, direction)
                }
            }
        }, false)
    },

    forEach,

    keys

})

function isArrayLike(tar) {
    return typeof tar === 'object' && isSet(tar.length)
}

function access(elems, fn, key, value) {
    if (isSet(value) || typeof key === 'object') {
        util.each(elems, (elem) => fn(elem, key, value))
        return elems
    } else {
        return elems.length? fn(elems[0], key): undefined
    }
}

function isSet(tar) {
    return typeof tar !== 'undefined'
}

function forEach(array, fn, context, breakValue) {
    if (array && fn) {
        for (let i = 0, len = array.length, val; i < len; i++) {
            val = context? fn.call(context, array[i], i, array): fn(array[i], i, array)
            if(val === false) {
                return breakValue
            }
        }
    }
}

function keys(obj, fn) {
    let keys = []
    for (let key in obj) {
        keys.push(fn? fn(key): key)
    }
    return keys
}


export default util
