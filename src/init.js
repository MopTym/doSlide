import $ from './util'
import { initSections } from './show'
import { startListen } from './event'

const BASE64CSS = require('base64!./style.css')


function init(doSlide) {
    if (!doSlide.config.customCSS) {
        $.insertBase64CSS(BASE64CSS, 'do-slide-css')
        $.addClass(doSlide.el.parentNode, doSlide.config.parentClass)
        $.addClass(doSlide.el, doSlide.config.containerClass)
        $(doSlide.sections).addClass(doSlide.config.sectionClass)
    }

    if (!doSlide.config.silent) {
        initSections(doSlide, doSlide.config.initIndex || 0)
    }

    if (doSlide.config.eventElemSelector !== false) {
        startListen(doSlide)
    }

    $.removeClass(doSlide.el, doSlide.config.initClass)
}


export { init }
