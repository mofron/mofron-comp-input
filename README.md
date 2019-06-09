# mofron-comp-input
input component for [mofron](https://mofron.github.io/mofron/).

[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

## feature
Input text size is automatically changed when the height is changed.

# Install
npm install mofron mofron-comp-input

# Sample
```html
<require>
  <tag module="mofron-comp-input">Input</tag>
</require>
<Input text="input:" horizon=true>component</Input>
```

# Parameter
| Simple<br>Param | Parameter Name     | Type                               |    Description                     |
|:---------------:|:-------------------|:-----------------------------------|:-----------------------------------|
|        ◯        | label              | string                             | 'label' parameter                  |
|        ◯        | text               | string                             | input text                         |
|                 | value              | string                             | 'text' parameter                   |
|                 | maxlength          | number                             | maximal length                     |
|                 | secret             | boolean                            | true: secret mode <br>(input text is displayed in hiding.) |
|                 |                    |                                    | false: normal mode (default)       |
|                 | mainColor          | string                             | border color (name, hex)           |
|                 |                    | [number, number, number, (number)] | r,g,b,(a)                          |
|                 | focus              | boolean                            | true: focus input                  |
|                 |                    |                                    | false: defocus input               |

 

