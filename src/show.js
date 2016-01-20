import $ from './util'
import { executeEventCallbacks, executeUserEventCallbacks } from './event'


const supportedTransition = $.getSupportedCSS('transition')
const supportedTransform = $.getSupportedCSS('transform')

const isSupport3d = (() => {
    let has3d = false
    if (supportedTransform && window.getComputedStyle) {
        let el = document.createElement('div')
        document.body.insertBefore(el, null)
        el.style[supportedTransform] = 'translate3d(1%, 1%, 0)'
        has3d = window.getComputedStyle(el).getPropertyValue(supportedTransform)
        document.body.removeChild(el)
    }
    return (has3d && has3d !== 'none')
})()


function initSections(doSlide, initIndex) {
    let $container = $(doSlide.el)
    let $sections = $(doSlide.sections)
    if (doSlide.config.horizontal) {
        $container.css('width', $sections.length + '00%')
        $sections.css({
            width: (100 / $sections.length) + '%',
            float: 'left'
        })
    } else {
        $container.css('height', $sections.length + '00%')
        $sections.css('height', (100 / $sections.length) + '%')
    }
    showSection(doSlide, initIndex, true)
}

function showSection(doSlide, index, isImmediate) {
    let cur = doSlide.currentSection
    let tar = doSlide.sections[index]
    let config = doSlide.config
    let busyTime = config.minInterval + (supportedTransition? config.duration: 0)
    busyTime = isImmediate? 0: busyTime
    doSlide.isChanging = true
    if (!doSlide.config.silent) {
        setActiveClass(doSlide, index)
        if (!isImmediate) {
            toggleTransitionClass(config, cur, tar, true)
        }
        transform(doSlide, index, isImmediate)
    }
    setTimeout(() => {
        if (!config.silent && !isImmediate) {
            toggleTransitionClass(config, cur, tar, false)
        }
        doSlide.isChanging = false
    }, busyTime)
    return busyTime
}

function toggleTransitionClass(config, cur, tar, isAdd) {
    if (isAdd) {
        $.addClass(cur, config.transitionOutClass)
        $.addClass(tar, config.transitionInClass)
    } else {
        $.removeClass(cur, config.transitionOutClass)
        $.removeClass(tar, config.transitionInClass)
    }
}

function setActiveClass(doSlide, index) {
    $(doSlide.sections).each((section, i) => {
        if (i === index) {
            $.addClass(section, doSlide.config.activeClass)
        } else {
            $.removeClass(section, doSlide.config.activeClass)
        }
    })
}

function change(doSlide, index) {
    if (canChangeNow(doSlide, index)) {
        if (isOverRange(doSlide, index)) {
            doingOnOverRange(doSlide, index)
        } else if (executeUserEventCallbacks(doSlide)) {
            let lastIndex = doSlide.currentIndex
            let isOK = executeEventCallbacks(doSlide, {
                name: 'onBeforeChange',
                args: [lastIndex, index, doSlide.currentSection, doSlide.sections[index]]
            })
            if (isOK) {
                let busyTime = showSection(doSlide, index)
                doSlide.currentIndex = index
                doSlide.currentSection = doSlide.sections[index]
                setTimeout(() => {
                    executeEventCallbacks(doSlide, {
                        name: 'onChanged',
                        args: [index, lastIndex, doSlide.currentSection, doSlide.sections[lastIndex]]
                    })
                }, busyTime)
            }
        }
    }
}

function canChangeNow(doSlide, index) {
    return (!doSlide.isChanging && index != doSlide.currentIndex)
}

function isOverRange(doSlide, index) {
    return (index < 0 || index >= doSlide.sections.length)
}

function doingOnOverRange(doSlide, index) {
    let parent = doSlide.config.parent
    let isOK = executeEventCallbacks(doSlide, {
        name: 'onOverRange',
        args: [doSlide.currentIndex, index, doSlide.currentSection]
    })
    if (isOK && parent) {
        if (index < 0) {
            parent.prev()
        } else {
            parent.next()
        }
    }
}

function transform(doSlide, index, isImmediate) {
    let config = doSlide.config
    if (supportedTransform) {
        if (supportedTransition) {
            let transition = supportedTransform + ' ' + (config.timingFunction || '') + ' ' + config.duration + 'ms'
            let transitionClean = supportedTransform + ' 0ms'
            $.css(doSlide.el, supportedTransition, (isImmediate? transitionClean: transition))
        }
        let offset = (-index * 100 / doSlide.sections.length) + '%'
        let translate = config.horizontal? (offset + ',0'): ('0,' + offset)
        translate = isSupport3d && config.translate3d?
                    'translate3d(' + translate + ',0)':
                    'translate(' + translate + ')'
        $.css(doSlide.el, supportedTransform, translate)
    } else {
        $.css(doSlide.el, (config.horizontal? 'left': 'top'), -index + '00%')
    }
}


export { initSections, change }
