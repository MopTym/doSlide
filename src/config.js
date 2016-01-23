export const DEFAULT_INIT_CONFIG = {
    initIndex            : 0,
    initClass            : 'ds-init',

    activeClass          : 'active',
    transitionInClass    : 'transition-in',
    transitionOutClass   : 'transition-out',

    silent               : false,

    horizontal           : false,
    infinite             : false,

    listenUserMouseWheel : true,
    listenUserSwipe      : true,
    eventElemSelector    : null
}

export const DEFAULT_CONFIG = {
    duration             : 1000,
    timingFunction       : 'ease',
    minInterval          : 50,

    translate3d          : true,

    parent               : null,

    respondToUserEvent   : true,
    stopPropagation      : false
}

export const DATA_DESCRIPTOR = {
    enumerable   : false,
    configurable : false,
    writable     : false,
    value        : {}
}
