# mofron-comp-input
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

input component for mofron

This is component for form items.

## Feature
 - input text size is automatically changed when the height is changed.

# Install
```
npm install mofron mofron-comp-input
```

# Sample
```html
<require>
  <tag load="mofron-comp-input">Input</tag>
</require>

<Input label="input:" horizon=true>componet</Input>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| ◯  | text | string | input text |
| | | | undefined: call as getter |
| | font | string | primary font name |
| | | | undefined: call as getter |
| | | string | secondary font name (not required) |
| | value | string | input text |
| | | | undefined: call as getter |
| | maxlength | number | maximal length |
| | | | undefined: call as getter |
| | secret | boolean | true: secret mode (input text is displayed in hiding.) |
| | | | false: normal mode |
| | | | undefined: call as getter |
| | mainColor | mixed (color) | string: border color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | | undefined: call as getter |
| | | key-value | style option (not required) |
| | clear | | | focus | boolean | true: focus input |
| | | | false: defocus input |
| | | | undefined: call as getter |
| | height | string (size) | input height |
| | | | undefined: call as getter |
| | | key-value | style option (not required) |
| | width | string (size) | input width |
| | | | undefined: call as getter |
| | | key-value | style option (not required) |

