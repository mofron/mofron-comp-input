# mofron-comp-input
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

input component for mofron

This is component for form items.

## Feature
 - Input text size is automatically changed when the height is changed.

# Install
```
npm install mofron mofron-comp-input
```

# Sample
```html
<require>
  <tag module="mofron-comp-input">Input</tag>
</require>
<Input text="input:" horizon=true>component</Input>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| ◯  | label | string | 'label' parameter |
| ◯  | text | string | input text |
| | font | string | font name |
| | value | string | input text |
| | maxlength | number | maximal length |
| | secret | boolean) true: secret mode (input text is displayed in hiding. | undefined |
| | | | false: normal mode |
| | mainColor | string) border color (name, hex | undefined |
| | | [number, number, number, (number)]) r,g,b,(a |  |
| | focus | boolean | true: focus input |
| | | | false: defocus input |

