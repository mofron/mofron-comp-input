/**
 * @file mofron-comp-input/index.js
 * @brief input component for mofron
 *        This is component for form items.
 * @feature input text size is automatically changed when the height is changed.
 * @license MIT
 */
const FormItem = require('mofron-comp-formitem');
const Text     = require('mofron-comp-text');
const Border   = require('mofron-effect-border');
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
            this.modname("Input");
            this.shortForm("text");
            /* init config */
	    this.confmng().add("sizeOffset",  { type: "size", init: "0.06rem" });
	    this.confmng().add("txtbuf", { type: "string" });
	    this.confmng().add("type", { type:"string", init:"text" });
            
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
                      });
            this.childDom().child(inp);
            this.childDom(inp);
	    this.inputDom = inp;
	    this.styleDom(inp);
            
	    let pvt = { private:true };
	    this.effect(new Border(), pvt);
	    let fcs = (p1,p2) => {
                try {
                    let txt = p1.text();
                    if (true === p2) {
                        this.confmng("txtbuf", (null === txt) ? "" : txt);
                    } else if (txt !== this.confmng("txtbuf")) {
                        let cevt = p1.changeEvent();
                        for (let cidx in cevt) {
                            cevt[cidx][0](p1,txt,cevt[cidx][1]);
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
	    this.confmng("focusEvent", [fcs,true], pvt);
            this.rootDom()[0].style({ 'align-items' : 'center' });
            /* set default size */
            this.width("1.5rem", pvt);
	    this.height("0.25rem", pvt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeRender () {
        try {
	    super.beforeRender();
            if (true === this.horizon()) {
                this.label().size(comutl.sizediff(this.height(),this.sizeOffset()));
            }
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
	    if (undefined === prm) {
                /* getter */
		return this.inputDom.props("value");
	    }
	    /* setter */
	    if ("string" !== typeof prm) {
                throw new Error("invalid parameter");
	    }
	    this.inputDom.props({ value: prm });
	    let chg_evt = this.changeEvent();
            for (let cidx in chg_evt) {
                chg_evt[cidx][0](this, prm, chg_evt[cidx][1]);
	    }
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
     * @param (string) secondary font name
     * @return (array) font name [primary, secondary]
     * @type parameter
     */
    font () {
        try {
            if (0 === arguments.length) {
                /* getter */
                return this.style("font-family");
            }
            /* setter */
            let set_fnt = "";
            for (let aidx=0;aidx < arguments.length; aidx++) {
                if ("string" !== typeof arguments[aidx]) {
                    throw new Error("invalid parameter");
                }
                set_fnt += arguments[aidx] + ",";
            }
            set_fnt = set_fnt.substring(0, set_fnt.length-1);
            this.style({ "font-family": set_fnt });
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
	    if ((undefined !== prm) && ("string" !== typeof prm)) {
                prm = prm + "";
	    }
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
                return this.inputDom.attrs('maxlength');
            }
            /* setter */
            if ('number' !== typeof len) {
                throw new Error('invalid parameter');
            }
            this.inputDom.attrs({ maxlength : len });
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
	    this.confmng("type",prm);
	    return this.childDom().attrs(
	        (undefined === prm) ? "type": { "type" : prm }
            );
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * text color setter/getter
     *
     * @param (mixed (color)) string: text color name, #hex
     *                        array: [red, green, blue, (alpha)]
     *                        undefined: call as getter
     * @param (key-value) style option
     * @return (string) color
     * @type parameter
     */
    mainColor (prm,opt) {
        try {
	    super.mainColor(prm);
	    return cmputl.color(this, "color", prm, opt);
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
     * @param (key-value) style option
     * @return (string) color
     * @type parameter
     */
    accentColor (prm,opt) {
        try {
	    super.accentColor(prm,opt);
            return this.effect({ modname: "Border" }).color(prm);
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
            if ((true === prm) && (true === this.inputDom.isPushed())) {
                /* setter */
                this.inputDom.getRawDom().select();
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
     * @param (key-value) style option
     * @return (mixed) string: input height
     *                 null: not set
     * @type parameter
     */
    height (prm, opt) {
        try {
            if (undefined === prm) {
                /* getter */
                return super.height(); //comutl.sizesum(super.height(), this.sizeOffset());
	    }
	    /* setter */
	    let set_siz = comutl.sizediff(prm, this.sizeOffset())
            super.height(set_siz, opt);
            this.style({ "font-size" : comutl.sizediff(set_siz, "0.05rem") });
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
     * @param (key-value) style option
     * @return (mixed) string: input width
     *                 null: not set
     * @type parameter
     */
    width (prm, opt) {
        try {
	    let siz = null;
            if (undefined === prm) {
                /* getter */
                try {
                    return comutl.sizesum(super.width(), this.sizeOffset());
                } catch (e) {
                    return super.width();
                }
            }
            /* setter */
	    this.styleDom().style({ width: prm },opt);
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
