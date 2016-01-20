# Build-in Plugins

## Introduction
These plugins will be automatically installed.

## Conventions

- the plugin should provide an `install` function which will be called with the DoSlide as the first argument, along with possible config.

```js
{
    install: function(DoSlide, config) {
        // add a global function
        DoSlide.pluginFunction = ...
        // add an instance function
        DoSlide.prototype.pluginFunction = ...
    },
    ...
}
```

- Install the plugin by invoking `DoSlide.use(plugin[, config])`.

```js
// it will call myPlugin.install(DoSlide, config)
DoSlide.use(myPlugin, config)
```
