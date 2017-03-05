# mofron-comp-input
Input Component for [mofron](https://github.com/simpart/mofron).

# Sample
```javascript
require('mofron');
let Input  = require('mofron-comp-inputtext');

let input = new Input({
                // this is option
                param     : 'Input Test',  // set default text value
                width     : 300,     // set input width 300px
                height    : 40,        // set input height 40px
                maxLength : 10,  // set limit input char length
                visible   : true
            });

input.text('set input text');   // set input text
input.text();  // get input text value
```
