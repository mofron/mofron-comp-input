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
            /* init tag */
            var lbl = new mofron.Dom('div',this);
            var inp = new mofron.Dom({
                          tag    : 'input',
                          target : this,
                          attr   : {'type' : 'text'}
                      });
            this.adom().addChild(
                new mofron.Dom({
                    tag    : 'div',
                    target : this,
                    child  : [lbl, inp]
                })
            );
            this.target(lbl);
            this.addChild(this.label());
            this.target(inp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (val) {
        try {
            if (undefined === val) {
                /* getter */
                return mofron.func.getLength(this.style('width'));
            }
            this.adom().style({
                'width' : ('number' === typeof val) ? val + 'px' : val
            });
            /* setter */
            this.style({
                'width' : '100%'
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (val) {
        try {
            if (undefined === val) {
                /* getter */
                return (mofron.func.getLength(this.style('height')) * 2) + 5;
            }
            /* setter */
            this.style({
                'height' : ('number' === typeof val) ? val/2 + 'px' : val
            });
            let fnt_siz = val;
            if ('number' === typeof fnt_siz) {
                fnt_siz = val/2 + 'px';
            }
            this.label().size(fnt_siz);
            this.style({
                'font-size' : fnt_siz
            });
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
                if (undefined === this.m_label) {
                    this.label('');
                }
                return this.m_label;
            }
            /* setter */
            if ( !( ('string' === typeof lbl) ||
                    (true     === mofron.func.isInclude(lbl, 'Text')) ) ) {
                throw new Error('invalid parameter');
            }
            
            if ('string' === typeof lbl) {
                if (undefined === this.m_label) {
                    this.m_label = new Text(lbl);
                } else {
                    this.m_label.text(lbl);
                }
            } else {
                if (0 !== this.child().length) {
                    this.target(this.vdom().child()[0].child()[0]);
                    this.updChild(0, lbl);
                    this.target(this.vdom().child()[0].child()[1]);
                    this.vdom().child()[0].child()[0].child().pop()
                }
                this.m_label = lbl;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.input = {};
module.exports = mofron.comp.Input;
