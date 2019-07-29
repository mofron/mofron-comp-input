/**
 * @file mofron-comp-input/index.js
 * @brief input component for mofron
 *        This is component for form items.
 * @feature Input text size is automatically changed when the height is changed.
 * @author simpart
 */
const mf       = require('mofron');
const FormItem = require('mofron-comp-formitem');
const Text     = require('mofron-comp-text');

mf.comp.Input = class extends FormItem {
    
    /**
     * constructor
     * 
     * @param (string) 'label' parameter
     * @param (string) 'text' parameter
     * @pmap label,text
     * @type private
     */
    constructor (po, p2) {
        try {
            super();
            this.name("Input");
            this.prmMap(["label", "text"]);
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     *
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            /* init input contents */
            let inp = new mf.Dom({
                          tag: "input", component: this,
                          attr : { type : "text" }
                      });
            this.target().addChild(inp);
            this.target(inp);
            
            /* set style event */
            inp.styleListener(
                "height",
                (p1, p2) => {
                    try {
                        p1.style({
                            "font-size" : mf.func.sizeDiff(p2.height, "0.02rem")
                        });
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            );
            
            
            /* set default config */
            this.size("1.5rem", "0.25rem");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * input text
     *
     * @param (string) input text
     * @return (string) input text
     * @type tag parameter
     */
    text (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return ('' === this.target().prop('value')) ? null : this.target().prop('value');
            }
            /* setter */
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            /* set contents */
            this.target().execOption({
                prop : { value : prm },
                attr : { value : prm }
            });
            /* execute change event */
            let chg_evt = this.changeEvent();
            for (let idx in chg_evt) {
                chg_evt[idx][0](this, chg_evt[idx][1]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set font family
     *
     * @param (string) font name
     * @return (string) font name
     * @type parameter
     */
    font (prm) {
        try {
            if (undefined === prm) {
                return this.style("font-family");
            }
            /* setter */
            if ("string" !== typeof prm) {
                throw new Error("invalid parameter");
            }
            this.style({ "font-family": prm });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * this function is the same as 'text' function.
     * 
     * @param (string) input text
     * @return (string) input text
     * @type parameter
     */
    value (prm) {
        try { return this.text(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * maximum input text length
     *
     * @param (number) maximal length
     * @return (number) maxmal length
     * @type parameter
     */
    maxlength (len) {
        try {
            if (undefined === len) {
                /* getter */
                return this.target().attr('maxlength');
            }
            /* setter */
            if ('number' !== typeof len) {
                throw new Error('invalid parameter');
            }
            this.target().attr({ maxlength : len });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * secret mode
     *
     * @param (boolean) true: secret mode [input text is displayed in hiding.]
     *                  false: normal mode
     * @return (boolean) input mode
     * @type parameter
     */
    secret (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return ('password' === this.type()) ? true : false;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.type((true === flg) ? 'password' : 'text');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * border color config
     *
     * @param (color) border color
     * @return (string) color
     * @type parameter
     */
    mainColor (prm) {
        try { return mf.func.cmpColor('border-color', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * clear input text
     *
     * @type function
     */
    clear () {
        try { this.text(''); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * focus status
     *
     * @param (boolean) true: focus input
     *                  false: defocus input
     * @return (boolean) focus status
     * @type parameter
     */
    focus (prm) {
        try {
            let ret = super.focus(prm);
            if ((true === prm) && (true === this.target().isPushed())) {
                /* setter */
                this.target().getRawDom().select();
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.Input;
/* end of file */
