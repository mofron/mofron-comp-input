/**
 * @file   mofron-comp-input/index.js
 * @brief  input component class
 * @author simpart
 */
const mf       = require('mofron');
const FormItem = require('mofron-comp-formitem');
const Text     = require('mofron-comp-text');

mf.comp.Input = class extends FormItem {
    /**
     * initialize inputtext component
     *
     * @param po : (string) label
     * @param po : (object) option
     */
    constructor (po, p2) {
        try {
            super();
            this.name('Input');
            this.prmMap('label', 'text');
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts () {
        try {
            super.initDomConts();
            /* init input contents */
            let inp = new mf.Dom('input', this);
            this.target().addChild(inp);
            this.target(inp);
            
            /* set default config */
            this.type("text");
            this.size('1.5rem', '0.3rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    //afterRender () {
    //    try {
    //        super.afterRender();
    //        let chg_evt = this.changeEvent();
    //        let txt_ara = this;
    //        this.target().getRawDom().onkeyup = () => {
    //            try {
    //                if (null !== chg_evt) {
    //                    for (let idx in chg_evt) {
    //                       chg_evt[idx][0](txt_ara, chg_evt[idx][1]);
    //                    }
    //                }
    //            } catch (e) {
    //                console.error(e.stack);
    //                throw e;
    //            }
    //        }
    //    } catch (e) {
    ///        console.error(e.stack);
     //       throw e;
    //    }
    //}
    
    height (prm) {
        try {
            let sret = super.height(prm);
            if (undefined === prm) {
                /* getter */
                if (true === this.horizon()) {
                    return sret;
                } else {
                    return mf.func.sizeSum(sret, this.target().style('height'));
                }
            }
            /* setter */
            let set_prm = mf.func.getSizeObj(prm);
            let set_siz = set_prm;
            if ((true !== this.horizon()) && ("" !== this.label().text())) {
                set_siz = set_prm.value()/2 + set_prm.type();
            }
            this.target().style({
                'height'    : set_siz,
                'font-size' : set_siz
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
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
    
    value (prm) {
        try { return this.text(prm); } catch (e) {
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
            this.target().attr({ maxlength : len });
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
    
    //label (prm) {
    //    try {
    //        if (undefined === prm) {
    //            /* getter */
    //            return super.label(prm);
    //        }
    //        /* setter */
    //        let hei = this.height();
    //        super.label(prm);
    //        this.height(hei);
    //    } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}
    
    mainColor (prm) {
        try {
            let ret = super.color(prm);
            if (undefined === ret) {
                /* setter */
                let rgb = prm.rgba();
                rgb[0] = (0 > (rgb[0]-30)) ? 0 : rgb[0]-30;
                rgb[1] = (0 > (rgb[1]-30)) ? 0 : rgb[1]-30;
                rgb[2] = (0 > (rgb[2]-30)) ? 0 : rgb[2]-30;
                let set_clr = new mf.Color(rgb[0], rgb[1], rgb[2]).getStyle();
                this.style({
                    'border-color' : new mf.Color(rgb[0], rgb[1], rgb[2]).getStyle()
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    clear () {
        try { this.text(''); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    focus (prm) {
        try {
            let ret = super.focus(prm);
            if ((undefined === ret) && (true === this.target().isPushed())) {
                /* setter */
                this.target().getRawDom().select();
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
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
