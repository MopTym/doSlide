![preview](do-slide.jpg)

# DoSlide

[![Build Status](https://img.shields.io/travis/MopTym/doSlide.svg?style=flat-square)](https://travis-ci.org/MopTym/doSlide)
[![Version](https://img.shields.io/npm/v/do-slide.svg?style=flat-square)](https://www.npmjs.com/package/do-slide)
[![License](https://img.shields.io/npm/l/do-slide.svg?style=flat-square)](LICENSE)

Fullpage scroll / Section scroll / Slider / No denpendency / Gzipped size < 5KB

<br>

[简体中文](README_ZH_CN.md)

<br>

- [Introduction](#introduction)
- [Usage](#usage)
- [Behavior pattern](#behavior-pattern)
- [Create object](#create-object)
- [Configuration](#configuration)
- [Properties](#properties)
- [Functions](#functions)
- [Callbacks](#callbacks)
- [Inner tool library](#inner-tool-library)
- [Plugins](#plugins)
- [Low invasive](#low-invasive)
- [Compatibility](#compatibility)
- [FAQ](#faq)
- [Examples](#examples)
- [Contributing](#contributing)

<br>

## Introduction

DoSlide is a light, no dependency and low invasive JS plugin, providing a pattern which switch entire one section at a time. DoSlide can be flexibly configured and has an inner tool library like jQuery, you can implement specific requirements quickly by taking advantage of it.

Take a quick look at [introduction page](http://app.moptym.com/do-slide).

**Noted:** In order to optimize performance (especially on mobile), the version 1.0.0 changes the default switch (scroll) mechanism, meanwhile, the way of including CSS and other places have been changed, so it's not compatible with previous versions.

<br>


## Usage

Download [dist](dist) folder or install it by using [npm](https://www.npmjs.com/):
```shell
npm install --save do-slide
```

DoSlide is a [UMD](https://github.com/umdjs/umd) module, which can be used as a module in both CommonJS and AMD modular environments. When in non-modular environment, a variable named '`DoSlide`' will be exposed in outer scope.

Include CSS file:
```html
<link rel="stylesheet" href="path/to/do-slide/dist/do-slide.min.css">
```

Include JS file:
```html
<script src="path/to/do-slide/dist/do-slide.min.js"></script>
```

HTML structure:
```html
<div class="ds-parent">
    <div class="ds-container">
        <div>Section 1</div>
        <div>Section 2</div>
        <div>Section 3</div>
    </div>
</div>
```

Then create a corresponding DoSlide object:
```js
var slide = new DoSlide('.ds-container', {/* configurations */})
```

The CSS file content ([do-slide.css](dist/do-slide.css)) is very simple, you can copy it to your project CSS instead of including the file alone (if don't take update into account) . Default `ds-parent` class doesn't set `position` property (not be positioned) and size properties, you can set them when you need.

**Noted:** Do not use `<body>` as parent element, it may cause a problem with height in some Android browsers which have auto-hide location bar ([issue#8](https://github.com/MopTym/doSlide/issues/8)) , don't do this:
```html
<body class="ds-parent"> <!-- Do not use 'body' as parent element -->
    <div class="ds-container">
        <div></div>
        <div></div>
        <div></div>
    </div>
</body>
```
This structure is OK:
```html
<body>
    <div class="ds-parent">
        <div class="ds-container">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</body>
```

**TL;DR:** The basic code to apply full page scrolling:
```html
<body>
    <div class="wrap ds-parent">
        <div class="ds-container">
            <div>Section 1</div>
            <div>Section 2</div>
            <div>Section 3</div>
        </div>
    </div>
</body>
```
```css
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
.wrap {
    position: absolute;
    width: 100%;
    height: 100%;
}
```
```js
var slide = new DoSlide('.ds-container')
```

<br>

There are several practices in [Examples](#examples) section.

<br>


## Behavior pattern

By understanding how DoSlide works, you can use it better. In its default configuration, DoSlide acts as follows:

Assume there is a HTML structure:
```html
<html>
    <head>
        ......
    </head>
    <body>
        <div class="ds-parent">
            <div class="ds-container ds-init">
                <div class="section-1"></div>
                <div class="section-2"></div>
                <div class="section-3"></div>
            </div>
        </div>
        ......
    </body>
</html>
```

After page structure finishes loading, we execute
```js
new DoSlide('.ds-container')
```
to create a new DoSlide object. In this time, the object performs the following actions:

- initialize child elements
- activate (add `active` class) and display the first child element
- start listen user mouse wheel and touch slide events
- remove `ds-init` class from corresponding element

The code about above process is in [init.js](src/init.js) . The default CSS is in [style.css](src/style.css) .

Then the HTML will look like:
```html
<html>
    <head>
        ......
    </head>
    <body>
        <div class="ds-parent">
            <div class="ds-container">
                <div class="section-1 active"></div>
                <div class="section-2"></div>
                <div class="section-3"></div>
            </div>
        </div>
        ......
    </body>
</html>
```

When user mouse wheel or touch slide event is triggered, DoSlide will switch active section if it can.

When switching start, DoSlide will add `transition-out` class to current section and add `transition-in` class to target section, then remove them both when switching complete.

<br>


## Create object

DoSlide provides two ways to create object:
- `new DoSlide([selector, config])`
- `DoSlide.from(doSlideObj[, selector, config])`

The `selector` argument can be a selector string or a HTMLElement.

There can be several DoSlide objects in a page, you can use `DoSlide.from()` to create a new object configured as same as the given `doSlideObj`.

<br>


## Configuration

In DoSlide's source code ([index.js](src/index.js)) , configurations look like this:
```js
const DEFAULT_INIT_CONFIG = {
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

const DEFAULT_CONFIG = {
    duration             : 1000,
    timingFunction       : 'ease',
    minInterval          : 50,

    translate3d          : true,

    parent               : null,

    respondToUserEvent   : true,
    stopPropagation      : false
}
```
```js
// in constructor
this.config = Object.assign({}, DEFAULT_CONFIG, DEFAULT_INIT_CONFIG)
this.set(config)
```

The default `config` is a combination of `DEFAULT_INIT_CONFIG` and `DEFAULT_CONFIG`. The `DEFAULT_INIT_CONFIG` only can be customized once at initialization time:
```js
var slide = new DoSlide('.container', {
    horizontal: true    // customize DEFAULT_INIT_CONFIG
})
```
don't do this:
```js
slide.set({
    horizontal: true    // don't o(>_<)o
})
```
but you can customize `DEFAULT_CONFIG` in any time.

A more detailed explanation of the configurations follows below:

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th width="180">Default value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>initIndex</td>
            <td>0</td>
            <td>Index of section to be activated on initialization.</td>
        </tr>
        <tr>
            <td>initClass</td>
            <td>do-slide-init</td>
            <td>Class to be removed after initialization.</td>
        </tr>
        <tr>
            <td>activeClass</td>
            <td>active</td>
            <td>Class to be added to active child element.</td>
        </tr>
        <tr>
            <td>transitionInClass</td>
            <td>transition-in</td>
            <td>Class to be added to translate-in element.</td>
        </tr>
        <tr>
            <td>transitionOutClass</td>
            <td>transition-out</td>
            <td>Class to be added to translate-out element.</td>
        </tr>
        <tr>
            <td>silent</td>
            <td>false</td>
            <td>If set to <code>true</code>, the actions of DoSlide object will be pure logic with no affect to HTML.</td>
        </tr>
        <tr>
            <td>horizontal</td>
            <td>false</td>
            <td>Defines whether to be horizontal switching or not.</td>
        </tr>
        <tr>
            <td>infinite</td>
            <td>false</td>
            <td>Defines whether to be infinite switching or not.</td>
        </tr>
        <tr>
            <td>listenUserMouseWheel</td>
            <td>true</td>
            <td>Defines whether to listen user mouse wheel event or not.</td>
        </tr>
        <tr>
            <td>listenUserSlide</td>
            <td>true</td>
            <td>Defines whether to listen user touch slide event or not.</td>
        </tr>
        <tr>
            <td>eventElemSelector</td>
            <td>null</td>
            <td>User event element selector. Set to <code>null</code> to let corresponding element be event element. Set to <code>false</code> will don't listen user events. In other case, it can be a selector string or a HTMLElement.</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th width="180">Default value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>duration</td>
            <td>1000</td>
            <td>Transition time (ms) .</td>
        </tr>
        <tr>
            <td>timingFunction</td>
            <td>ease</td>
            <td>The value of <code>transition-timing-function</code> property in CSS.</td>
        </tr>
        <tr>
            <td>minInterval</td>
            <td>50</td>
            <td>The minimum time interval between switching.</td>
        </tr>
        <tr>
            <td>translate3d</td>
            <td>true</td>
            <td>Defines whether to use CSS <code>translate3d</code> or not.</td>
        </tr>
        <tr>
            <td>parent</td>
            <td>null</td>
            <td>Parent DoSlide object.</td>
        </tr>
        <tr>
            <td>respondToUserEvent</td>
            <td>true</td>
            <td>Defines whether to respond to user event or not.</td>
        </tr>
        <tr>
            <td>stopPropagation</td>
            <td>false</td>
            <td>Defines whether to stop event propagation or not.</td>
        </tr>
    </tbody>
</table>

**Noted:** `parent` just a shortcut that be used to implement linkage in nested structure quickly, you can totally implement the linkage by using `onOverRange()` and `stopPropagation` instead of using `parent`.

<br>


## Properties

### Properties of DoSlide object (instance):

| Name | Readonly | Description |
| --- | :---: | --- |
| el | yes | Corresponding element. |
| eventEl | yes | Event element. |
| sections | yes | Collection of sections |
| currentIndex | yes | Index of current section. |
| currentSection | yes | Current section. |
| isChanging | yes | Is switching sections now. |
| $ | yes | Inner tool library. |

### Properties of DoSlide:

| Name | Readonly | Description |
| --- | :---: | --- |
| supportedTransition | yes | Supported CSS `transition` property name. |
| supportedTransform | yes | Supported CSS `transform` property name. |
| $ | yes | Inner tool library. |

<br>


## Functions

### Functions of DoSlide object (instance):

#### next()

Switch to next section.

#### prev()

Switch to previous section.

#### go(index)

Switch to section with given index.

#### set(name, value) || set({ name: value, ... })

Set configuration value.

#### get(name)

Get configuration value.

#### do(callback(curIndex, cur))

- `curIndex`: index of current section
- `cur`: current section

Excute `callback` with current DoSlide object as context object (`this`) .

#### initSpaceByKey(key)

Initialize space of current DoSlide object by key, return initialized space. The space is an object, the key is generated by `applyNewKey`.

#### getSpaceByKey(key)

Get space by key.

### Functions of DoSlide:

#### applyNewKey()

Apply a globally unique key for `getSpaceByKey`.

#### use(plugin[, config])

Install a plugin. It will call `plugin.install(DoSlide, config)` , so the `plugin` should provide an `install` function which will be called with the `DoSlide` as the first argument, along with possible `config`.

<br>


## Callbacks

#### onBeforeChange(callback(curIndex, tarIndex, cur, tar))

- `curIndex`: index of current section
- `tarIndex`: index of target section
- `cur`: current section
- `tar`: target section

Before switching occurs, excute `callback` with current DoSlide object as context object (`this`) .

#### onChanged(callback(curIndex, lastIndex, cur, last))

- `curIndex`: index of current section
- `lastIndex`: index of last section
- `cur`: current section
- `last`: last section

After switching, excute `callback` with current DoSlide object as context object (`this`) .

#### onOverRange(callback(curIndex, tarIndex, cur))

- `curIndex`: index of current section
- `tarIndex`: index of target section
- `cur`: current section

When try to switch to overrange section, excute `callback` with current DoSlide object as context object (`this`) .

#### onUserMouseWheel(callback(direction))

- `direction`: string `up` or `down` represent scroll direction

Before switching which caused by mouse wheel event occurs, excute `callback` with current DoSlide object as context object (`this`) .

#### onUserSwipe(callback(direction))

- `direction`: string `up`, `down`, `left` or `right` represent swipe direction

Before switching which caused by swipe event occurs, excute `callback` with current DoSlide object as context object (`this`) .

<br>

#### Trigger order

1. `onUserMouseWheel` or `onUserSwipe`
2. `onBeforeChange`
3. `onChanged`

You can return `false` in any `callback` to terminate subsequent calls.

<br>

Example [2_0_event](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/2_0_event.html) ([source](demo/2_0_event.html)) shows the process.

<br>


## Inner tool library

You can access inner tool library through `DoSlide.$` or `$` property of DoSlide object.

The library provides such functions like jQuery:

#### on(type, listener[, useCapture = false])

- `$(selector) .on(type, listener, useCapture)`
- `$.on(HTMLElement, type, listener, useCapture)`

#### off(type, listener[, useCapture = false])

- `$(selector) .off(type, listener, useCapture)`
- `$.off(HTMLElement, type, listener, useCapture)`

#### attr(name, value) || attr(attrObj)

- `$(selector) .attr(name, value)` || `$(selector) .attr(attrObj)`
- `$.attr(HTMLElement, name, value)` || `$.attr(HTMLElement, attrObj)`

#### removeAttr(name)

- `$(selector) .removeAttr(name)`
- `$.removeAttr(HTMLElement, name)`

#### css(name, value) || css(propertyObj)

- `$(selector) .css(name, value)` || `$(selector) .css(propertyObj)`
- `$.css(HTMLElement, name, value)` || `$.css(HTMLElement, propertyObj)`

#### addClass(name)

- `$(selector) .addClass(name)`
- `$.addClass(HTMLElement, name)`

#### removeClass(name)

- `$(selector) .removeClass(name)`
- `$.removeClass(HTMLElement, name)`

#### hasClass(name)

- `$(selector) .hasClass(name)`
- `$.hasClass(HTMLElement, name)`

#### eq(index)

- `$(selector) .eq(index)`

#### each(callback, isContext, isFalseBreak, breakValue)

- `$(selector) .each(callback, isContext, isFalseBreak, breakValue)`
- `$.each(Array, callback, isContext, isFalseBreak, breakValue)`

#### getSupportedCSS(name[, isAutoPrefix = true])

- `$.getSupportedCSS(name, isAutoPrefix)`

Get supported CSS property name. For example, the browser only supports `-webkit-transform`, then `getSupportedCSS('transfrom')` will return '`-webkit-transform'`.

#### onMouseWheel(HTMLElement, callback(direction)[, isStopPropFn() => false])

- `direction`: string `up` or `down` represent scroll direction
- `isStopPropFn`: a function return `true` or `false`, defines whether to stop event propagation or not

Listen user mouse wheel event, excute `callback` with `HTMLElement` as context object (`this`) when triggered.

#### onSwipe(HTMLElement, callback(direction)[, isStopPropFn() => false])

- `direction`: string `up`, `down`, `left` or `right` represent swipe direction
- `isStopPropFn`: a function return `true` or `false`, defines whether to stop event propagation or not

Listen user touch swipe event, excute `callback` with `HTMLElement` as context object (`this`) when triggered.

<br>

#### Example codes

```js
DoSlide.$('.foo')
       .addClass('fooClass')
       .attr({
            fooAttr: 'fooValue'
       })
       .css({
            'font-size': '2em'
       })
       .on('click', function(event) {
            console.log(event)
       })
```
```js
DoSlide.$.onMouseWheel(document.body, function(direction) {
    console.log(direction)
})
```

<br>


## Plugins

See [src/plugins](src/plugins) .

<br>


## Low invasive

The feature is mainly embodied in the following 2 aspects:

- No monkey-patching. No more than one variable (`DoSlide`) may be exposed in outer scope.
- You can take only what you need.

<br>


## Compatibility

DoSlide can run on all modern browsers which support ES5.

If the browser dosen't support CSS `transform`, DoSlide will use `left` / `top` instead.

<br>


## FAQ

#### Waht is DoSlide, anyway?

Actually, in my mind, it's a switch pattern, by the way, providing some functionalities. But no matter how I explain, it is (looks like) a plugin.

#### How to customize the transition effect?

You can reference [3_0_fade](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_0_fade.html) ([source](demo/3_0_fade.html)) , the KEY is setting `silent` to `true` to make original actions be pure logic, then you can do whatever you want.

<br>


## Examples

#### [0_0_basic](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_0_basic.html) ([source](demo/0_0_basic.html))

Basic usage, apply full page scrolling easily and quickly.

#### [0_1_horizontal](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_1_horizontal.html) ([source](demo/0_1_horizontal.html))

Horizontal scrolling.

#### [0_2_infinite](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_2_infinite.html) ([source](demo/0_2_infinite.html))

Infinite scrolling.

#### [0_3_transition](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_3_transition.html) ([source](demo/0_3_transition.html))

About transition.

#### [0_4_nested](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_4_nested.html) ([source](demo/0_4_nested.html))

Nested structure.

#### [1_0_set_class](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/1_0_set_class.html) ([source](demo/1_0_set_class.html))

Configurate class name.

#### [2_0_event](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/2_0_event.html) ([source](demo/2_0_event.html))

About event callbacks.

#### [2_1_event_element](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/2_1_event_element.html) ([source](demo/2_1_event_element.html))

Configurate event element.

#### [2_2_invert_mouse_wheel](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/2_2_invert_mouse_wheel.html) ([source](demo/2_2_invert_mouse_wheel.html))

Invert mouse wheel.

#### [3_0_fade](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_0_fade.html) ([source](demo/3_0_fade.html))

Implement fade effect quickly by using inner tool library and event callbacks.

#### [3_1_slider](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_1_slider.html) ([source](demo/3_1_slider.html))

A simple slider.

#### [3_2_slider_fade](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_2_slider_fade.html) ([source](demo/3_2_slider_fade.html))

A simple slider with fade effect.

#### [3_3_init](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_3_init.html) ([source](demo/3_3_init.html))

About initialization.

<br>


## Contributing

Development is in the `dev` branch, please push new changes to `dev` branch.

- **Development:** webpack + babel
- **Test:** mocha-phantomjs + chai
- **Continuous integration:** Travis CI

```shell

# install
npm install

# develop
npm run watch

# test
npm test

# build
npm run build

```

If you catch a mistake or want to contribute to the repository, any PR is **welcome**.

<br>

**Love & Peace (ง •̀_•́)ง**
