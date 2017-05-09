/**
 * @file   mofron-comp-input/index.js
 * @brief  input component class
 * @author simpart
 */

require('mofron-comp-form');

mofron.comp.Input = class extends mofron.comp.Form {
    /**
     * initialize inputtext component
     *
     * @param prm_opt : (string) default value
     * @param prm_opt : (object) option
     */
    constructor (prm_opt) {
        try {
            super();
            this.name('Input');
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            /* init tag */
            var lbl = new mofron.Dom({
                          tag    : 'div',
                          target : this,
                      });
            var inp = new mofron.Dom({
                          tag    : 'input',
                          target : this,
                          attr   : {'type' : 'text'}
                      });
            this.vdom().addChild(
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
            /* setter */
            this.style({
                'width' : ('number' === typeof val) ? val + 'px' : val
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
                return mofron.func.getLength(this.style('height'));
            }
            /* setter */
            this.style({
                'height' : ('number' === typeof val) ? val + 'px' : val
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
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    checkValue () {
        try {
            if (true === this.require()) {
                if ('' === this.value()) {
                    return "empty value";
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
                    this.m_label = new mofron.comp.Text(lbl);
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
