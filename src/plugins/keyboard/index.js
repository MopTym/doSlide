// the final file size is too big to use Symbol.
// const KEY = Symbol('keyboard')
const KEY = 'plugin.keyboard' + Date.now()

class Keyboard {
    constructor(doSlide) {
        this.eventType = 'keydown'
        this.eventElement = window
        this.for = doSlide
        this.$ = doSlide.$
        this.isOn = false
        this.listener = listener.bind(this)
        this.mappings = [
            {
                filter: filterByKeyCode(40),    // down
                action: function() { if (!this.config.horizontal) this.next() }
            },
            {
                filter: filterByKeyCode(38),    // up
                action: function() { if (!this.config.horizontal) this.prev() }
            },
            {
                filter: filterByKeyCode(39),    // right
                action: function() { if (this.config.horizontal) this.next() }
            },
            {
                filter: filterByKeyCode(37),    // left
                action: function() { if (this.config.horizontal) this.prev() }
            }
        ]
    }
    setEventType(eventType) {
        if (eventType !== this.eventType) {
            let isOn = this.isOn
            if (isOn) this.turnOff()
            this.eventType = eventType
            if (isOn) this.turnOn()
        }
        return this
    }
    setEventElement(elem) {
        if (elem !== this.eventElement) {
            let isOn = this.isOn
            if (isOn) this.turnOff()
            this.eventElement = elem
            if (isOn) this.turnOn()
        }
        return this
    }
    getMappings() {
        return this.mappings
    }
    setMappings(mappings) {
        this.mappings = mappings
        return this
    }
    turnOn() {
        if (!this.isOn) {
            this.$.on(this.eventElement, this.eventType, this.listener, false)
            this.isOn = true
        }
        return this
    }
    turnOff() {
        if (this.isOn) {
            this.$.off(this.eventElement,this.eventType, this.listener, false)
            this.isOn = false
        }
        return this
    }
}

function filterByKeyCode(keyCode) {
    return (event) => event.keyCode === keyCode
}

function listener(event) {
    let mappings = this.mappings || []
    let doSlide = this.for
    mappings.forEach((mapping) => {
        if (mapping.filter.call(doSlide, event) === true) {
            mapping.action.call(doSlide, event)
        }
    })
}

function install(DoSlide) {
    DoSlide.prototype.getKeyboard = function() {
        if (!this[KEY]) {
            Object.defineProperty(this, KEY, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: new Keyboard(this)
            })
        }
        return this[KEY]
    }
}


export default { install }
