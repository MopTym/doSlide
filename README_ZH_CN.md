![preview](do-slide.jpg)

# DoSlide

[![Build Status](https://img.shields.io/travis/MopTym/doSlide.svg?style=flat-square)](https://travis-ci.org/MopTym/doSlide)
[![Version](https://img.shields.io/npm/v/do-slide.svg?style=flat-square)](https://www.npmjs.com/package/do-slide)
[![License](https://img.shields.io/npm/l/do-slide.svg?style=flat-square)](LICENSE)

整屏滚动 / 轮播 / 无依赖 / Gzip 后小于 5KB

<br>

[English Version](README.md)

<br>

- [插件介绍](#插件介绍)
- [如何使用](#如何使用)
- [行为模式](#行为模式)
- [创建对象](#创建对象)
- [配置选项](#配置选项)
- [属性](#属性)
- [方法](#方法)
- [回调](#回调)
- [内置工具库](#内置工具库)
- [插件](#插件)
- [低侵入性](#低侵入性)
- [兼容性](#兼容性)
- [一些问题](#一些问题)
- [使用示例](#使用示例)
- [开发贡献](#开发贡献)

<br>

## 插件介绍

DoSlide 是个轻巧、无依赖、低侵入性的 JS 插件，提供一次切换整个子区域的切换模式。DoSlide 的行为可以灵活配置，内置类似 jQuery 的工具库，你可以借助其迅速地实现各种具体需求。

若需快速了解此插件，请访问 [介绍页面](http://app.moptym.com/do-slide) 。

**注意：** 版本1.0.0为了优化（特别是移动端）而改变了默认的切换机制，并且 CSS 的引入方式以及其它一些地方都做了较大的改变，所以代码与1.0.0之前的版本不兼容。

<br>


## 如何使用

除了直接下载外，也可以通过 [npm](https://www.npmjs.com/) 来安装：
```shell
npm install --save do-slide
```
DoSlide 符合 [UMD](https://github.com/umdjs/umd) 模块规范，可以在 CommonJS 及 AMD 模块化环境中使用，在非模块化环境中时，会暴露出 `DoSlide` 变量。

引入 CSS：
```html
<link rel="stylesheet" href="path/to/do-slide/dist/do-slide.min.css">
```

引入 JS：
```html
<script src="path/to/do-slide/dist/do-slide.min.js"></script>
```

HTML 结构：
```html
<div class="ds-parent">
    <div class="ds-container">
        <div>Section 1</div>
        <div>Section 2</div>
        <div>Section 3</div>
    </div>
</div>
```

之后创建对应的 DoSlide 对象即可：
```js
var slide = new DoSlide('.ds-container', {/* 配置选项 */})
```

所引入的 CSS 文件内容（ [do-slide.css](dist/do-slide.css) ）非常简单，你完全可以将其拷贝到项目 CSS 中而不需要再单独引入这个文件（如果不顾略升级的话）。默认 `ds-parent` 类并不设置 `position` 属性，如有需要请自行设置。

**注意：** 请不要把 `<body>` 当作父元素，这在某些可自动隐藏地址栏的移动端浏览器下会出现高度异常的情况（ [issue#8](https://github.com/MopTym/doSlide/issues/8) ），即不要使用这样的结构：
```html
<body class="ds-parent"> <!-- 不要把body当作父元素 -->
    <div class="ds-container">
        <div></div>
        <div></div>
        <div></div>
    </div>
</body>
```
而这样子是可以的：
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

**太长不看：** 应用整屏滚动基础代码：
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

具体的使用可以参考 [使用示例](#使用示例) 。

<br>


## 行为模式

理解此插件的运行过程可以让你更好地使用它。在默认配置下，DoSlide 的行为模式如下：

设有这么一个 HTML 结构：
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

页面结构加载完成后，通过
```js
new DoSlide('.ds-container')
```
一个 DoSlide 对象被创建，这时 DoSlide 会执行以下操作：
- 初始化所有子元素
- 激活（添加 `active` 类）并显示第 1 个子元素
- 开始监听滚轮及触屏滑动事件
- 移除对应元素的 `ds-init` 类

这些操作流程的代码在 [init.js](src/init.js) 中，你可以查看以深入了解。

执行完后，HTML 就变成了这个样子：
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

当用户滚动滚轮或滑动触屏时，会切换相应子元素的激活和显示状态，在切换过程中，给进入的子元素添加 `transition-in` 类，给离开的子元素添加 `transition-out` 类。

<br>


## 创建对象

DoSlide 提供两种对象创建方法：
- `new DoSlide([selector, config])`
- `DoSlide.from(doSlideObj[, selector, config])`

其中，`selector` 可以是一个选择器字符串，也可以是一个DOM元素对象。一个页面可以并存多个 DoSlide 对象，`DoSlide.from()` 返回一个具有给定对象（ `doSlideObj` ）配置拷贝的新对象，类似于复制对象。

<br>


## 配置选项

在 DoSlide 的代码中（ [config.js](src/config.js) ），对象的配置是这样子定义的：
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
在 [index.js](src/index.js) 中：
```js
// in constructor
this.config = Object.assign({}, DEFAULT_CONFIG, DEFAULT_INIT_CONFIG)
this.set(config)
```

其中，默认 `config` 由 `DEFAULT_INIT_CONFIG` 和 `DEFAULT_CONFIG` 结合生成，在我们自定义配置时，`DEFAULT_INIT_CONFIG` 内的属性需要在对象创建时指定，即
```js
var slide = new DoSlide('.container', {
    horizontal: true    // DEFAULT_INIT_CONFIG 内的属性应在对象创建时指定
})
```
之后不应再修改，不要这样子
```js
slide.set({
    horizontal: true    // 不要 o(>_<)o
})
```
而 `DEFAULT_CONFIG` 内的属性则随时都可以修改。

配置说明如下：

<table>
    <thead>
        <tr>
            <th>名称</th>
            <th width="180">默认值</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>initIndex</td>
            <td>0</td>
            <td>初始激活显示的子元素索引</td>
        </tr>
        <tr>
            <td>initClass</td>
            <td>do-slide-init</td>
            <td>初始化后要删除的对应元素的类</td>
        </tr>
        <tr>
            <td>activeClass</td>
            <td>active</td>
            <td>激活子元素时给其添加的类</td>
        </tr>
        <tr>
            <td>transitionInClass</td>
            <td>transition-in</td>
            <td>切换时给进入的子元素添加的类</td>
        </tr>
        <tr>
            <td>transitionOutClass</td>
            <td>transition-out</td>
            <td>切换时给离开的子元素添加的类</td>
        </tr>
        <tr>
            <td>silent</td>
            <td>false</td>
            <td>设为 <code>true</code> 时，显示与切换的行为仅仅体现在逻辑上而不会对 DOM 元素做任何操作</td>
        </tr>
        <tr>
            <td>horizontal</td>
            <td>false</td>
            <td>是否为水平滚动</td>
        </tr>
        <tr>
            <td>infinite</td>
            <td>false</td>
            <td>是否为无限滚动</td>
        </tr>
        <tr>
            <td>listenUserMouseWheel</td>
            <td>true</td>
            <td>是否监听用户鼠标滚轮事件</td>
        </tr>
        <tr>
            <td>listenUserSwipe</td>
            <td>true</td>
            <td>是否监听用户触屏滑动事件</td>
        </tr>
        <tr>
            <td>eventElemSelector</td>
            <td>null</td>
            <td>用户事件的监听元素，<code>null</code> 时为相应元素，<code>false</code> 时不监听用户事件，其它可以是一个选择器字符串，也可以是一个 DOM 元素对象</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th>名称</th>
            <th width="180">默认值</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>duration</td>
            <td>1000</td>
            <td>过渡时长（毫秒）</td>
        </tr>
        <tr>
            <td>timingFunction</td>
            <td>ease</td>
            <td>即过渡时 CSS 中的 <code>transition-timing-function</code></td>
        </tr>
        <tr>
            <td>minInterval</td>
            <td>50</td>
            <td>两次切换的最小时间间隔（毫秒）</td>
        </tr>
        <tr>
            <td>translate3d</td>
            <td>true</td>
            <td>切换时是否使用 <code>translate3d</code></td>
        </tr>
        <tr>
            <td>parent</td>
            <td>null</td>
            <td>父级 DoSlide 对象</td>
        </tr>
        <tr>
            <td>respondToUserEvent</td>
            <td>true</td>
            <td>是否响应用户事件</td>
        </tr>
        <tr>
            <td>stopPropagation</td>
            <td>false</td>
            <td>是否停止事件冒泡</td>
        </tr>
    </tbody>
</table>

**注意：** `parent` 只是为了快捷实现嵌套的父子联动而设置的属性，你完全可以不使用 `parent` 而利用 `onOverRange()` 和 `stopPropagation` 来实现。

<br>


## 属性

DoSlide 对象属性：

| 名称 | 只读 | 说明 |
| --- | :---: | --- |
| el | 是 | 对应元素 |
| eventEl | 是 | 事件元素 |
| sections | 是 | section 集合 |
| currentIndex | 是 | 当前 section 索引 |
| currentSection | 是 | 当前 section |
| isChanging | 是 | 当前时刻是否正在切换 |
| $ | 是 | 内置工具库 |

DoSlide本身属性：

| 名称 | 只读 | 说明 |
| --- | :---: | --- |
| supportedTransition | 是 | 浏览器支持的 CSS `transition` 属性名 |
| supportedTransform | 是 | 浏览器支持的 CSS `transform` 属性名 |
| $ | 是 | 内置工具库 |

<br>


## 方法

### DoSlide 对象方法：

#### next()

切换到下一个 section。

#### prev()

切换到上一个 section。

#### go(index)

切换到指定索引的 section。

#### set(name, value) || set({ name: value, ... })

设置指定配置项的值。

#### get(name)

获取指定配置项的值。

#### do(callback(curIndex, cur))

- `curIndex`：当前 section 索引
- `cur`：当前 section

以当前 DoSlide 对象作为上下文（ `this` ）执行 `callback` 。

#### initSpaceByKey(key)

通过 `key` 初始化一个绑定在当前 DoSlide 对象上的空间，实际上是个对象，`key` 由 `applyNewKey` 获得。

#### getSpaceByKey(key)

通过 `key` 获取一个绑定在当前 DoSlide 对象上的空间。

### DoSlide 本身方法：

#### applyNewKey()

申请一个全局唯一的 `key` 值，用于 `getSpaceByKey` 。

#### use(plugin[, config])

安装插件，其会调用 `plugin.install(DoSlide, config)`，所以插件应该提供一个 `install` 方法，第一个参数接收 DoSlide，第二个参数是配置，由插件决定。

<br>


## 回调

#### onBeforeChange(callback(curIndex, tarIndex, cur, tar))

- `curIndex`  ：当前 section 索引
- `tarIndex` ：目标 section 索引
- `cur` ：当前 section
- `tar` ：目标 section

在切换发生前，以当前 DoSlide 对象作为上下文（ `this` ）执行 `callback`。

#### onChanged(callback(curIndex, lastIndex, cur, last))

- `curIndex` ：当前 section 索引
- `lastIndex` ：上一个 section 索引
- `cur` ：当前 section
- `last` ：上一个 section

在切换发生后，以当前 DoSlide 对象作为上下文（ `this` ）执行 `callback` 。

#### onOverRange(callback(curIndex, tarIndex, cur))

- `curIndex` ：当前 section 索引
- `tarIndex` ：目标 section 索引
- `cur` ：当前 section

在尝试越界切换时，以当前 DoSlide 对象作为上下文（ `this` ）执行 `callback` 。

#### onUserMouseWheel(callback(direction))

- `direction` ：字符串 `up` 、`down` 对应滚动方向

在由用户鼠标滚轮事件触发的切换发生前，以当前 DoSlide 对象作为上下文（ `this` ）执行 `callback` 。

#### onUserSwipe(callback(direction))

- `direction` ：字符串 `up` 、`down` 、`left` 、`right` 代表滑动方向

在由用户触屏滑动事件触发的切换发生前，以当前 DoSlide 对象作为上下文（ `this` ）执行 `callback` 。

<br>

#### 触发顺序

1. `onUserMouseWheel` 或 `onUserSwipe`
2. `onBeforeChange`
3. `onChanged`

任意一个 `callback` 返回 `false` 都会终止后继调用，你可以利用其来阻止切换行为。

<br>

示例 [2_0_event](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/2_0_event.html) ([source](demo/2_0_event.html)) 演示了这个过程。

<br>


## 内置工具库

DoSlide 内置了一个类似于 jQuery 的工具库，可以通过 `DoSlide.$` 或 DoSlide 对象的 `$` 属性取得。你可以使用这个库所提供的以下方法：

#### on(type, listener[, useCapture = false])

- `$(selector).on(type, listener, useCapture)`
- `$.on(HTMLElement, type, listener, useCapture)`

#### off(type, listener[, useCapture = false])

- `$(selector).off(type, listener, useCapture)`
- `$.off(HTMLElement, type, listener, useCapture)`

#### attr(name, value) || attr(attrObj)

- `$(selector).attr(name, value)` || `$(selector).attr(attrObj)`
- `$.attr(HTMLElement, name, value)` || `$.attr(HTMLElement, attrObj)`

#### removeAttr(name)

- `$(selector).removeAttr(name)`
- `$.removeAttr(HTMLElement, name)`

#### css(name, value) || css(propertyObj)

- `$(selector).css(name, value)` || `$(selector).css(propertyObj)`
- `$.css(HTMLElement, name, value)` || `$.css(HTMLElement, propertyObj)`

#### addClass(name)

- `$(selector).addClass(name)`
- `$.addClass(HTMLElement, name)`

#### removeClass(name)

- `$(selector).removeClass(name)`
- `$.removeClass(HTMLElement, name)`

#### hasClass(name)

- `$(selector).hasClass(name)`
- `$.hasClass(HTMLElement, name)`

#### eq(index)

- `$(selector).eq(index)`

#### each(callback, isContext, isFalseBreak, breakValue)

- `$(selector).each(callback, isContext, isFalseBreak, breakValue)`
- `$.each(Array, callback, isContext, isFalseBreak, breakValue)`

#### getSupportedCSS(name[, isAutoPrefix = true])

- `$.getSupportedCSS(name, isAutoPrefix)`

获取浏览器支持的 CSS 属性名。

举个例子，若浏览器只支持 `-webkit-transform` ，则 `getSupportedCSS('transfrom') => '-webkit-transform'` 。

#### onMouseWheel(HTMLElement, callback(direction)[, isStopPropFn() => false])

- `direction` ：字符串 `up` 、`down` 对应滚动方向
- `isStopPropFn` ：返回 `true` 或 `false` ，是否阻止事件冒泡

监听 `HTMLElement` 对象上的鼠标滚动，触发时以当前 `HTMLElement` 对象作为上下文（ `this` ）执行 `callback` 。

#### onSwipe(HTMLElement, callback(direction)[, isStopPropFn() => false])

- `direction` ：字符串 `up` 、`down` 、`left` 、`right` 对应滑动方向
- `isStopPropFn` ：返回 `true` 或 `false` ，是否阻止事件冒泡

监听 `HTMLElement` 对象上的触屏滑动，触发时以当前 `HTMLElement` 对象作为上下文（ `this` ）执行 `callback` 。

#### 例子

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
    console.log(direction.up? 'up': 'down')
})
```

<br>


## 插件

DoSlide 有一些内置插件，当然你也可以自己编写，请看 [src/plugins](src/plugins) 。

<br>


## 低侵入性

DoSlide 具有低侵入性，主要体现在以下 2 个方面：
- 没有任何原型对象扩展，在外作用域至多暴露一个 `DoSlide` 变量
- 在功能上可以只取所需，你可以得到一个完全不影响 HTML，纯粹逻辑上的 DoSlide 对象，极端地说，你可以配置一个 DoSlide 对象让它什么都不影响什么都不做。

<br>


## 兼容性

DoSlide 可以运行在所有支持 ES5 的现代浏览器上。

当浏览器不支持 CSS 的 `transform` 时，会使用 `left` / `top` 来代替，同时取消过渡效果。

<br>


## 一些问题

#### DoSlide 到底是什么？

一种模式，顺便提供了一些功能，不过怎么看都是个插件。

#### 如何自定义过渡效果？

可以参考 [3_0_fade](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_0_fade.html) ([source](demo/3_0_fade.html)) ，其中的关键是把 `silent` 设为 `true` ，然后你就可以为所欲为了 =_= 。

<br>


## 使用示例

#### [0_0_basic](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_0_basic.html) ([source](demo/0_0_basic.html))

最基本的使用，快速应用整屏滚动模式。

#### [0_1_horizontal](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_1_horizontal.html) ([source](demo/0_1_horizontal.html))

横屏滚动。

#### [0_2_infinite](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_2_infinite.html) ([source](demo/0_2_infinite.html))

无限滚动。

#### [0_3_transition](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_3_transition.html) ([source](demo/0_3_transition.html))

过渡相关。

#### [0_4_nested](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/0_4_nested.html) ([source](demo/0_4_nested.html))

嵌套。

#### [1_0_set_class](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/1_0_set_class.html) ([source](demo/1_0_set_class.html))

设置自动添加的 class。

#### [2_0_event](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/2_0_event.html) ([source](demo/2_0_event.html))

各种事件的触发及回调的调用。

#### [2_1_event_element](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/2_1_event_element.html) ([source](demo/2_1_event_element.html))

配置事件元素。

#### [2_2_invert_mouse_wheel](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/2_2_invert_mouse_wheel.html) ([source](demo/2_2_invert_mouse_wheel.html))

反转鼠标滚轮响应。

#### [3_0_fade](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_0_fade.html) ([source](demo/3_0_fade.html))

应用内置工具库快速实现渐变过渡。

#### [3_1_slider](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_1_slider.html) ([source](demo/3_1_slider.html))

一个简单的图片轮播。

#### [3_2_slider_fade](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_2_slider_fade.html) ([source](demo/3_2_slider_fade.html))

一个简单的图片轮播，渐变过渡。

#### [3_3_init](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_3_init.html) ([source](demo/3_3_init.html))

关于初始化。

<br>


## 开发贡献

开发在 `dev` 分支进行，请将代码提交至 `dev` 分支。

- 开发：webpack + babel
- 测试：karma + jasmine + phantomjs
- 持续集成：Travis CI

```shell

# 安装
npm install

# 开发
npm run watch

# 测试
npm test

# 构建
npm run build

```

欢迎各种 PR、issue，但因我时间精力有限可能不会及时答复。

<br>

**为了世界和平。(ง •̀_•́)ง**
