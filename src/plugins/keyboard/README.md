# Keyboard Support Plugin

## Usage

```js
var slide = new DoSlide('.container')
/* turn on keyboard surpport */
slide.getKeyboard().turnOn()
```

Default mappings:

- `up` or `left`: prev()
- `down` or `right`: next()

## Functions

#### turnOn()

Turn on keyboard surpport.

#### turnOff()

Turn off keyboard surpport.

#### setEventType(eventType)

Set event type. Default to be `keydown`.

#### setEventElement(HTMLElement)

Set event element. Default to be `window`.

#### getMappings()

Get MappingArray.

#### setMappings(MappingArray)

Set MappingArray.

## MappingArray
```js
// when event triggered, traverse this array
// execute action if filter returns true
[
    {
        filter: function(event) {...},
        action: function(event) {...}
    },
    ...
]
```
