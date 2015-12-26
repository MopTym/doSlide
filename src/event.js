import $ from './util'


function excuteUserEventCallbacks(doSlide) {
    let event = doSlide.userEvent
    if (event) {
        doSlide.userEvent = null
        let callbacks = doSlide.callbacks[event.name]
        let ret = excute(callbacks, event.args, doSlide, false)
        return ret !== false
    }
    return true
}

function excuteEventCallbacks(doSlide, event) {
    let callbacks = doSlide.callbacks[event.name]
    let ret = excute(callbacks, event.args, doSlide, false)
    return ret !== false
}

function excute(callbacks, args, context, breakValue) {
    return $.forEach(
        callbacks, 
        (callback) => callback.apply(context, args), 
        null,
        breakValue
    )
}

function startListen(doSlide) {
    let selector = doSlide.config.eventElemSelector
    if (selector === null) {
        doSlide.eventEl = doSlide.el
    } else {
        doSlide.eventEl = selector.nodeType? selector: document.querySelector(selector)
    }
    if (doSlide.config.listenUserMouseWheel) {
        listenUserMouseWheel(doSlide, doSlide.eventEl)
    }
    if (doSlide.config.listenUserSlide) {
        listenUserSlide(doSlide, doSlide.eventEl)
    }
}

function listenUserMouseWheel(doSlide, eventElem) {
    $.onMouseWheel(eventElem, (direction) => {
        if (doSlide.isChanging) return
        doSlide.userEvent = {
            name: 'onUserMouseWheel',
            args: [direction]
        }
        if (direction.down) {
            doSlide.next()
        } else {
            doSlide.prev()
        }
    }, () => doSlide.config.stopPropagation)
}

function listenUserSlide(doSlide, eventElem) {
    $.onSlide(eventElem, (direction) => {
        if (doSlide.isChanging) return
        doSlide.userEvent = {
            name: 'onUserSlide',
            args: [direction]
        }
        if (doSlide.config.horizontal) {
            if (direction.left) doSlide.next()
            if (direction.right) doSlide.prev()
        } else {
            if (direction.up) doSlide.next()
            if (direction.down) doSlide.prev()
        }
    }, () => doSlide.config.stopPropagation)
}


export { startListen, excuteEventCallbacks, excuteUserEventCallbacks }