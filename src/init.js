import $ from './util'
import { initSections } from './show'
import { startListen } from './event'


function init(doSlide) {
    if (!doSlide.config.silent) {
        initSections(doSlide, doSlide.config.initIndex || 0)
    }

    if (doSlide.config.eventElemSelector !== false) {
        startListen(doSlide)
    }

    $.removeClass(doSlide.el, doSlide.config.initClass)
}


export { init }
