import $ from './util'
import { excuteEventCallbacks, excuteUserEventCallbacks } from './event'


const supportedTransition = $.getSupportedCSS('transition')
const supportedTransform = $.getSupportedCSS('transform')


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
    let cur = doSlide.currentSection, tar = doSlide.sections[index], config = doSlide.config
    let busyTime = config.minInterval + (supportedTransition? config.duration: 0)
    doSlide.isChanging = true
    if (!doSlide.config.silent) {
        setActiveClass(doSlide, index)
        toggleTransitionClass(config, cur, tar, true)
        transform(doSlide, index, isImmediate)
    }
    setTimeout(() => {
        if (!config.silent) {
            toggleTransitionClass(config, cur, tar, false)
        }
        doSlide.isChanging = false
    }, isImmediate? 0: busyTime)
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
        } else if (excuteUserEventCallbacks(doSlide)) {
            let lastIndex = doSlide.currentIndex
            let isOK = excuteEventCallbacks(doSlide, {
                name: 'onBeforeChange',
                args: [lastIndex, index, doSlide.currentSection, doSlide.sections[index]]
            })
            if (isOK) {
                let busyTime = showSection(doSlide, index)
                doSlide.currentIndex = index
                doSlide.currentSection = doSlide.sections[index]
                setTimeout(() => {
                    excuteEventCallbacks(doSlide, {
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
    let isOK = excuteEventCallbacks(doSlide, {
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
        let direction = config.horizontal? 'X': 'Y'
        let offset = (-index * 100 / doSlide.sections.length) + '%'
        let transition = supportedTransform + ' ' + (config.timingFunction || '') + ' ' + config.duration + 'ms'
        let transitionClean = supportedTransform + ' 0ms'
        $.css(doSlide.el, {
            [supportedTransition]: isImmediate? transitionClean: transition,
            [supportedTransform]: 'translate' + direction + '(' + offset + ')'
        })
    } else {
        $.css(doSlide.el, (config.horizontal? 'top': 'left'), offset)
    }
}



export { initSections, change }
