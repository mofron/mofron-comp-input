/**
 * @file   mofron-comp-input/index.js
 * @brief  input component class
 * @author simpart
 */
let mf       = require('mofron');
let FormItem = require('mofron-comp-formitem');
let Text     = require('mofron-comp-text');

mf.comp.Input = class extends FormItem {
    /**
     * initialize inputtext component
     *
     * @param po : (string) label
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
    
    initDomConts (prm) {
        try {
            super.initDomConts(prm);
            /* init input contents */
            let inp = new mf.Dom({
                tag       : 'input',
                component : this,
                attr      : { 'type' : 'text' }
            });
            this.target().addChild(inp);
            this.target(inp);
            
            /* set default size */
            this.size(150, 23);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    afterRender () {
        try {
            let chg_evt = this.changeEvent();
            let txt_ara = this;
            this.target().getRawDom().onkeyup = () => {
                try {
                    if (null !== chg_evt) {
                        for (let idx in chg_evt) {
                            chg_evt[idx][0](txt_ara, chg_evt[idx][1]);
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (prm) {
        try {
            let ret = super.width(('number' === typeof prm)? prm-6 : prm);
            return ('number' === typeof ret)? ret+6 : ret;
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
                    tval = -2;
                } else if (60 >= val) {
                    tval = -1;
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
                return ('' === this.target().prop('value')) ? null : this.target().prop('value');
            }
            /* setter */
            if ( ('string' !== typeof val) &&
                 (true !== mf.func.isInclude(val, 'Text'))) {
                throw new Error('invalid parameter');
            }
            /* set contents */
            this.target().prop({
                value : ('string' === typeof val)? val : val.text()
            });
            this.target().attr({
                value : ('string' === typeof val)? val : val.text()
            }); 
            
            /* set text config */
            if (true === mf.func.isInclude(val, 'Text')) {
                /* set text style */
                let size = val.size();
                this.style({
                    'font-size' : ('number' === typeof size)? size + 'px' : size,
                });
                if (null !== val.color()) {
                    this.style({
                        'color' : val.color().getStyle()
                    });
                }
            }
            
            /* execute change event */
            let chg_evt = this.changeEvent();
            if (null !== chg_evt) {
                for (let idx in chg_evt) {
                    chg_evt[idx][0](this, chg_evt[idx][1]);
                }
            }
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
    
    label (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return super.label();
            }
            /* setter */
            let rsiz = (25 === this.height())? true : false;
            super.label(prm);
            if (true === rsiz) {
                this.height(50);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    color (prm) {
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
}
module.exports = mofron.comp.Input;
/* end of file */
