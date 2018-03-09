/**
 * @file   mofron-comp-input/index.js
 * @brief  input component class
 * @author simpart
 */
let mf = require('mofron');
let Form = require('mofron-comp-form');
let Text = require('mofron-comp-text');

mf.comp.Input = class extends Form {
    /**
     * initialize inputtext component
     *
     * @param po : (string) default value
     * @param po : (object) option
     */
    constructor (po) {
        try {
            super();
            this.name('Input');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, idx) {
        try {
            super.addChild(chd, idx, false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            /* set wrap dom */
            this.adom().addChild(
                new mf.Dom('div', this)
            );
            var inp = new mf.Dom({
                          tag    : 'input',
                          target : this,
                          attr   : { 'type' : 'text' }
                      });
            /* add label */
            this.addChild(new Text(''));
            if (undefined !== prm) {
                this.label(prm);
            }
            
            /* add input */
            this.target().addChild(inp);
            this.target(inp);
            
            /* set default size */
            this.size(150, 25);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (val) {
        try {
            if (undefined === val) {
                /* getter */
                let wret = mf.func.getLength(
                               this.style('width')
                           );
                return ('number' === wret) ? wret + 6 : wret;
            }
            /* setter */
            this.style({
                'width' : ('number' === typeof val) ? (val-6) + 'px' : val
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (val) {
        try {
            let lbl_flg = ('' === this.label().text()) ? false : true;
            if (undefined === val) {
                /* getter */
                let hret = 0;
                if (true === lbl_flg) {
                    hret = this.label().height();
                }
                hret += mf.func.getLength(
                    this.style('height')
                );
                return ('number' === typeof hret) ? hret+6 : hret;
            }
            /* setter */
            if ('number' !== typeof val) {
                throw new Error('invalid parameter');
            }
            
            let inp_siz = (true === lbl_flg) ? (val*0.4)+3 : val;
            inp_siz -= 6;
            this.label().height(
                (true === lbl_flg) ? (val*0.6)-3 : undefined
            );
            this.style({
                'height'    : inp_siz + 'px',
                'font-size' : (inp_siz - 2) + 'px'
            });
            if (true === lbl_flg) {
                this.style({ 'position' : 'relative' });
                let tval = 0;
                if (40 >= val) {
                    tval = -8;
                } else if (50 >= val) {
                    tval = -4;
                } else if (60 >= val) {
                    tval = -2;
                }
                this.style({ 'top' : tval + 'px'});
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (val) {
        try {
            if (undefined === val) {
                /* getter */
                return this.target().prop('value');
            }
            /* setter */
            if ('string' !== typeof val) {
                throw new Error('invalid parameter');
            }
            this.target().prop({value : val});
            this.target().attr({value : val});
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    checkValue () {
        try {
            if (true === this.require()) {
                if ('' === this.value()) {
                    return ('' === this.label().text()) ? 'empty value' : this.label().text() + ' is required';
                }
            }
            return null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (val) {
        try {
           if (undefined === val) {
               /* getter */
               return this.text(val);
           }
           /* setter */
           this.text(val); 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    maxLength (len) {
        try {
            if (undefined === len) {
                /* getter */
                return this.target().attr('maxlength');
            }
            /* setter */
            if ('number' !== typeof len) {
                throw new Error('invalid parameter');
            }
            this.target().attr({maxlength : len});
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    secret (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return ('password' === this.target().attr('type')) ? true : false;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.target().attr({type : 'password'});
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    label (lbl) {
        try {
            if (undefined === lbl) {
                /* getter */
                return this.child()[0];
            }
            /* setter */
            if ( !( ('string' === typeof lbl) ||
                    (true     === mofron.func.isInclude(lbl, 'Text')) ) ) {
                throw new Error('invalid parameter');
            }
            
            let rsiz = false;
            if (25 === this.height()) {
                rsiz = true;
            }
            
            if ('string' === typeof lbl) {
                this.label().text(lbl);
            } else {
                if (0 !== this.child().length) {
                    this.updChild(this.label(), lbl);
                }
            }
            if (true === rsiz) {
                this.height(50);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isFocused () {
        try {
            let chk_id  = document.activeElement.id;
            let inp_dom = this.adom().child()[0].child()[1];
            if (chk_id === inp_dom.getId()) {
                return true;
            }
            false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.Input;
/* end of file */
