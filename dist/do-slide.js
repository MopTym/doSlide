/*!
 * DoSlide v0.1.3
 * (c) 2015 MopTym <moptym@163.com>
 * Released under the MIT License.
 * Homepage - https://github.com/MopTym/doSlide
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DoSlide"] = factory();
	else
		root["DoSlide"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * DoSlide
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * MopTym <moptym@163.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	var _init = __webpack_require__(2);

	var _event = __webpack_require__(4);

	var _show = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_INIT_CONFIG = {
	    initIndex: 0,
	    initClass: 'do-slide-init',

	    parentClass: 'do-slide-parent',
	    containerClass: 'do-slide-container',
	    sectionClass: 'do-slide-section',
	    customCSS: false,

	    activeClass: 'active',
	    transitionInClass: 'transition-in',
	    transitionOutClass: 'transition-out',

	    silent: false,

	    horizontal: false,
	    infinite: false,

	    listenUserMouseWheel: true,
	    listenUserSlide: true,
	    eventElemSelector: null
	};

	var DEFAULT_CONFIG = {
	    duration: 1000,
	    timingFunction: 'ease',
	    minInterval: 50,

	    stopPropagation: false
	};

	var DoSlide = (function () {
	    function DoSlide() {
	        var selector = arguments.length <= 0 || arguments[0] === undefined ? document.createElement('div') : arguments[0];
	        var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, DoSlide);

	        this.$ = _util2.default;
	        this.callbacks = {
	            onChanged: [],
	            onBeforeChange: [],
	            onOverRange: [],
	            onUserMouseWheel: [],
	            onUserSlide: []
	        };
	        this.userEvent = null;
	        this.isChanging = false;
	        this.el = selector.nodeType ? selector : document.querySelector(selector);
	        this.eventEl = null;
	        this.currentIndex = config.initIndex || 0;
	        this.currentSection = this.el.children[this.currentIndex];
	        this.config = _extends({}, DEFAULT_CONFIG, DEFAULT_INIT_CONFIG);
	        this.set(config);
	        (0, _init.init)(this);
	    }

	    _createClass(DoSlide, [{
	        key: 'set',
	        value: function set(name, value) {
	            if (typeof name === 'string') {
	                this.config[name] = value;
	            } else {
	                _extends(this.config, name);
	            }
	            return this;
	        }
	    }, {
	        key: 'get',
	        value: function get(name) {
	            return this.config[name];
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var index = this.config.infinite ? (this.currentIndex + 1) % this.el.children.length : this.currentIndex + 1;
	            this.go(index, true);
	            return this;
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            var index = this.config.infinite ? (this.currentIndex || this.el.children.length) - 1 : this.currentIndex - 1;
	            this.go(index, false);
	            return this;
	        }
	    }, {
	        key: 'go',
	        value: function go(index, isNext) {
	            (0, _show.change)(this, index, isNext);
	            return this;
	        }
	    }, {
	        key: 'do',
	        value: function _do(callback) {
	            callback.call(this, this.currentIndex, this.currentSection);
	            return this;
	        }
	    }, {
	        key: 'onChanged',
	        value: function onChanged(callback) {
	            this.callbacks.onChanged.push(callback);
	            return this;
	        }
	    }, {
	        key: 'onBeforeChange',
	        value: function onBeforeChange(callback) {
	            this.callbacks.onBeforeChange.push(callback);
	            return this;
	        }
	    }, {
	        key: 'onOverRange',
	        value: function onOverRange(callback) {
	            this.callbacks.onOverRange.push(callback);
	            return this;
	        }
	    }, {
	        key: 'onUserMouseWheel',
	        value: function onUserMouseWheel(callback) {
	            this.callbacks.onUserMouseWheel.push(callback);
	            return this;
	        }
	    }, {
	        key: 'onUserSlide',
	        value: function onUserSlide(callback) {
	            this.callbacks.onUserSlide.push(callback);
	            return this;
	        }
	    }]);

	    return DoSlide;
	})();

	DoSlide.from = function (doSlide, selector, config) {
	    return new DoSlide(selector, _extends({}, doSlide.config, config));
	};

	DoSlide.$ = _util2.default;

	// supported CSS property name
	// compatibility: transform > transition
	DoSlide.supportedTransition = _util2.default.getSupportedCSS('transition');
	DoSlide.supportedTransform = _util2.default.getSupportedCSS('transform');

	// for webpack with babel
	// if use 'export default' the final output will be [ moduleObject.default = DoSlide ]
	// but we need [ moduleObject = DoSlide ]
	module.exports = DoSlide;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var MAX_TOUCH_TIME = 800;
	var SLIDE_THRESHOLD = 50;

	var IS_FIREFOX = /Firefox/i.test((navigator || {}).userAgent);

	var util = function util(selector) {
	    return new util.prototype.Init(selector);
	};

	util.prototype = {

	    constructor: util,

	    length: 0,

	    Init: function Init(selector) {
	        var _this = this;

	        if (!selector) return this;
	        if (selector instanceof util) return selector;
	        if (selector.nodeType) {
	            this[0] = selector;
	            this.length = 1;
	        } else {
	            if (typeof selector === 'string') {
	                selector = document.querySelectorAll(selector) || [];
	            }
	            util.each(selector, function (elem, index) {
	                return _this[index] = elem;
	            });
	            this.length = selector.length;
	        }
	        return this;
	    }
	};

	util.prototype.Init.prototype = util.prototype;

	_extends(util.prototype, {
	    each: function each(callback, isContext, isFalseBreak, breakValue) {
	        return util.each(this, callback, isContext, isFalseBreak, breakValue);
	    },
	    eq: function eq(index) {
	        if (!isNaN(index)) {
	            return util(this[index < 0 ? this.length + index : index]);
	        }
	        return util();
	    },
	    on: function on(type, listener) {
	        var useCapture = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	        return this.each(function (elem) {
	            return util.on(elem, type, listener, useCapture);
	        });
	    },
	    off: function off(type, listener) {
	        var useCapture = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	        return this.each(function (elem) {
	            return util.off(elem, type, listener, useCapture);
	        });
	    },
	    attr: function attr(name, value) {
	        return access(this, util.attr, name);
	    },
	    css: function css(name, value) {
	        return access(this, util.css, name, value);
	    },
	    removeAttr: function removeAttr(name) {
	        return this.each(function (elem) {
	            return util.removeAttr(elem, name);
	        });
	    },
	    addClass: function addClass(name) {
	        return this.each(function (elem) {
	            return util.addClass(elem, name);
	        });
	    },
	    removeClass: function removeClass(name) {
	        return this.each(function (elem) {
	            return util.removeClass(elem, name);
	        });
	    },
	    hasClass: function hasClass(name) {
	        return !this.each(function (elem) {
	            return !util.hasClass(elem, name);
	        }, false, true, false);
	    },
	    onMouseWheel: function onMouseWheel(callback, isStopPropFn) {
	        return this.each(function (elem) {
	            return util.onMouseWheel(elem, callback, isStopPropFn);
	        });
	    },
	    onSlide: function onSlide(callback, isStopPropFn) {
	        return this.each(function (elem) {
	            return util.onSlide(elem, callback, isStopPropFn);
	        });
	    }
	});

	_extends(util, {
	    each: function each(elems, fn, isContext, isFalseBreak, breakValue) {
	        if (isArrayLike(elems)) {
	            for (var i = 0, len = elems.length, val; i < len; i++) {
	                val = isContext ? fn.call(elems[i], elems[i], i, elems) : fn(elems[i], i, elems);
	                if (val === false && isFalseBreak) {
	                    return breakValue;
	                }
	            }
	        }
	        return elems;
	    },
	    on: function on(elem, type, listener) {
	        var useCapture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        if (elem) elem.addEventListener(type, listener, useCapture);
	    },
	    off: function off(elem, type, listener) {
	        var useCapture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        if (elem) elem.removeEventListener(type, listener, useCapture);
	    },
	    attr: function attr(elem, name, value) {
	        if (elem) {
	            if (typeof name === 'string') {
	                if (isSet(value)) {
	                    elem.setAttribute(name, value);
	                } else {
	                    return elem.getAttribute(name) || '';
	                }
	            } else {
	                for (var key in name) {
	                    elem.setAttribute(key, name[key]);
	                }
	            }
	        }
	    },
	    css: function css(elem, name, value) {
	        if (elem && name) {
	            if (typeof name === 'string') {
	                if (isSet(value)) {
	                    elem.style[name] = value;
	                } else {
	                    return elem.style[name];
	                }
	            } else {
	                for (var key in name) {
	                    elem.style[key] = name[key];
	                }
	            }
	        }
	    },
	    removeAttr: function removeAttr(elem, name) {
	        if (elem) elem.removeAttribute(name);
	    },
	    addClass: function addClass(elem, name) {
	        if (elem && name && !this.hasClass(elem, name)) {
	            var cur = this.attr(elem, 'class').trim();
	            var res = (cur + ' ' + name).trim();
	            this.attr(elem, 'class', res);
	        }
	    },
	    removeClass: function removeClass(elem, name) {
	        if (elem && name) {
	            var reg = new RegExp('\\s*\\b' + name + '\\b\\s*', 'g');
	            var res = this.attr(elem, 'class').replace(reg, ' ').trim();
	            this.attr(elem, 'class', res);
	        }
	    },
	    hasClass: function hasClass(elem, name) {
	        return !!(elem && name) && new RegExp('\\b' + name + '\\b').test(this.attr(elem, 'class'));
	    }
	});

	_extends(util, {
	    insertBase64CSS: function insertBase64CSS(base64Str, id) {
	        var head = util('head')[0];
	        var elem = util('link#' + id);
	        if (!elem.length) {
	            elem = util(document.createElement('link'));
	            if (id) {
	                elem.attr({ id: id });
	            }
	            head.insertBefore(elem[0], head.children[0]);
	        }
	        elem.attr({
	            rel: 'stylesheet',
	            href: 'data:text/css;base64,' + base64Str
	        });
	    },

	    /**
	     * get supported CSS property name
	     * example: if the browser only support '-webkit-transform', getSupportedCSS('transfrom') => '-webkit-transform'
	     */
	    getSupportedCSS: (function () {
	        var prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
	        var elem = document.createElement('div');
	        var style = elem.style;
	        return function (name) {
	            var isAutoPrefix = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	            var names = isAutoPrefix ? prefixes.map(function (prefix) {
	                return prefix + name;
	            }) : [name];
	            var supportedName = undefined;
	            forEach(names, function (name) {
	                supportedName = style[name] !== undefined ? name : supportedName;
	                return supportedName === undefined;
	            });
	            return supportedName;
	        };
	    })(),

	    onMouseWheel: function onMouseWheel(elem, callback) {
	        var isStopPropFn = arguments.length <= 2 || arguments[2] === undefined ? function () {
	            return false;
	        } : arguments[2];

	        if (!elem || !callback) return;
	        var mouseWheel = IS_FIREFOX ? 'DOMMouseScroll' : 'mousewheel';
	        elem.addEventListener(mouseWheel, function (event) {
	            event.preventDefault();
	            if (isStopPropFn()) event.stopPropagation();
	            var delta = event.detail ? event.detail * -120 : event.wheelDelta;
	            var direction = _defineProperty({}, delta < 0 ? 'down' : 'up', true);
	            callback.call(elem, direction);
	        }, false);
	    },
	    onSlide: function onSlide(elem, callback) {
	        var isStopPropFn = arguments.length <= 2 || arguments[2] === undefined ? function () {
	            return false;
	        } : arguments[2];

	        if (!elem || !callback) return;
	        var startX = undefined,
	            startY = undefined,
	            startTime = undefined,
	            endX = undefined,
	            endY = undefined;
	        elem.addEventListener('touchstart', function (event) {
	            if (isStopPropFn()) event.stopPropagation();
	            var touch = event.changedTouches[0];
	            startX = touch.clientX;
	            startY = touch.clientY;
	            endX = touch.clientX;
	            endY = touch.clientY;
	            startTime = Date.now();
	        }, false);
	        elem.addEventListener('touchmove', function (event) {
	            if (isStopPropFn()) event.stopPropagation();
	            event.preventDefault();
	            if (!(event.scale && event.scale !== 1) && event.changedTouches.length === 1) {
	                var touch = event.changedTouches[0];
	                endX = touch.clientX;
	                endY = touch.clientY;
	            }
	        }, false);
	        elem.addEventListener('touchend', function (event) {
	            if (isStopPropFn()) event.stopPropagation();
	            if (Date.now() - startTime < MAX_TOUCH_TIME) {
	                var diffX = endX - startX,
	                    diffY = endY - startY;
	                var absDiffX = Math.abs(diffX),
	                    absDiffY = Math.abs(diffY);
	                var direction = {};
	                if (Math.max(absDiffX, absDiffY) > SLIDE_THRESHOLD) {
	                    if (absDiffX > absDiffY) {
	                        direction[diffX > 0 ? 'right' : 'left'] = true;
	                    } else {
	                        direction[diffY > 0 ? 'down' : 'up'] = true;
	                    }
	                    callback.call(elem, direction);
	                }
	            }
	        }, false);
	    },

	    forEach: forEach,

	    keys: keys

	});

	function isArrayLike(tar) {
	    return (typeof tar === 'undefined' ? 'undefined' : _typeof(tar)) === 'object' && isSet(tar.length);
	}

	function access(elems, fn, key, value) {
	    if (isSet(value) || (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        util.each(elems, function (elem) {
	            return fn(elem, key, value);
	        });
	        return elems;
	    } else {
	        return elems.length ? fn(elems[0], key) : undefined;
	    }
	}

	function isSet(tar) {
	    return typeof tar !== 'undefined';
	}

	function forEach(array, fn, context, breakValue) {
	    if (array && fn) {
	        for (var i = 0, len = array.length, val; i < len; i++) {
	            val = context ? fn.call(context, array[i], i, array) : fn(array[i], i, array);
	            if (val === false) {
	                return breakValue;
	            }
	        }
	    }
	}

	function keys(obj, fn) {
	    var keys = [];
	    for (var key in obj) {
	        keys.push(fn ? fn(key) : key);
	    }
	    return keys;
	}

	exports.default = util;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = undefined;

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	var _show = __webpack_require__(3);

	var _event = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BASE64CSS = __webpack_require__(5);

	function init(doSlide) {
	    if (!doSlide.config.customCSS) {
	        _util2.default.insertBase64CSS(BASE64CSS, 'do-slide-css');
	        _util2.default.addClass(doSlide.el.parentNode, doSlide.config.parentClass);
	        _util2.default.addClass(doSlide.el, doSlide.config.containerClass);
	        (0, _util2.default)(doSlide.el.children).addClass(doSlide.config.sectionClass);
	    }

	    if (!doSlide.config.silent) {
	        (0, _show.initSections)(doSlide, doSlide.config.initIndex || 0);
	    }

	    if (doSlide.config.eventElemSelector !== false) {
	        (0, _event.startListen)(doSlide);
	    }

	    _util2.default.removeClass(doSlide.el, doSlide.config.initClass);
	}

	exports.init = init;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.change = exports.initSections = undefined;

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	var _event = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var supportedTransition = _util2.default.getSupportedCSS('transition');
	var supportedTransform = _util2.default.getSupportedCSS('transform');

	function initSections(doSlide, initIndex) {
	    (0, _util2.default)(doSlide.el.children).css(supportedTransform ? _defineProperty({}, supportedTransform, 'translate' + (doSlide.config.horizontal ? 'X' : 'Y') + '(100%)') : { display: 'none' });
	    showSection(doSlide, initIndex, false, true);
	}

	function showSection(doSlide, index, isNext, isImmediate) {
	    var cur = doSlide.currentSection,
	        tar = doSlide.el.children[index],
	        config = doSlide.config;
	    var busyTime = (isImmediate ? 0 : 1) * (config.minInterval + (supportedTransition ? config.duration : 0));
	    doSlide.isChanging = true;
	    if (!doSlide.config.silent) {
	        setActiveClass(doSlide, index);
	        toggleTransitionClass(config, cur, tar, true);
	        transform(doSlide, index, isNext, isImmediate);
	    }
	    setTimeout(function () {
	        if (!doSlide.config.silent) {
	            toggleTransitionClass(config, cur, tar, false);
	        }
	        doSlide.isChanging = false;
	    }, busyTime);
	}

	function toggleTransitionClass(config, cur, tar, isAdd) {
	    if (isAdd) {
	        _util2.default.addClass(cur, config.transitionOutClass);
	        _util2.default.addClass(tar, config.transitionInClass);
	    } else {
	        _util2.default.removeClass(cur, config.transitionOutClass);
	        _util2.default.removeClass(tar, config.transitionInClass);
	    }
	}

	function setActiveClass(doSlide, index) {
	    (0, _util2.default)(doSlide.el.children).each(function (section, i) {
	        if (i === index) {
	            _util2.default.addClass(section, doSlide.config.activeClass);
	        } else {
	            _util2.default.removeClass(section, doSlide.config.activeClass);
	        }
	    });
	}

	function change(doSlide, index, isNext) {
	    if (canChangeNow(doSlide, index)) {
	        var lastIndex = doSlide.currentIndex;
	        if (isOverRange(doSlide, index)) {
	            (0, _event.excuteEventCallbacks)(doSlide, {
	                name: 'onOverRange',
	                args: [lastIndex, index, doSlide.currentSection]
	            });
	        } else if ((0, _event.excuteUserEventCallbacks)(doSlide)) {
	            var isOK = (0, _event.excuteEventCallbacks)(doSlide, {
	                name: 'onBeforeChange',
	                args: [lastIndex, index, doSlide.currentSection, doSlide.el.children[index]]
	            });
	            if (isOK) {
	                showSection(doSlide, index, isNext);
	                doSlide.currentIndex = index;
	                doSlide.currentSection = doSlide.el.children[index];
	                (0, _event.excuteEventCallbacks)(doSlide, {
	                    name: 'onChanged',
	                    args: [index, lastIndex, doSlide.currentSection, doSlide.el.children[lastIndex]]
	                });
	            }
	        }
	    }
	}

	function canChangeNow(doSlide, index) {
	    return !doSlide.isChanging && index != doSlide.currentIndex;
	}

	function isOverRange(doSlide, index) {
	    return index < 0 || index >= doSlide.el.children.length;
	}

	function transform(doSlide, index, isNext, isImmediate) {
	    var children = doSlide.el.children,
	        maxIndex = children.length - 1,
	        curIndex = doSlide.currentIndex;
	    var cur = doSlide.currentSection,
	        tar = children[index],
	        config = doSlide.config;
	    if (supportedTransform) {
	        var _$$css, _$$css2, _$$css3;

	        var isLoop = isInLoopBoundary(curIndex, index, maxIndex, isNext);
	        var direction = config.horizontal ? 'X' : 'Y';
	        var translate = (isLoop ? -1 : 1) * (index > curIndex ? 100 : -100);
	        var transition = supportedTransform + ' ' + (config.timingFunction || '') + ' ' + config.duration + 'ms';
	        var transitionClean = supportedTransform + ' 0ms';
	        transition = isImmediate ? transitionClean : transition;
	        _util2.default.css(tar, (_$$css = {}, _defineProperty(_$$css, supportedTransition, transitionClean), _defineProperty(_$$css, supportedTransform, 'translate' + direction + '(' + translate + '%)'), _$$css));
	        tar && tar.clientWidth; // read a property for triggering page reflow
	        _util2.default.css(cur, (_$$css2 = {}, _defineProperty(_$$css2, supportedTransition, transition), _defineProperty(_$$css2, supportedTransform, 'translate' + direction + '(' + -translate + '%)'), _$$css2));
	        _util2.default.css(tar, (_$$css3 = {}, _defineProperty(_$$css3, supportedTransition, transition), _defineProperty(_$$css3, supportedTransform, 'translate' + direction + '(0)'), _$$css3));
	    } else {
	        _util2.default.css(cur, { display: 'none' });
	        _util2.default.css(tar, { display: 'block' });
	    }
	}

	function isInLoopBoundary(curIndex, tarIndex, maxIndex, isNext) {
	    return curIndex === 0 && tarIndex === maxIndex && !isNext || curIndex === maxIndex && tarIndex === 0 && isNext;
	}

	exports.initSections = initSections;
	exports.change = change;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.excuteUserEventCallbacks = exports.excuteEventCallbacks = exports.startListen = undefined;

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function excuteUserEventCallbacks(doSlide) {
	    var event = doSlide.userEvent;
	    if (event) {
	        doSlide.userEvent = null;
	        var callbacks = doSlide.callbacks[event.name];
	        var ret = excute(callbacks, event.args, doSlide, false);
	        return ret !== false;
	    }
	    return true;
	}

	function excuteEventCallbacks(doSlide, event) {
	    var callbacks = doSlide.callbacks[event.name];
	    var ret = excute(callbacks, event.args, doSlide, false);
	    return ret !== false;
	}

	function excute(callbacks, args, context, breakValue) {
	    return _util2.default.forEach(callbacks, function (callback) {
	        return callback.apply(context, args);
	    }, null, breakValue);
	}

	function startListen(doSlide) {
	    var selector = doSlide.config.eventElemSelector;
	    if (selector === null) {
	        doSlide.eventEl = doSlide.el;
	    } else {
	        doSlide.eventEl = selector.nodeType ? selector : document.querySelector(selector);
	    }
	    if (doSlide.config.listenUserMouseWheel) {
	        listenUserMouseWheel(doSlide, doSlide.eventEl);
	    }
	    if (doSlide.config.listenUserSlide) {
	        listenUserSlide(doSlide, doSlide.eventEl);
	    }
	}

	function listenUserMouseWheel(doSlide, eventElem) {
	    _util2.default.onMouseWheel(eventElem, function (direction) {
	        if (doSlide.isChanging) return;
	        doSlide.userEvent = {
	            name: 'onUserMouseWheel',
	            args: [direction]
	        };
	        if (direction.down) {
	            doSlide.next();
	        } else {
	            doSlide.prev();
	        }
	    }, function () {
	        return doSlide.config.stopPropagation;
	    });
	}

	function listenUserSlide(doSlide, eventElem) {
	    _util2.default.onSlide(eventElem, function (direction) {
	        if (doSlide.isChanging) return;
	        doSlide.userEvent = {
	            name: 'onUserSlide',
	            args: [direction]
	        };
	        if (doSlide.config.horizontal) {
	            if (direction.left) doSlide.next();
	            if (direction.right) doSlide.prev();
	        } else {
	            if (direction.up) doSlide.next();
	            if (direction.down) doSlide.prev();
	        }
	    }, function () {
	        return doSlide.config.stopPropagation;
	    });
	}

	exports.startListen = startListen;
	exports.excuteEventCallbacks = excuteEventCallbacks;
	exports.excuteUserEventCallbacks = excuteUserEventCallbacks;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "LmRvLXNsaWRlLXBhcmVudCB7DQogICAgbWFyZ2luOiAwOw0KICAgIHBhZGRpbmc6IDA7DQogICAgb3ZlcmZsb3c6IGhpZGRlbjsNCn0NCg0KLmRvLXNsaWRlLWNvbnRhaW5lciB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIG1hcmdpbjogMDsNCiAgICBwYWRkaW5nOiAwOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGhlaWdodDogMTAwJTsNCiAgICBvdmVyZmxvdzogaGlkZGVuOw0KfQ0KDQouZG8tc2xpZGUtc2VjdGlvbiB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGhlaWdodDogMTAwJTsNCiAgICBvdmVyZmxvdzogaGlkZGVuOw0KfQ=="

/***/ }
/******/ ])
});
;