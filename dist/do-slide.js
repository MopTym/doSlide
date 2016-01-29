/*!
 * DoSlide v1.1.3
 * (c) 2016 MopTym <moptym@163.com>
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DoSlide
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * MopTym <moptym@163.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _config = __webpack_require__(1);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _init = __webpack_require__(3);

	var _event = __webpack_require__(5);

	var _show = __webpack_require__(4);

	var _keyboard = __webpack_require__(6);

	var _keyboard2 = _interopRequireDefault(_keyboard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DoSlide = function () {
	    function DoSlide() {
	        var selector = arguments.length <= 0 || arguments[0] === undefined ? document.createElement('div') : arguments[0];
	        var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, DoSlide);

	        Object.defineProperty(this, '_data', _config.DATA_DESCRIPTOR);
	        this.$ = _util2.default;
	        this.callbacks = {
	            onChanged: [],
	            onBeforeChange: [],
	            onOverRange: [],
	            onUserMouseWheel: [],
	            onUserSwipe: []
	        };
	        this.userEvent = null;
	        this.isChanging = false;
	        this.el = selector.nodeType ? selector : document.querySelector(selector);
	        this.eventEl = null;
	        this.sections = this.el.children;
	        this.currentIndex = config.initIndex || 0;
	        this.currentSection = this.sections[this.currentIndex];
	        this.config = _extends({}, _config.DEFAULT_CONFIG, _config.DEFAULT_INIT_CONFIG);
	        this.set(config);
	        (0, _init.init)(this);
	    }

	    _createClass(DoSlide, [{
	        key: 'set',
	        value: function set(name, value) {
	            var config = this.config;
	            if (typeof name === 'string') {
	                config[name] = value;
	            } else {
	                _extends(config, name);
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
	            this.go(index);
	            return this;
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            var index = this.config.infinite ? (this.currentIndex || this.el.children.length) - 1 : this.currentIndex - 1;
	            this.go(index);
	            return this;
	        }
	    }, {
	        key: 'go',
	        value: function go(index) {
	            (0, _show.change)(this, index);
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
	        key: 'onUserSwipe',
	        value: function onUserSwipe(callback) {
	            this.callbacks.onUserSwipe.push(callback);
	            return this;
	        }
	    }, {
	        key: 'initSpaceByKey',
	        value: function initSpaceByKey(key) {
	            Object.defineProperty(this._data, key, {
	                enumerable: false,
	                configurable: true,
	                writable: false,
	                value: {}
	            });
	            return this._data[key];
	        }
	    }, {
	        key: 'getSpaceByKey',
	        value: function getSpaceByKey(key) {
	            return this._data[key];
	        }
	    }]);

	    return DoSlide;
	}();

	DoSlide.from = function (doSlide, selector, config) {
	    return new DoSlide(selector, _extends({}, doSlide.config, config));
	};

	DoSlide.applyNewKey = function () {
	    var key = 'key' + Date.now() + ~ ~(Math.random() * 10000);
	    return key;
	};

	// install a plugin
	// the plugin should provide an 'install' function
	// which will be called with the DoSlide as the first argument,
	// along with possible config
	DoSlide.use = function (plugin, config) {
	    if (plugin && plugin.install) {
	        plugin.install(DoSlide, config);
	    }
	};

	// install build-in plugins
	DoSlide.use(_keyboard2.default);

	// inner tool library
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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var DEFAULT_INIT_CONFIG = exports.DEFAULT_INIT_CONFIG = {
	    initIndex: 0,
	    initClass: 'ds-init',

	    activeClass: 'active',
	    transitionInClass: 'transition-in',
	    transitionOutClass: 'transition-out',

	    silent: false,

	    horizontal: false,
	    infinite: false,

	    listenUserMouseWheel: true,
	    listenUserSwipe: true,
	    eventElemSelector: null
	};

	var DEFAULT_CONFIG = exports.DEFAULT_CONFIG = {
	    duration: 1000,
	    timingFunction: 'ease',
	    minInterval: 50,

	    translate3d: true,

	    parent: null,

	    respondToUserEvent: true,
	    stopPropagation: false
	};

	var DATA_DESCRIPTOR = exports.DATA_DESCRIPTOR = {
	    enumerable: false,
	    configurable: false,
	    writable: false,
	    value: {}
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var MAX_TOUCH_TIME = 800;
	var SLIDE_THRESHOLD = 50;

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
	    onSwipe: function onSwipe(callback, isStopPropFn) {
	        return this.each(function (elem) {
	            return util.onSwipe(elem, callback, isStopPropFn);
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

	    /**
	     * get supported CSS property name
	     * example: if the browser only support '-webkit-transform', getSupportedCSS('transfrom') => '-webkit-transform'
	     */
	    getSupportedCSS: function () {
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
	    }(),

	    onMouseWheel: function onMouseWheel(elem, callback) {
	        var isStopPropFn = arguments.length <= 2 || arguments[2] === undefined ? function () {
	            return false;
	        } : arguments[2];

	        if (!elem || !callback) return;
	        var lastTime = 0,
	            scrollings = [];['DOMMouseScroll', 'mousewheel'].map(function (mouseWheel) {
	            elem.addEventListener(mouseWheel, function (event) {
	                event.preventDefault();
	                if (isStopPropFn()) event.stopPropagation();
	                var delta = event.detail ? -event.detail : event.wheelDelta;
	                if (delta) {
	                    if (Date.now() - lastTime > 200) {
	                        scrollings = [];
	                    }
	                    lastTime = Date.now();
	                    scrollings.push(Math.abs(delta));
	                    if (scrollings.length > 150) {
	                        scrollings.shift();
	                    }
	                    var avgEnd = ~ ~getAvarage(scrollings.slice(-10));
	                    var avgMiddle = ~ ~getAvarage(scrollings.slice(-70));
	                    var isAccelerating = avgEnd >= avgMiddle;
	                    if (isAccelerating) {
	                        var direction = delta < 0 ? 'down' : 'up';
	                        callback.call(elem, direction);
	                    }
	                }
	            }, false);
	        });
	    },
	    onSwipe: function onSwipe(elem, callback) {
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
	                var direction = undefined;
	                if (Math.max(absDiffX, absDiffY) > SLIDE_THRESHOLD) {
	                    if (absDiffX > absDiffY) {
	                        direction = diffX > 0 ? 'right' : 'left';
	                    } else {
	                        direction = diffY > 0 ? 'down' : 'up';
	                    }
	                    callback.call(elem, direction);
	                }
	            }
	        }, false);
	    },

	    forEach: forEach,

	    keys: keys

	});

	function getAvarage(array) {
	    if (!array.length) return 0;
	    var sum = Array.prototype.reduce.call(array, function (last, item) {
	        return last + item;
	    });
	    return sum / array.length;
	}

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = undefined;

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _show = __webpack_require__(4);

	var _event = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function init(doSlide) {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.change = exports.initSections = undefined;

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _event = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var supportedTransition = _util2.default.getSupportedCSS('transition');
	var supportedTransform = _util2.default.getSupportedCSS('transform');

	var isSupport3d = function () {
	    var has3d = false;
	    if (supportedTransform && window.getComputedStyle) {
	        var el = document.createElement('div');
	        document.body.insertBefore(el, null);
	        el.style[supportedTransform] = 'translate3d(1%, 1%, 0)';
	        has3d = window.getComputedStyle(el).getPropertyValue(supportedTransform);
	        document.body.removeChild(el);
	    }
	    return has3d && has3d !== 'none';
	}();

	function initSections(doSlide, initIndex) {
	    var $container = (0, _util2.default)(doSlide.el);
	    var $sections = (0, _util2.default)(doSlide.sections);
	    if (doSlide.config.horizontal) {
	        $container.css('width', $sections.length + '00%');
	        $sections.css({
	            width: 100 / $sections.length + '%',
	            float: 'left'
	        });
	    } else {
	        $container.css('height', $sections.length + '00%');
	        $sections.css('height', 100 / $sections.length + '%');
	    }
	    showSection(doSlide, initIndex, true);
	}

	function showSection(doSlide, index, isImmediate) {
	    var cur = doSlide.currentSection;
	    var tar = doSlide.sections[index];
	    var config = doSlide.config;
	    var busyTime = config.minInterval + (supportedTransition ? config.duration : 0);
	    busyTime = isImmediate ? 0 : busyTime;
	    doSlide.isChanging = true;
	    if (!doSlide.config.silent) {
	        setActiveClass(doSlide, index);
	        if (!isImmediate) {
	            toggleTransitionClass(config, cur, tar, true);
	        }
	        transform(doSlide, index, isImmediate);
	    }
	    setTimeout(function () {
	        if (!config.silent && !isImmediate) {
	            toggleTransitionClass(config, cur, tar, false);
	        }
	        doSlide.isChanging = false;
	    }, busyTime);
	    return busyTime;
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
	    (0, _util2.default)(doSlide.sections).each(function (section, i) {
	        if (i === index) {
	            _util2.default.addClass(section, doSlide.config.activeClass);
	        } else {
	            _util2.default.removeClass(section, doSlide.config.activeClass);
	        }
	    });
	}

	function change(doSlide, index) {
	    if (canChangeNow(doSlide, index)) {
	        if (isOverRange(doSlide, index)) {
	            doingOnOverRange(doSlide, index);
	        } else if ((0, _event.executeUserEventCallbacks)(doSlide)) {
	            (function () {
	                var lastIndex = doSlide.currentIndex;
	                var isOK = (0, _event.executeEventCallbacks)(doSlide, {
	                    name: 'onBeforeChange',
	                    args: [lastIndex, index, doSlide.currentSection, doSlide.sections[index]]
	                });
	                if (isOK) {
	                    var busyTime = showSection(doSlide, index);
	                    doSlide.currentIndex = index;
	                    doSlide.currentSection = doSlide.sections[index];
	                    setTimeout(function () {
	                        (0, _event.executeEventCallbacks)(doSlide, {
	                            name: 'onChanged',
	                            args: [index, lastIndex, doSlide.currentSection, doSlide.sections[lastIndex]]
	                        });
	                    }, busyTime);
	                }
	            })();
	        }
	    }
	}

	function canChangeNow(doSlide, index) {
	    return !doSlide.isChanging && index != doSlide.currentIndex;
	}

	function isOverRange(doSlide, index) {
	    return index < 0 || index >= doSlide.sections.length;
	}

	function doingOnOverRange(doSlide, index) {
	    var parent = doSlide.config.parent;
	    var isOK = (0, _event.executeEventCallbacks)(doSlide, {
	        name: 'onOverRange',
	        args: [doSlide.currentIndex, index, doSlide.currentSection]
	    });
	    if (isOK && parent) {
	        if (index < 0) {
	            parent.prev();
	        } else {
	            parent.next();
	        }
	    }
	}

	function transform(doSlide, index, isImmediate) {
	    var config = doSlide.config;
	    if (supportedTransform) {
	        if (supportedTransition) {
	            var transition = supportedTransform + ' ' + (config.timingFunction || '') + ' ' + config.duration + 'ms';
	            var transitionClean = supportedTransform + ' 0ms';
	            _util2.default.css(doSlide.el, supportedTransition, isImmediate ? transitionClean : transition);
	        }
	        var offset = -index * 100 / doSlide.sections.length + '%';
	        var translate = config.horizontal ? offset + ',0' : '0,' + offset;
	        translate = isSupport3d && config.translate3d ? 'translate3d(' + translate + ',0)' : 'translate(' + translate + ')';
	        _util2.default.css(doSlide.el, supportedTransform, translate);
	    } else {
	        _util2.default.css(doSlide.el, config.horizontal ? 'left' : 'top', -index + '00%');
	    }
	}

	exports.initSections = initSections;
	exports.change = change;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.executeUserEventCallbacks = exports.executeEventCallbacks = exports.startListen = undefined;

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function executeUserEventCallbacks(doSlide) {
	    var event = doSlide.userEvent;
	    if (event) {
	        doSlide.userEvent = null;
	        var callbacks = doSlide.callbacks[event.name];
	        var ret = execute(callbacks, event.args, doSlide, false);
	        return ret !== false;
	    }
	    return true;
	}

	function executeEventCallbacks(doSlide, event) {
	    var callbacks = doSlide.callbacks[event.name];
	    var ret = execute(callbacks, event.args, doSlide, false);
	    return ret !== false;
	}

	function execute(callbacks, args, context, breakValue) {
	    return _util2.default.forEach(callbacks, function (callback) {
	        return callback.apply(context, args);
	    }, null, breakValue);
	}

	function startListen(doSlide) {
	    determineEventElem(doSlide);
	    if (doSlide.config.listenUserMouseWheel) {
	        listenUserMouseWheel(doSlide, doSlide.eventEl);
	    }
	    if (doSlide.config.listenUserSwipe) {
	        listenUserSwipe(doSlide, doSlide.eventEl);
	    }
	}

	function determineEventElem(doSlide) {
	    var selector = doSlide.config.eventElemSelector;
	    if (selector === null) {
	        doSlide.eventEl = doSlide.el;
	    } else {
	        doSlide.eventEl = selector.nodeType ? selector : document.querySelector(selector);
	    }
	}

	function listenUserMouseWheel(doSlide, eventElem) {
	    _util2.default.onMouseWheel(eventElem, function (direction) {
	        if (!doSlide.config.respondToUserEvent || doSlide.isChanging) return;
	        doSlide.userEvent = {
	            name: 'onUserMouseWheel',
	            args: [direction]
	        };
	        if (direction === 'down') {
	            doSlide.next();
	        } else {
	            doSlide.prev();
	        }
	    }, function () {
	        return doSlide.config.stopPropagation;
	    });
	}

	function listenUserSwipe(doSlide, eventElem) {
	    _util2.default.onSwipe(eventElem, function (direction) {
	        if (!doSlide.config.respondToUserEvent || doSlide.isChanging) return;
	        doSlide.userEvent = {
	            name: 'onUserSwipe',
	            args: [direction]
	        };
	        if (doSlide.config.horizontal) {
	            if (direction === 'left') doSlide.next();
	            if (direction === 'right') doSlide.prev();
	        } else {
	            if (direction === 'up') doSlide.next();
	            if (direction === 'down') doSlide.prev();
	        }
	    }, function () {
	        return doSlide.config.stopPropagation;
	    });
	}

	exports.startListen = startListen;
	exports.executeEventCallbacks = executeEventCallbacks;
	exports.executeUserEventCallbacks = executeUserEventCallbacks;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Keyboard = function () {
	    function Keyboard(doSlide, key) {
	        _classCallCheck(this, Keyboard);

	        this.eventType = 'keydown';
	        this.eventElement = window;
	        this.for = doSlide;
	        this.$ = doSlide.$;
	        this.isOn = false;
	        this.listener = listener.bind(this);
	        this.mappings = [{
	            filter: filterByKeyCode(40), // down
	            action: function action() {
	                if (!this.config.horizontal) this.next();
	            }
	        }, {
	            filter: filterByKeyCode(38), // up
	            action: function action() {
	                if (!this.config.horizontal) this.prev();
	            }
	        }, {
	            filter: filterByKeyCode(39), // right
	            action: function action() {
	                if (this.config.horizontal) this.next();
	            }
	        }, {
	            filter: filterByKeyCode(37), // left
	            action: function action() {
	                if (this.config.horizontal) this.prev();
	            }
	        }];
	    }

	    _createClass(Keyboard, [{
	        key: 'setEventType',
	        value: function setEventType(eventType) {
	            if (eventType !== this.eventType) {
	                var isOn = this.isOn;
	                if (isOn) this.turnOff();
	                this.eventType = eventType;
	                if (isOn) this.turnOn();
	            }
	            return this;
	        }
	    }, {
	        key: 'setEventElement',
	        value: function setEventElement(elem) {
	            if (elem !== this.eventElement) {
	                var isOn = this.isOn;
	                if (isOn) this.turnOff();
	                this.eventElement = elem;
	                if (isOn) this.turnOn();
	            }
	            return this;
	        }
	    }, {
	        key: 'getMappings',
	        value: function getMappings() {
	            return this.mappings;
	        }
	    }, {
	        key: 'setMappings',
	        value: function setMappings(mappings) {
	            this.mappings = mappings;
	            return this;
	        }
	    }, {
	        key: 'turnOn',
	        value: function turnOn() {
	            if (!this.isOn) {
	                this.$.on(this.eventElement, this.eventType, this.listener, false);
	                this.isOn = true;
	            }
	            return this;
	        }
	    }, {
	        key: 'turnOff',
	        value: function turnOff() {
	            if (this.isOn) {
	                this.$.off(this.eventElement, this.eventType, this.listener, false);
	                this.isOn = false;
	            }
	            return this;
	        }
	    }]);

	    return Keyboard;
	}();

	function filterByKeyCode(keyCode) {
	    return function (event) {
	        return event.keyCode === keyCode;
	    };
	}

	function listener(event) {
	    var mappings = this.mappings || [];
	    var doSlide = this.for;
	    mappings.forEach(function (mapping) {
	        if (mapping.filter.call(doSlide, event) === true) {
	            mapping.action.call(doSlide, event);
	        }
	    });
	}

	function install(DoSlide) {
	    DoSlide.prototype.getKeyboard = function () {
	        var key = DoSlide.applyNewKey();
	        return function () {
	            var space = this.getSpaceByKey(key);
	            if (!space) {
	                space = this.initSpaceByKey(key);
	                space.res = new Keyboard(this, key);
	            }
	            return space.res;
	        };
	    }();
	}

	exports.default = { install: install };

/***/ }
/******/ ])
});
;