/**
 * @file mofron-comp-input/index.js
 * @brief input component for mofron
 *        This is component for form items.
 * @feature input text size is automatically changed when the height is changed.
 * @license MIT
 */
const FormItem = require('mofron-comp-formitem');
const Text     = require('mofron-comp-text');
const Font     = require('mofron-effect-font');
const comutl   = mofron.util.common;
const cmputl   = mofron.util.component;

module.exports = class extends FormItem {
    /**
     * constructor
     * 
     * @param (mixed) short-form parameter
     *                key-value: component config
     * @short text
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name("Input");
            this.shortForm("text");
            /* init config */
	    this.confmng().add("sizeOffset",  { type: "size", init: "0.06rem" });
	    this.confmng().add("text", { type: "string" });
	    this.confmng().add("txtbuf", { type: "string" });
            /* set config */
	    if (undefined !== prm) {
                this.config(prm);
	    }
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
            let inp = new mofron.class.Dom({
                          tag: "input", component: this,
                          attrs : { type : "text" }
                      });
            this.childDom().child(inp);
            this.childDom(inp);

	    this.focusEvent((p1,p2) => {
                try {
		    let txt = p1.text();
		    if (true === p2) {
                        this.confmng("txtbuf", txt);
		    } else if (txt !== this.confmng("txtbuf")) {
                        let cevt = p1.changeEvent();
                        for (let cidx in cevt) {
                            cevt[cidx].exec(p1,txt);
			}
		    }
		} catch (e) {
		    console.error(e.stack);
                    throw e;
		}
	    });
	    
            this.effect(new Font({ tag: "Input", suspend: true }));

            /* set default size */
            this.size("1.5rem", "0.25rem");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * input text setter/getter
     *
     * @param (string) input text
     *                 undefined: call as getter
     * @return (string) input text
     * @type parameter
     */
    text (prm) {
        try {
	    let ret = this.childDom().props(
                (undefined === prm) ? 'value' : { value: prm }
	    );
	    return (null === ret) ? "" : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set font family
     *
     * @param (string) primary font name
     *                 undefined: call as getter
     * @param (string) secondary font name (not required)
     * @return (array) font name [primary, secondary]
     * @type parameter
     */
    font (p1, p2) {
        try {
	    let font = this.effect({ name: "Font", tag: "Input" });
	    if (undefined === p1) {
                /* getter */
                return font.fname();
	    }
	    /* setter */
	    font.suspend(false);
            font.fname(p1,p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * input value setter/getter
     * this function is the same as 'text' function.
     * 
     * @param (string) input text
     *                 undefined: call as getter
     * @return (string) input text
     * @type parameter
     */
    value (prm) {
        try {
	    return this.text(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * maximum input text length setter/getter
     *
     * @param (number) maximal length
     *                 undefined: call as getter
     * @return (mixed) number: maxmal length
     *                 null: not set
     * @type parameter
     */
    maxlength (len) {
        try {
            if (undefined === len) {
                /* getter */
                return this.childDom().attrs('maxlength');
            }
            /* setter */
            if ('number' !== typeof len) {
                throw new Error('invalid parameter');
            }
            this.childDom().attrs({ maxlength : len });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * secret mode setter/getter
     *
     * @param (boolean) true: secret mode (input text is displayed in hiding.)
     *                  false: normal mode
     *                  undefined: call as getter
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
     * type attribute setter/getter
     *
     * @param (string) type value
     *                 undefined: call as getter
     * @return (mixed) type value
     *                 null: not set
     * @type private
     */
    type (prm) {
        try {
	    return this.childDom().attrs(
	        (undefined === prm) ? "type": { "type" : prm }
            );
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * border color setter/getter
     *
     * @param (mixed (color)) string: border color name, #hex
     *                        array: [red, green, blue, (alpha)]
     *                        undefined: call as getter
     * @param (key-value) style option (not required)
     * @return (string) color
     * @type parameter
     */
    mainColor (prm,opt) {
        try {
	    return cmputl.color('border-color', prm, opt);
	} catch (e) {
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
        try {
	    this.text('');
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * focus status setter/getter
     *
     * @param (boolean) true: focus input
     *                  false: defocus input
     *                  undefined: call as getter
     * @return (boolean) focus status
     * @type parameter
     */
    focus (prm) {
        try {
            let ret = super.focus(prm);
            if ((true === prm) && (true === this.childDom().isPushed())) {
                /* setter */
                this.childDom().getRawDom().select();
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * input height setter/getter
     * 
     * @param (string (size)) input height
     *                        undefined: call as getter
     * @param (key-value) style option (not required)
     * @return (mixed) string: input height
     *                 null: not set
     * @type parameter
     */
    height (prm, opt) {
        try {
            if (undefined === prm) {
                /* getter */
                return comutl.sizesum(prm, this.sizeOffset());
	    }
	    /* setter */
	    let set_siz = comutl.sizediff(prm, this.sizeOffset())
            super.height(set_siz, opt);
            this.style({ "font-size" : set_siz });
	} catch (e) {
	    console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * input width setter/getter
     *
     * @param (string (size)) input width
     *                        undefined: call as getter
     * @param (key-value) style option (not required)
     * @return (mixed) string: input width
     *                 null: not set
     * @type parameter
     */
    width (prm, opt) {
        try {
            if (undefined === prm) {
                /* getter */
                return comutl.sizesum(prm, this.sizeOffset());
            }
            /* setter */
            super.width(
                comutl.sizediff(prm, this.sizeOffset()),
		opt
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * size weight value setter/getter
     * use for size calculate
     * 
     * @param (string (size)) size weight
     *                        undefined: call as getter
     * @param (string (size)) size object for weight
     * @type private
     */
    sizeOffset (prm) {
        try {
	    return this.confmng("sizeOffset",  prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
