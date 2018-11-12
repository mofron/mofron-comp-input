/**
 * @file   mofron-comp-input/index.js
 * @brief  input component for mofron
 * @author simpart
 */
const mf       = require('mofron');
const FormItem = require('mofron-comp-formitem');
const Text     = require('mofron-comp-text');

mf.comp.Input = class extends FormItem {
    /**
     * initialize inputtext component
     *
     * @param p1 (object) input option
     * @param p1 (string) label text
     * @param p2 (string) input value
     */
    constructor (po, p2) {
        try {
            super();
            this.name('Input');
            this.prmMap(['label', 'text']);
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     *
     * @note private method
     */
    initDomConts () {
        try {
            super.initDomConts();
            /* init input contents */
            let inp = new mf.Dom('input', this);
            this.target().addChild(inp);
            this.target(inp);
            
            /* set style event */
            inp.styleListener(
                'height',
                (p1, p2) => {
                    try {
                        p2.style({
                            'font-size' : mf.func.sizeDiff(p1.height, '0.02rem')
                        });
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            );
            
            
            /* set default config */
            this.type('text');
            this.size('1.5rem', '0.25rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * input test setter/getter
     *
     * @param p1 (string) input text
     * @return p1 (string) input text
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
     * input test setter/getter
     *
     * @param p1 (string) input text
     * @return (string) input text
     */
    value (prm) {
        try { return this.text(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * max value length setter/getter
     *
     * @param p1 (number) max length
     * @return (number) max length
     */
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
            this.target().attr({ maxlength : len });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * secret mode setter/getter
     *
     * @param p1 (true) set secret mode
     * @param p1 (false) set text mode
     * @return (boolean) input mode
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
     * input border color setter/getter
     *
     * @param p1 (string) color name
     * @param p1 (array) [red(0-255), green(0-255), blue(0-255)]
     * @param p1 (undefined) call as getter
     * @return (string) color name
     */
    mainColor (prm) {
        try { return this.tgtColor('border-color', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * clear input value
     */
    clear () {
        try { this.text(''); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * focus input setter/getter
     *
     * @param p1 (true) focus input
     * @param p1 (false) defocus input
     * @return (boolean) focus status
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
    
    /**
     * input type setter/getter
     *
     * @param p1 (string) input type (text, number, password)
     * @return (string) input type
     */
    type (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.target().attr('type');
            }
            /* setter */
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.target().attr({ 'type' : prm });
            if ('number' === prm) {
                this.style({ 'text-align' : 'right' })
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.Input;
/* end of file */
