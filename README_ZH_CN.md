![preview](do-slide.jpg)

# DoSlide

[![Build Status](https://img.shields.io/travis/MopTym/doSlide.svg?style=flat-square)](https://travis-ci.org/MopTym/doSlide)
[![Version](https://img.shields.io/npm/v/do-slide.svg?style=flat-square)](https://www.npmjs.com/package/do-slide)
[![License](https://img.shields.io/npm/l/do-slide.svg?style=flat-square)](LICENSE)

整屏滚动 / 轮播 / 无依赖 / Gzip后小于5KB

-

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
- [低侵入性](#低侵入性)
- [兼容性](#兼容性)
- [一些问题](#一些问题)
- [使用示例](#使用示例)
- [开发贡献](#开发贡献)

-

## 插件介绍

DoSlide是个轻巧、无依赖、低侵入性的JS插件，提供一次切换整个子区域的切换模式。DoSlide的行为可以灵活配置，内置类似jQuery的工具库，你可以借助其迅速地实现各种具体需求。

若需快速了解此插件，请访问[介绍页面](http://app.moptym.com/do-slide)。

<br>


## 如何使用

除了直接下载外，也可以通过[npm](https://www.npmjs.com/)来安装：
```shell
npm install --save do-slide
```
DoSlide符合[UMD](https://github.com/umdjs/umd)模块规范，可以在CommonJS及AMD模块化环境中使用，在非模块化环境中时，会暴露出`DoSlide`变量。

引入JS文件即可，不需要引入CSS：
```html
<script src="path/to/do-slide/dist/do-slide.min.js"></script>
```

HTML结构：
```html
<div class="container">
    <div>Section 1</div>
    <div>Section 2</div>
    <div>Section 3</div>
</div>
```

之后创建对应的DoSlide对象即可：
```js
var slide = new DoSlide('.container', {/* 配置选项 */})
```

具体的使用可以参考[使用示例](#使用示例)。

<br>


## 行为模式

理解此插件的运行过程可以让你更好地使用它。在默认配置下，DoSlide的行为模式如下：

设有这么一个HTML结构：
```html
<html>
    <head>
        ......
    </head>
    <body>
        <div class="container do-slide-init">
            <div class="section-1"></div>
            <div class="section-2"></div>
            <div class="section-3"></div>
        </div>
    </body>
</html>
```

页面结构加载完成后，通过
```js
new DoSlide('.container')
```
一个DoSlide对象被创建，这时DoSlide会执行以下操作：
- 通过插入`link`元素来引入所需默认CSS
- 给对应元素的父元素添加`do-slide-parent`类
- 给对应元素添加`do-slide-container`类
- 给对应元素的子元素添加`do-slide-section`类
- 初始化所有子元素
- 激活（添加`active`类）并显示第1个子元素
- 开始监听滚轮及触屏滑动事件
- 移除对应元素的`do-slide-init`类

这些操作流程的代码在[init.js](src/init.js)中，你可以查看以深入了解。

执行完后，HTML就变成了这个样子：
```html
<html>
    <head>
        <link id="do-slide-css" rel="stylesheet" href="data:text/css;base64,...">
        ......
    </head>
    <body class="do-slide-parent">
        <div class="container do-slide-container">
            <div class="section-1 do-slide-section active"></div>
            <div class="section-2 do-slide-section"></div>
            <div class="section-3 do-slide-section"></div>
        </div>
    </body>
</html>
```

当用户滚动滚轮或滑动触屏时，会切换相应子元素的激活和显示状态，在切换过程中，给进入的子元素添加`transition-in`类，给离开的子元素添加`transition-out`类。

<br>


## 创建对象

DoSlide提供两种对象创建方法：
- `new DoSlide([selector, config])`
- `DoSlide.from(doSlideObj[, selector, config])`

其中，`selector`可以是一个选择器字符串，也可以是一个DOM元素对象。一个页面可以并存多个DoSlide对象，`DoSlide.from()`返回一个具有给定对象（`doSlideObj`）配置拷贝的新对象，类似于复制对象。

<br>


## 配置选项

在DoSlide的代码中（[index.js](src/index.js)），对象的配置是这样子定义的：
```js
const DEFAULT_INIT_CONFIG = {
    initIndex            : 0,
    initClass            : 'do-slide-init',
    
    parentClass          : 'do-slide-parent',
    containerClass       : 'do-slide-container',
    sectionClass         : 'do-slide-section',
    customCSS            : false,
    
    activeClass          : 'active',
    transitionInClass    : 'transition-in',
    transitionOutClass   : 'transition-out',
    
    silent               : false,
    
    horizontal           : false,
    infinite             : false,
    
    listenUserMouseWheel : true,
    listenUserSlide      : true,
    eventElemSelector    : null
}

const DEFAULT_CONFIG = {
    duration             : 1000,
    timingFunction       : 'ease',
    minInterval          : 50,

    stopPropagation      : false
}
```
```js
// in constructor
this.config = Object.assign({}, DEFAULT_CONFIG, DEFAULT_INIT_CONFIG)
this.set(config)
```

其中，默认`config`由`DEFAULT_INIT_CONFIG`和`DEFAULT_CONFIG`结合生成，在我们自定义配置时，`DEFAULT_INIT_CONFIG`内的属性需要在对象创建时指定，即
```js
var slide = new DoSlide('.container', {
    horizontal: true    // DEFAULT_INIT_CONFIG内的属性应在对象创建时指定
})
```
之后不应再修改，不要这样子
```js
slide.set({
    horizontal: true    // 不要 o(>_<)o
})
```
而`DEFAULT_CONFIG`内的属性则随时都可以修改。

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
            <td>parentClass</td>
            <td>do-slide-parent</td>
            <td>给父元素添加的类</td>
        </tr>
        <tr>
            <td>containerClass</td>
            <td>do-slide-container</td>
            <td>给对应元素添加的类</td>
        </tr>
        <tr>
            <td>sectionClass</td>
            <td>do-slide-section</td>
            <td>给子元素添加的类</td>
        </tr>
        <tr>
            <td>customCSS</td>
            <td>false</td>
            <td>设为 true 则不会插入CSS，不会添加以上3个类</td>
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
            <td>设为<code>true</code>时，显示与切换的行为仅仅体现在逻辑上而不会对DOM元素做任何操作</td>
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
            <td>listenUserSlide</td>
            <td>true</td>
            <td>是否监听用户触屏滑动事件</td>
        </tr>
        <tr>
            <td>eventElemSelector</td>
            <td>null</td>
            <td>用户事件的监听元素，<code>null</code>时为相应元素，<code>false</code>时不监听用户事件，其它可以是一个选择器字符串，也可以是一个DOM元素对象</td>
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
            <td>即过渡时CSS中的<code>transition-timing-function</code></td>
        </tr>
        <tr>
            <td>minInterval</td>
            <td>50</td>
            <td>两次切换的最小时间间隔（毫秒）</td>
        </tr>
        <tr>
            <td>stopPropagation</td>
            <td>false</td>
            <td>是否停止事件冒泡</td>
        </tr>
    </tbody>
</table>

<br>


## 属性

DoSlide对象属性：

| 名称 | 只读 | 说明 |
| --- | :---: | --- |
| el | 是 | 对应元素 |
| eventEl | 是 | 事件元素 |
| currentIndex | 是 | 当前section索引 |
| currentSection | 是 | 当前section |
| isChanging | 是 | 当前时刻是否正在切换 |
| $ | 是 | 内置工具库 |

DoSlide本身属性：

| 名称 | 只读 | 说明 |
| --- | :---: | --- |
| supportedTransition | 是 | 浏览器支持的CSS`transition`属性名 |
| supportedTransform | 是 | 浏览器支持的CSS`transform`属性名 |
| $ | 是 | 内置工具库 |

<br>


## 方法

#### next()

切换到下一个section。

#### prev()

切换到上一个section。

#### go(index)

切换到指定索引的section。

#### set(name, value) || set({ name: value, ... })

设置指定配置项的值。

#### get(name)

获取指定配置项的值。

#### do(callback(curIndex, cur))

- `curIndex`：当前section索引
- `cur`：当前section

以当前DoSlide对象作为上下文（`this`）执行`callback`。

<br>


## 回调

#### onBeforeChange(callback(curIndex, tarIndex, cur, tar))

- `curIndex`：当前section索引
- `tarIndex`：目标section索引
- `cur`：当前section
- `tar`：目标section

在切换发生前，以当前DoSlide对象作为上下文（`this`）执行`callback`。

#### onChanged(callback(curIndex, lastIndex, cur, last))

- `curIndex`：当前section索引
- `lastIndex`：上一个section索引
- `cur`：当前section
- `last`：上一个section

在切换发生后，以当前DoSlide对象作为上下文（`this`）执行`callback`。

#### onUserMouseWheel(callback(direction))

- `direction`：向下滚时`direction.down = true`，向上滚时`direction.up = true`

在由用户鼠标滚轮事件触发的切换发生前，以当前DoSlide对象作为上下文（`this`）执行`callback`。

#### onUserSlide(callback(direction))

- `direction`：方向对象，其属性`up`、`down`、`left`、`right`代表滑动方向

在由用户触屏滑动事件触发的切换发生前，以当前DoSlide对象作为上下文（`this`）执行`callback`。

<br>

#### 触发顺序

1. `onUserMouseWheel` 或 `onUserSlide`
2. `onBeforeChange`
3. `onChanged`

任意一个`callback`返回`false`都会终止后继调用，你可以利用其来阻止切换行为。

<br>

示例 [2_0_event](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/2_0_event.html) ([source](demo/2_0_event.html)) 演示了这个过程。

<br>


## 内置工具库

DoSlide内置了一个类似于jQuery的工具库，可以通过`DoSlide.$`或DoSlide对象的`$`属性取得。你可以使用这个库所提供的以下方法：

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

获取浏览器支持的CSS属性名。

举个例子，若浏览器只支持`-webkit-transform`，则`getSupportedCSS('transfrom') => '-webkit-transform'`。

#### onMouseWheel(HTMLElement, callback(direction)[, isStopPropFn() => false])

- `direction`：方向对象，其属性`up`、`down`对应滚动方向
- `isStopPropFn`：返回`true`或`false`，是否阻止事件冒泡

监听`HTMLElement`对象上的鼠标滚动，触发时以当前`HTMLElement`对象作为上下文（`this`）执行`callback`。

#### onSlide(HTMLElement, callback(direction)[, isStopPropFn() => false])

- `direction`：方向对象，其属性`up`、`down`、`left`、`right`对应滑动方向
- `isStopPropFn`：返回`true`或`false`，是否阻止事件冒泡

监听`HTMLElement`对象上的触屏滑动，触发时以当前`HTMLElement`对象作为上下文（`this`）执行`callback`。

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


## 低侵入性

DoSlide具有低侵入性，主要体现在以下3个方面：
- 没有任何原型对象扩展，在外作用域至多暴露一个`DoSlide`变量
- 默认CSS通过`link`元素引入或不引入，尽可能降低优先级以便于覆盖
- 在功能上可以只取所需，你可以得到一个完全不影响HTML，纯粹逻辑上的DoSlide对象，极端地说，你可以配置一个DoSlide对象让它什么都不影响什么都不做。

<br>


## 兼容性

DoSlide可以运行在所有支持ES5的现代浏览器上。

当浏览器不支持CSS的`transform`时，会使用`display`来代替，同时取消过渡效果。

<br>


## 一些问题

#### DoSlide到底是什么？

一种模式，顺便提供了一些功能，不过怎么看都是个插件。

#### 在DoSlide对象创建前没有应用上CSS样式页面混乱怎么办？

DoSlide假设所在项目已经拥有loading方案，如果没有又很在意的话解决方法也不止一种：
- 手动引入CSS。DoSlide引入的CSS在[style.css](src/style.css)里，你可以将其拷到项目的CSS中，然后给HTML结构加上对应的类。或完全自定义CSS，将`customCSS`设为`true`，不使用默认CSS。
- 灵活使用`initClass`（`do-slide-init`）。

可以参考 [3_3_init](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_3_init.html) ([source](demo/3_3_init.html))。

#### 如何自定义过渡效果？

可以参考 [3_0_fade](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/3_0_fade.html) ([source](demo/3_0_fade.html)) ，其中的关键是把`silent`设为`true`，然后你就可以为所欲为了 =_=。

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

#### [1_0_set_class](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/1_0_set_class.html) ([source](demo/1_0_set_class.html))

设置自动添加的class。

#### [1_1_customize_css](http://htmlpreview.github.io/?https://github.com/MopTym/doSlide/blob/master/demo/1_1_customize_css.html) ([source](demo/1_1_customize_css.html))

自定义CSS。

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

- 开发：webpack + babel
- 测试：mocha-phantomjs + chai
- 持续集成：Travis CI

```shell

// 初始化项目
npm init

// 开发
npm run watch

// 测试
npm test

// 构建
npm run build

```

欢迎各种PR、issue，但因我时间精力有限可能不会及时答复。

<br>

**为了世界和平。(ง •̀_•́)ง**