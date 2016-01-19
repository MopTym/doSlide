import $ from './util'


function executeUserEventCallbacks(doSlide) {
    let event = doSlide.userEvent
    if (event) {
        doSlide.userEvent = null
        let callbacks = doSlide.callbacks[event.name]
        let ret = execute(callbacks, event.args, doSlide, false)
        return ret !== false
    }
    return true
}

function executeEventCallbacks(doSlide, event) {
    let callbacks = doSlide.callbacks[event.name]
    let ret = execute(callbacks, event.args, doSlide, false)
    return ret !== false
}

function execute(callbacks, args, context, breakValue) {
    return $.forEach(
        callbacks,
        (callback) => callback.apply(context, args),
        null,
        breakValue
    )
}

function startListen(doSlide) {
    determineEventElem(doSlide)
    if (doSlide.config.listenUserMouseWheel) {
        listenUserMouseWheel(doSlide, doSlide.eventEl)
    }
    if (doSlide.config.listenUserSwipe) {
        listenUserSwipe(doSlide, doSlide.eventEl)
    }
}

function determineEventElem(doSlide) {
    let selector = doSlide.config.eventElemSelector
    if (selector === null) {
        doSlide.eventEl = doSlide.el
    } else {
        doSlide.eventEl = selector.nodeType? selector: document.querySelector(selector)
    }
}

function listenUserMouseWheel(doSlide, eventElem) {
    $.onMouseWheel(eventElem, (direction) => {
        if (!doSlide.config.respondToUserEvent || doSlide.isChanging) return
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

function listenUserSwipe(doSlide, eventElem) {
    $.onSwipe(eventElem, (direction) => {
        if (!doSlide.config.respondToUserEvent || doSlide.isChanging) return
        doSlide.userEvent = {
            name: 'onUserSwipe',
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


export { startListen, executeEventCallbacks, executeUserEventCallbacks }
