/******/ (function(modules) { // webpackBootstrap
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

	describe('DoSlide', function () {

	    var testsContext = __webpack_require__(1);
	    testsContext.keys().forEach(testsContext);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./util.spec": 2
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _util = __webpack_require__(3);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('unit', function () {

		describe('css', function () {

			describe('hasClass()', function () {
				var elem = document.createElement('div');
				var $elem = (0, _util2.default)(elem);
				elem.className = 'aa';
				it('should return true when there is given class name', function () {
					expect($elem.hasClass('aa')).to.equal(true);
				});
				it('should return false when there is no given class name', function () {
					expect($elem.hasClass('bb')).to.equal(false);
				});
				it('should return false when give ""', function () {
					expect($elem.hasClass('')).to.equal(false);
				});
				it('should return false when give nothing', function () {
					expect($elem.hasClass()).to.equal(false);
				});
			});

			describe('addClass()', function () {
				var elem = document.createElement('div');
				var $elem = (0, _util2.default)(elem);
				elem.className = '';
				it('should correctly add the given class name', function () {
					$elem.addClass('aa');
					expect(elem.className).to.equal('aa');
				});
				it('should not add the class name that already have', function () {
					$elem.addClass('aa');
					expect(elem.className).to.equal('aa');
				});
			});

			describe('removeClass()', function () {
				var elem = document.createElement('div');
				var $elem = (0, _util2.default)(elem);
				elem.className = 'aa bb cc';
				it('should correctly remove the given class name', function () {
					_util2.default.removeClass(elem, 'bb');
					expect(elem.className).to.equal('aa cc');
					_util2.default.removeClass(elem, 'cc');
					expect(elem.className).to.equal('aa');
				});
				it('should not remove anything when give ""', function () {
					_util2.default.removeClass(elem, '');
					expect(elem.className).to.equal('aa');
				});
				it('should not remove anything when give nothing', function () {
					_util2.default.removeClass(elem);
					expect(elem.className).to.equal('aa');
				});
			});

			describe('css()', function () {
				var elem = document.createElement('div');
				var $elem = (0, _util2.default)(elem);
				it('should correctly set the css property value', function () {
					$elem.css({ position: 'absolute' });
					expect(elem.style.position).to.equal('absolute');
					$elem.css('color', 'black');
					expect(elem.style.color).to.equal('black');
				});
				it('should return correct css property value', function () {
					expect($elem.css('color')).to.equal('black');
				});
			});

			describe('getSupportedCSS()', function () {
				it('should support autoPrefix', function () {
					expect(_util2.default.getSupportedCSS('transform')).to.equal('-webkit-transform');
				});
				it('should return undefined when not support the given property', function () {
					expect(_util2.default.getSupportedCSS('s')).to.equal(undefined);
				});
			});
		});

		describe('array', function () {

			describe('forEach()', function () {
				it('should correctly traverse the array', function () {
					var i = 0;
					_util2.default.forEach([1, 2, 3], function (val) {
						return i += val;
					});
					expect(i).to.equal(6);
				});
			});

			describe('keys()', function () {
				it('should correctly get the keys', function () {
					var res = _util2.default.keys([1, 2, 3]);
					expect(res).to.deep.equal(['0', '1', '2']);
				});
			});
		});
	});

/***/ },
/* 3 */
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

/***/ }
/******/ ]);